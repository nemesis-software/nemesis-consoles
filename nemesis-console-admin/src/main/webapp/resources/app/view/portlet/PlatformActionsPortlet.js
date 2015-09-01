Ext.define('AdminConsole.view.portlet.PlatformActionsPortlet', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'platformActionsPortlet',
    iconCls: 'warning',
    frame: false,
    height: 20,
    intr: null,
    text: '',
    stompClient: null,
    initComponent: function () {
        Ext.apply(this, {
            items: [
                {
                    iconCls: 'platform-update-image',
                    text: 'Update',
                    id: 'platform-actions-update',
                    handler: this.onUpdateClick
                }
                ,
                '->',
                {
                    iconCls: 'thread-dump-image',
                    text: 'Thread Dump',
                    id: 'platform-actions-thread-dump',
                    xtype: 'button',
                    handler: this.onThreadDumpClick
                }
                ,
                '->',
                {
                    iconCls: 'clear-cache-image',
                    text: 'Clear Cache',
                    id: 'platform-actions-clear-cache',
                    xtype: 'button',
                    handler: this.onClearCacheClick
                }
                ,
                '->',
                {
                    text: 'Initialize',
                    id: 'platform-actions-init',
                    iconCls: 'platform-initialize-image',
                    handler: this.onInitClick
                }
            ]
        });

        String.prototype.append = function (value, maxlength) {
            var result;
            if (maxlength) {
                var biggerWith = this.length + value.length - maxlength;
                if (biggerWith > 0) {
                    var lastSpanStart = this.substring(0, this.length - biggerWith).lastIndexOf("<span");
                    if (lastSpanStart == -1) {
                        result = this.substring(biggerWith) + value;
                    } else {
                        result = this.substring(lastSpanStart) + value;
                    }
                } else {
                    result = this + value;
                }
            } else {
                result = this + value;
            }
            return result;
        };

        this.callParent();
    },

    subscribe: function () {
        var self = this;

        this.stompClient = Stomp.over(new SockJS(Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/stomp'));
        this.stompClient.connect(
            {},
            function onSuccess() {
                self.connected = true;
                self.stompClient.subscribe(
                    '/topic/log/init-update',
                    function onReceive(frame) {
                        var progressLog = Ext.ComponentQuery.query("#progress-log")[0];
                        self.text = self.text.append(frame.body.replace(/\n/g, '<br />').replace(/\t/g, '&nbsp;&nbsp;'), 20000);
                        progressLog.update(self.text);
                        progressLog.body.scroll("span", 1000000, false);
                    }, {});
                self.stompClient.subscribe(
                    '/topic/progress/init-update',
                    function onReceive(frame) {
                        var dataJson = jQuery.parseJSON(frame.body);
                        var progressBar = Ext.ComponentQuery.query("#progress-bar")[0];
                        progressBar.updateProgress(dataJson.value / 100);
                        progressBar.updateText(dataJson.formattedValue);
                    }, {});
            },
            function onError() {
                // TODO: reconnect
                self.connected = false;
            }
        );
    },

    unsubscribe: function () {
        if (this.stompClient) {
            this.stompClient.disconnect();
        }
        this.connected = false;
    },

    connect: function () {
        this.unsubscribe();
        this.subscribe();
    },

    listeners: {
        afterrender: function () {
            this.connect();
        }
    },

    onUpdateClick: function () {
        var me = this;
        Ext.create('Ext.window.Window', {
            items: [
                {
                    xtype: 'progressbar',
                    id: 'progress-bar',
                    interval: 500,
                    duration: 50000,
                    increment: 15,
                    region: 'north',
                    text: 'Updating ...',
                    scope: this,
                    fn: function () {
                        p.updateText('Finished!');
                    }
                },
                {
                    id: "progress-log",
                    xtype: "panel",
                    autoScroll: true,
                    region: 'center'
                }
            ],
            listeners: {
                close: function () {
                    clearInterval(me.intr);
                }
            },
            title: 'Updating...',
            width: Ext.getBody().getViewSize().width - 300,
            height: 300,
            layout: 'border',
            id: 'updatingWindow',
            modal: true
        }).show();

        Ext.Ajax.request({ url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform',
            method: 'POST',
            params: { 'action': 'update'},
            success: function (responseObject) {
                Ext.toast({
                    html: 'Successfully updated!',
                    closable: false,
                    align: 't',
                    slideInDuration: 400,
                    minWidth: 400
                });
            },
            failure: function (responseObject) {
                console.log(responseObject.responseText);
            }
        });

    },

    onThreadDumpClick: function () {
        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: false,
            fields: ['threadName', 'threadId', 'blockedTime', 'blockedCount', 'waitedTime', 'waitedCount', 'lockName', 'lockOwnerId', 'lockOwnerName', 'inNative', 'suspended', 'threadState', 'stackTrace'],
            //groupField: 'threadName',
            proxy: {
                type: 'rest',
                url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/dump/',
                useDefaultXhrHeader: false,
                cors: true,
                reader: {
                    type: 'json'
                }
            }
        });

        var grid = Ext.create('Ext.grid.Panel', {
            store: store,
            region: 'center',
            columns: [
                {
                    width: 620,
                    text: 'Thread Name',
                    dataIndex: 'threadName'
                },
                {
                    text: 'Thread Id',
                    dataIndex: 'threadId'
                }
            ],
            features: [
                {
                    ftype: 'grouping',
                    startCollapsed: true,
                    id: 'threadsGrouping'
                }
            ],
            width: 800,
            hideHeaders: false,
            plugins: [
                {
                    ptype: 'rowexpander',
                    rowBodyTpl: new Ext.XTemplate(
                        '<b>Thread Name:</b> {threadName}<br/>',
                        '<b>Thread Id:</b> {threadId}<br/>',
                        '<b>Blocked Time:</b> {blockedTime}<br>',
                        '<b>Blocked Count:</b> {blockedCount}<br>',
                        '<b>Waited Time</b> {waitedTime}<br>',
                        '<b>Waited Count</b> {waitedCount}<br>',
                        '<b>Lock Name:</b> {lockName}<br>',
                        '<b>Lock Owner Id:</b> {lockOwnerId}<br>',
                        '<b>Lock Owner Name:</b> {lockOwnerName}<br>',
                        '<b>In Native:</b> {inNative}<br>',
                        '<b>Suspended:</b> {suspended}<br>',
                        '<b>Thread State:</b> {threadState}<br>',
                        '<b>Stack Trace:</b> {stackTrace:this.formatStackTrace}',
                        {
                            formatStackTrace: function (values) {
                                var result = '';
                                if (values) {
                                    for (var i = 0; i < values.length; i++) {
                                        result += '<br>' + values[i].className + "." + values[i].methodName + "(" + values[i].fileName + ":" + values[i].lineNumber + ")";
                                    }
                                }
                                return result;
                            }
                        }
                    )
                }
            ]
        });

        var window = Ext.create('Ext.window.Window', {
            layout: 'border',
            items: grid,
            title: 'Thread Dump',
            width: 800,
            height: 500,
            id: 'threadDumpResultWindow',
            modal: true
        });
        window.show();

    },

    onClearCacheClick: function () {
        Ext.Ajax.request({ url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/cache/',
            method: 'DELETE',
            params: {},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function (responseObject) {
                Ext.toast({
                    html: 'Successfully cleared the cache!',
                    closable: false,
                    align: 't',
                    slideInDuration: 400,
                    minWidth: 400
                });
            },
            failure: function (responseObject) {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'There was an error, please consult your admin!',
                    buttons: Ext.MessageBox.OK,
                    scope: this,
                    fn: null,
                    icon: Ext.MessageBox['ERROR']
                });
            }
        });
    },

    onInitClick: function () {
        var me = this;
        Ext.create('Ext.window.Window', {
            items: [
                {
                    xtype: 'progressbar',
                    interval: 500,
                    id: 'progress-bar',
                    region: 'north',
                    duration: 50000,
                    increment: 15,
                    height: 20,
                    text: 'Initializing ...',
                    scope: this
                },
                {
                    id: "progress-log",
                    xtype: "panel",
                    autoScroll: true,
                    region: 'center'
                }
            ],
            listeners: {
                close: function () {
                    clearInterval(me.intr);
                }
            },
            title: 'Initializing...',
            layout: 'border',
            width: Ext.getBody().getViewSize().width - 300,
            height: 300,
            id: 'initializingWindow',
            modal: true
        }).show();

        Ext.Ajax.request({ url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/',
            method: 'POST',
            params: { 'action': 'init' },
            success: function (responseObject) {
                Ext.toast({
                    html: 'Successfully initialized!',
                    closable: false,
                    align: 't',
                    slideInDuration: 400,
                    minWidth: 400
                });
            },
            failure: function (responseObject) {
                console.log(responseObject.responseText);
            }
        });
    }
});
