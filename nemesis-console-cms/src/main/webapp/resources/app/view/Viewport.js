Ext.define('console.view.Viewport', {
    extend: 'Ext.container.Viewport',
    id: 'cms-viewport',
    requires: [
        'Ext.layout.container.Border',
        'Ext.layout.container.HBox',
        'console.view.Menu',
        'console.view.ContentPanel'
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
            xtype: 'cmsconsoleMenu',
            id: 'cmsconsole-menu',
            width: 325,
            minWidth: 150,
            split: true,
            stateful: true,
            stateId: 'mainnav.west',
            collapsible: true,
            margins: '5, 0, 5, 5',
            tools: [
                {
                    type: 'refresh',
                    regionTool: true,
                    handler: function () {
                        Ext.getCmp('cmsconsole-menu').mask();
                        console.log('bb');
                        console.log(Ext.getCmp("cmsconsole-menu").items[0]);//.getStore().reload();
                        Ext.getCmp('cmsconsole-menu').unmask();
                    }
                }
            ]
        },
        {
            region: 'center',
            xtype: 'contentPanel',
            margins: '5, 5, 5, 0'
        }
    ],
    createWindow: function (config) {
        var me = this;
        console.log(config.sections);
        return Ext.create('console.view.content.EntityPopupWindow', {
            id: config.id,
            title: config.title,
            iconCls: config.iconCls,
            entity: config.entity,
            entityFields: config.sections,
            modal: true
        });
    }
});
