
Ext.define('AdminConsole.view.portlet.JdbcLogPortlet', {
    extend: 'Ext.form.Panel',
    xtype: 'jdbcLogPortlet',
    id: "jdbc-log",
    frame: false,
    border: false,
    height: 500,
    maximizable: true,
    flex: 1,
    layout: 'fit',
    defaults: {
        anchor: '100%',
        margins: '0 0 10 0'
    },
    text: '',
    stompClient: null,
    connected: true,
    enabled: false,
    enableText: 'Enable JDBC Log',
    enableIconCls: 'enable-jdbc',
    disableText: 'Disable JDBC Log',
    disableIconCls: 'disable-jdbc',
    initComponent: function (arguments) {
        Ext.apply(this, {
            tbar: [
                {
                    id: 'jdbcButton',
                    text: this.enableText,
                    iconCls: this.enableIconCls,
                    scope: this,
                    handler: this.onConnectDisconnectClick
                },
                '-',
                {
                    text: 'Clear',
                    iconCls: 'broom',
                    scope: this,
                    handler: this.onClearClick
                },
                '-',
                {
                    text: 'This may greatly reduce the performance. Use it only in development mode',
                    xtype: 'label'
                }
            ]
        });

        String.prototype.append = function (value, maxlength) {
            var result;
            if (maxlength) {
                var biggerWith = this.length + value.length - maxlength;
                if (biggerWith > 0) {
                    var lastSpanStart = this.substring(0, this.length - biggerWith).lastIndexOf('<span');
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

        this.callParent(arguments);
    },
    enableJdbcLog: function () {
        var self = this;
        Ext.Ajax.request({ url: Ext.get('website-base-url').dom.getAttribute('url') + 'platform/jdbc-log',
            method: 'POST',
            params: { enable: true },
            success: function (responseObject) {
                self.enabled = true;
            },
            failure: function (responseObject) {
            }
        });
    },
    subscribe: function () {
        var self = this;

        this.stompClient = Stomp.over(new SockJS(Ext.get('website-base-url').dom.getAttribute('url') + 'platform/stomp'));

        this.stompClient.connect(
            {},
            function onSuccess() {
                self.connected = true;
                self.stompClient.subscribe(
                    '/topic/log-stream/jdbc',
                    function onReceive(frame) {
                        var outputText = Ext.ComponentQuery.query("#jdbcOutputText")[0];
                        self.text = self.text.append(frame.body.replace(/\n/g, '<br />').replace(/\t/g, '&nbsp;&nbsp;'), 20000);
                        outputText.update(self.text);
                        outputText.body.scroll("span", 1000000, false);
                        if (!Ext.getCmp('jdbc-log').enabled) { //not enabled but message came ?
                            Ext.getCmp('jdbc-log').enabled = true;
                            Ext.getCmp('jdbcButton').setText(Ext.getCmp('jdbc-log').disableText);
                            Ext.getCmp('jdbcButton').setIconCls(Ext.getCmp('jdbc-log').disableIconCls);
                        }
                    },
                    {});
            },
            function onError() {
                // TODO: reconnect
                self.connected = false;
            });
    },
    disableJdbcLog: function () {
        Ext.Ajax.request({ url: Ext.get('website-base-url').dom.getAttribute('url') + 'platform/jdbc-log',
            method: 'POST',
            params: { enable: false },
            success: function (responseObject) {
                this.enabled = false;
            },
            failure: function (responseObject) {
            }
        });

    },
    unsubscribe: function () {
        if (this.stompClient) {
            this.stompClient.disconnect();
        }
        this.connected = false;
    },
    connect: function() {
        this.unsubscribe();
        this.subscribe();
    },
    listeners: {
        afterrender: function () {
            this.connect();
        }
    },
    items: [
        {
            id: "jdbcOutputText",
            xtype: "panel",
            autoScroll: true,
            width: '100%'
        }
    ],
    onConnectDisconnectClick: function (button) {
        if (this.enabled) {
            this.disableJdbcLog();
            this.unsubscribe();
            button.setText(this.enableText);
            button.setIconCls(this.enableIconCls);
        } else {
            this.enableJdbcLog();
            this.connect();
            button.setText(this.disableText);
            button.setIconCls(this.disableIconCls);
        }
    },
    onClearClick: function () {
        var outputText = Ext.ComponentQuery.query('#jdbcOutputText')[0];
        outputText.update("");
    }
});
