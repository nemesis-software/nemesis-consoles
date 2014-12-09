Ext.define('AdminConsole.view.portlet.ImportCSVPortlet', {
    extend: 'Ext.form.Panel',
    xtype: 'importCSVPortlet',
    frame: false,
    border: false,
    height: 354,
    bodyPadding: 10,
    layout: 'anchor',
    requires: [
        'Ext.Array'
    ],
    defaults: {
        anchor: '100%',
        margins: '0 0 0 0'
    },
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            items: [
                {
                    xtype: 'filefield',
                    id: 'csvFile',
                    emptyText: 'Select a file...',
                    fieldLabel: 'File',
                    labelAlign: 'top',
                    name: 'file',
                    buttonText: 'Browse'
                },
                Ext.create('Ext.ux.form.field.CodeMirror', {
                    id: 'csvContent',
                    layout: 'fit',
                    pathModes: Ext.get('contextPath').dom.getAttribute('ctxPath') + '/webjars/codemirror/3.20/mode',
                    pathExtensions: Ext.get('contextPath').dom.getAttribute('ctxPath') + '/webjars/codemirror/3.20/lib/util',
                    labelAlign: 'top',
                    anchor: '100% -50',
                    width: '100%',
                    fieldLabel: 'Content',
                    hideLabel: false,
                    allowBlank: false,
                    allowBlank: true,
                    mode: 'text/x-q',
                    modes: [
                        {
                            mime: ['text/x-q'],
                            dependencies: ['q/q.js']
                        }
                    ],
                    listModes: [
                        {
                            text: 'CSV',
                            mime: 'text/x-q'
                        }
                    ]
                })
            ],
            buttons: [
                {
                    text: 'Import',
                    iconCls: 'database-csv-image',
                    handler: function () {
                        me.importContent(false);
                    }
                },
                {
                    text: 'Validate',
                    iconCls: 'validate-image',
                    handler: function () {
                        me.importContent(true);
                    }
                }
            ]
        });
        this.callParent();
    },

    importContent: function (validate) {
        var stringContent = Ext.getCmp('csvContent').getValue();
        if (stringContent) {
            Ext.Ajax.request({ url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/content',
                method: 'POST',
                params: {
                    content: stringContent,
                    validate: validate
                },
                success: function (responseObject) {
                    var result = Ext.decode(responseObject.responseText);
                    if (result.key) {
                        Ext.toast({
                            html: 'Content is valid!',
                            closable: false,
                            align: 't',
                            slideInDuration: 400,
                            minWidth: 400
                        });
                    } else {
                        Ext.toast({
                            html: 'Invalid content!',
                            closable: false,
                            align: 't',
                            slideInDuration: 400,
                            minWidth: 400
                        });
                    }
                },
                failure: function (responseObject) {
                    var error = Ext.decode(responseObject.responseText);
                    Ext.Msg.alert('Error', 'Error: ' + error);
                }
            });
        } else {
            if (!validate) {
                var form = Ext.getCmp('csv-import-form');
                var csrfValue = Ext.query("meta[name='_csrf_value']")[0].content;
                var csrfHeader = Ext.query("meta[name='_csrf_header']")[0].content;
                if (form.isValid()) {
                    form.submit({
                        url: 'upload',
                        headers: {csrfHeader: csrfValue},
                        waitMsg: 'Uploading your file...',
                        success: function (fp, o) {
                            Ext.MessageBox.show({
                                title: 'Success',
                                msg: validate ? 'Content is valid!' : 'Your file has been uploaded.',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.INFO
                            });
                        },
                        failure: function (fp, o) {
                            console.log(fp);
                            console.log(o);
                            Ext.MessageBox.show({
                                title: 'Error',
                                msg: 'There was an error.',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    });
                }
            }
        }
    }
});
