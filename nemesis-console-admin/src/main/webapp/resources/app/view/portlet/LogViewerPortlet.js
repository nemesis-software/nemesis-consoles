
Ext.define('AdminConsole.view.portlet.LogViewerPortlet', {
    extend: 'Ext.form.Panel',
    xtype: 'logViewerPortlet',
    id: "log_viewer",
    frame: false,
    border: false,
    height: 500,
    maximizable: true,
    flex: 1,
    layout: 'fit',
    text: '',
    defaults: {
        anchor: '100%',
        margins: '0 0 10 0'
    },
    stompClient: null,
    connected: false,
    initComponent: function (arguments) {
        Ext.apply(this, {
            tbar: [
                {
                    text: 'Disconnect',
                    iconCls: 'connect',
                    scope: this,
                    handler: this.onConnectDisconnectClick
                },
                '-',
                {
                    text: 'Clear',
                    iconCls: 'broom',
                    scope: this,
                    handler: this.onClearClick
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

        this.callParent(arguments);
    },
    subscribe: function () {
        var self = this;
        //url: Ext.get('website-base-url').dom.getAttribute('url') + 'platform/stomp',

        this.stompClient = Stomp.over(new SockJS(Ext.get('website-base-url').dom.getAttribute('url') + 'platform/stomp'));

        this.stompClient.connect(
            {},
            function onSuccess() {
                self.connected = true;
                self.stompClient.subscribe('/topic/log-stream/admin', function onReceive(frame) {
                    var outputText = Ext.ComponentQuery.query("#outputText")[0];
                    self.text = self.text.append(frame.body.replace(/\n/g, '<br />').replace(/\t/g, '&nbsp;&nbsp;'), 20000);
                    outputText.update(self.text);
                    outputText.body.scroll("span", 1000000, false);
                }, {});
            },
            function onError() {
                // TODO: reconnect
                self.connected = false;
            });
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
    items: [
        {
            id: "outputText",
            xtype: "panel",
            autoScroll: true,
            width: '100%'
        }
    ],
    onConnectDisconnectClick: function (button) {
        if (this.connected) {
            this.unsubscribe();
            button.setText("Connect");
            button.setIconCls('disconnect');
        } else {
            this.connect();
            button.setText("Disconnect");
            button.setIconCls('connect');
        }
    },
    onClearClick: function () {
        var outputText = Ext.ComponentQuery.query("#outputText")[0];
        outputText.update("");
    }
});
