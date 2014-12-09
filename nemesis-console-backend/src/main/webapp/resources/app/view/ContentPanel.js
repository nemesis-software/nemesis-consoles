Ext.define('console.view.ContentPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'contentPanel',
    id: 'content-panel',
    border: true,
    layout: 'border',
    requires: [
        'console.view.TabPanel',
        'console.view.TaskBar'
    ],

    initComponent: function () {
        this.items = [
            {
                region: 'center',
                xtype: 'tabPanel'
            },
            {
                region: 'south',
                xtype: 'taskbar'
            }
        ];

        this.callParent();
    }
});
