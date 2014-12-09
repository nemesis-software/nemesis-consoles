Ext.define('HelplineConsole.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Ext.layout.container.Border',
        'Ext.layout.container.HBox',
        'HelplineConsole.view.Header',
        'HelplineConsole.view.Menu',
        'HelplineConsole.view.ContentPanel',
        'HelplineConsole.view.Chat'
    ],

    layout: 'border',

    items: [
        {
            region: 'north',
            xtype: 'appHeader',
            height: 35
        },
        {
            region: 'west',
            xtype: 'helplineconsoleMenu',
            width: 350,
            minWidth: 100,
            split: true,
            stateful: true,
            stateId: 'mainnav.west',
            collapsible: true,
            margins: '5, 0, 5, 5',
        },
        {
            region: 'center',
            xtype: 'contentPanel',
            margins: '5, 0, 5, 0'
        },
        {
            region: 'east',
            xtype: 'helplineconsoleChat',
            width: 350,
            minWidth: 200,
            split: true,
            stateful: true,
            stateId: 'mainnav.east',
            collapsible: true,
            margins: '5, 5, 5, 0',
            tools: [
                {
                    type: 'refresh',
                    regionTool: false,
                    handler: this.reloadChat
                }
            ]
        }
    ],

    reloadChat: function () {
        Ext.getCmp('chatlog-incoming-messages').mask();
        Ext.getCmp('chatlog-incoming-messages').getStore().reload();
        Ext.getCmp('chatlog-incoming-messages').unmask();
    },
});
