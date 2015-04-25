Ext.define('AdminConsole.view.portlet.DBSearchPortlet', {
    extend: 'Ext.form.Panel',
    xtype: 'sqlSearchPortlet',
    itemId: 'sqlSearchPortletId',
    frame: false,
    border: false,
    height: 300,
    bodyPadding: 10,
    defaults: {
        anchor: '100%'
    },
    items: [{
        xtype: 'label',
        text: 'Query'
    }, {
        xtype: 'textareafield',
        id: 'dbSearchQuery',
        margin: '5 0 0 0',
        width: '100%',
        height: 190
    }],
    buttons: [{
        text: 'Run',
        iconCls: 'database-sql-image',
        itemId: 'runSqlBtn'
    }, {
        text: 'Validate',
        iconCls: 'validate-image',
        itemId: 'validateSqlBtn'
    }]
});