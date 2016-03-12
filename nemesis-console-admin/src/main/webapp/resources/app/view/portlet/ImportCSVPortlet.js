Ext.define('AdminConsole.view.portlet.ImportCSVPortlet', {
    extend: 'Ext.form.Panel',
    xtype: 'importCSVPortlet',
    itemId: 'importCSVPortletId',
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
    }, {
        text: 'Validate',
        iconCls: 'validate-image',
        itemId: 'validateCsvBtn'
    }]
    // TODO: remove after file upload is implemented; left to be used as a reference
    // importContent: function(validate) {
    //     var stringContent = Ext.getCmp('csvContent').getValue();
    //     if (stringContent) {
    //         Ext.Ajax.request({
    //             url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/content',
    //             method: 'POST',
    //             params: {
    //                 content: stringContent,
    //                 validate: validate
    //             },
    //             success: function(responseObject) {
    //                 var result = Ext.decode(responseObject.responseText);
    //                 if (result.key) {
    //                     Ext.toast({
    //                         html: 'Content is valid!',
    //                         closable: false,
    //                         align: 't',
    //                         slideInDuration: 400,
    //                         minWidth: 400
    //                     });
    //                 } else {
    //                     Ext.toast({
    //                         html: 'Invalid content!',
    //                         closable: false,
    //                         align: 't',
    //                         slideInDuration: 400,
    //                         minWidth: 400
    //                     });
    //                 }
    //             },
    //             failure: function(responseObject) {
    //                                 Ext.MessageBox.show({
    //                                           title: 'Error',
    //                                           msg: responseObject.responseText,
    //                                           buttons: Ext.MessageBox.OK,
    //                                           icon: Ext.MessageBox.ERROR
    //                                       });

    //             }
    //         });
    //     } else {
    //         if (!validate) {
    //             var form = Ext.getCmp('csv-import-form');
    //             var csrfValue = Ext.query("meta[name='_csrf_value']")[0].content;
    //             var csrfHeader = Ext.query("meta[name='_csrf_header']")[0].content;
    //             if (form.isValid()) {
    //                 form.submit({
    //                     url: 'upload',
    //                     headers: {
    //                         csrfHeader: csrfValue
    //                     },
    //                     waitMsg: 'Uploading your file...',
    //                     success: function(fp, o) {
    //                         Ext.MessageBox.show({
    //                             title: 'Success',
    //                             msg: validate ? 'Content is valid!' : 'Your file has been uploaded.',
    //                             buttons: Ext.MessageBox.OK,
    //                             icon: Ext.MessageBox.INFO
    //                         });
    //                     },
    //                     failure: function(fp, o) {
    //                         console.log(fp);
    //                         console.log(o);
    //                         Ext.MessageBox.show({
    //                             title: 'Error',
    //                             msg: 'There was an error.',
    //                             buttons: Ext.MessageBox.OK,
    //                             icon: Ext.MessageBox.ERROR
    //                         });
    //                     }
    //                 });
    //             }
    //         }
    //     }
    // }
});
