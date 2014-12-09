/*
 * nemesis Platform - NExt-generation Multichannel E-commerce SYStem
 *
 * Copyright (c) 2010 - 2014 nemesis
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of nemesis
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with nemesis.
 */

Ext.define('AdminConsole.view.portlet.LogViewerPortlet', {
    extend: 'Ext.form.Panel',
    xtype: 'logViewerPortlet',
    id: "log-viewer",
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
    atmosphereConnection: $.atmosphere,
    connected: true,
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
        var request = {
            url: Ext.get('website-base-url').dom.getAttribute('url') + 'log-socket/json/admin-queue-agent-logviewer',
            transport: 'websocket',
            contentType: "application/json",
            logLevel: 'debug',
            shared: true,
            trackMessageLength: true,
            fallbackTransport: 'long-polling'
        };
        request.onMessage = function (response) {
            if (response.status == 200) {
                var data = response.responseBody;
                if (data.length > 0) {
                    var dataJson = jQuery.parseJSON(data);
                    var outputText = Ext.ComponentQuery.query("#outputText")[0];
                    self.text = self.text.append("\n" + dataJson.message, 20000);
                    outputText.update(self.text);
                    outputText.body.scroll("span", 1000000, false);
                }
            }
        };
        this.atmosphereConnection.subscribe(request);
        this.connected = true;
    },
    unsubscribe: function () {
        this.atmosphereConnection.unsubscribe();
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
