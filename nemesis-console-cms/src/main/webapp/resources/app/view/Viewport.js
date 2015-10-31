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

    windows: new Ext.util.MixedCollection(),

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

    getWindow: function (id) {
        return this.windows.get('w_id_' + id.replace(/@/g, '_AT_'));
    },

    createWindow: function (config) {
        console.log(config.sections);
        var me = this,
            win = Ext.create('console.view.content.EntityPopupWindow', {
                config: config,
                modal: true
            });
        me.windows.add(win);

        return win;
    },

    restoreWindow: function (win) {
        if (win.isVisible()) {
            win.restore();
            win.toFront();
        } else {
            win.show();
        }
        return win;
    }
});
