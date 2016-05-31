Ext.define('AdminConsole.view.portlet.ImportCSVPortlet', {
    extend: 'Ext.form.Panel',
    xtype: 'importCSVPortlet',
    itemId: 'importCSVPortletId',
    id: 'csv-import-form',
    fileUpload: true,
    frame: false,
    border: false,
    height: 354,
    bodyPadding: 10,
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    items: [{
        xtype: 'filefield',
        margin: '0 0 15 0',
        id: 'csvFile',
        emptyText: 'Select a file...',
        fieldLabel: 'File',
        labelAlign: 'top',
        name: 'file',
        buttonText: 'Browse'
    }, {
        xtype: 'label',
        text: 'Content:'
    }, {
        xtype: 'textareafield',
        id: 'csvContent',
        margin: '5 0 0 0',
        width: '100%',
        height: 120
    }],
    buttons: [{
        text: 'Import',
        iconCls: 'database-csv-image',
        itemId: 'importCsvBtn'
    }/*, {
        text: 'Validate',
        iconCls: 'validate-image',
        itemId: 'validateCsvBtn'
    }*/]
});
