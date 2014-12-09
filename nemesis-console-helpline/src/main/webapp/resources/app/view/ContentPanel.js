Ext.define('HelplineConsole.view.ContentPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'contentPanel',
    id: 'content-panel',

    layout: {
        type: 'table',
        columns: 1,
        tableAttrs: {
            style: {
                width: '100%'
            }
        }
    },

    defaults: {
        xtype: 'panel'
    },

    initComponent: function () {
        this.items = [

        ];

        this.callParent();
    }
});
