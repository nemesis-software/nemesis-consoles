Ext.define('AdminConsole.view.portlet.PlatformInfoPortlet', {
    extend: 'Ext.tab.Panel',
    xtype: 'platformInfoPortlet',
    itemId: 'platformInfoPortletId',
    frame: false,
    border: false,
    height: '100%',
    flex: 1,
    layout: 'fit',
    items: [{
        title: 'Application',
        itemId: 'applicationTab',
        iconCls: 'platform-info-application',
        layout: 'column',
        defaults: {
            margin: '5 0 0 5'
        },
        items: [{
            itemId: 'applicationTabPropertyColumn',
            id: 'applicationTabPropertyColumnId',
            columnWidth: 0.3,
            layout: 'vbox',
            border: 0,
            items: [],
            defaults: {
                style: {
                    fontWeight: 'bold'
                }
            }
        }, {
            itemId: 'applicationTabValueColumn',
            id: 'applicationTabValueColumnId',
            columnWidth: 0.7,
            layout: 'vbox',
            border: 0,
            items: []
        }]
    }, {
        title: 'Platform',
        itemId: 'platformTab',
        id: 'platformTabId',
        iconCls: 'platform-info-platform',
        layout: 'column',
        defaults: {
            margin: '5 0 0 5'
        },
        items: [{
            itemId: 'platformTabPropertyColumn',
            id: 'platformTabPropertyColumnId',
            columnWidth: 0.3,
            layout: 'vbox',
            border: 0,
            items: [],
            defaults: {
                style: {
                    fontWeight: 'bold'
                }
            }
        }, {
            itemId: 'platformTabValueColumn',
            id: 'platformTabValueColumnId',
            columnWidth: 0.7,
            layout: 'vbox',
            border: 0,
            items: []
        }]
    }]
});