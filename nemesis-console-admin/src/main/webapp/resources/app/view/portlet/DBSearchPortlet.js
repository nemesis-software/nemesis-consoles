Ext.define('AdminConsole.view.portlet.DBSearchPortlet', {
    extend: 'Ext.form.Panel',
    xtype: 'sqlSearchPortlet',
    frame: false,
    border: false,
    bodyPadding: 10,
    height: 300,
    defaults: {
        anchor: '100%',
        margins: '0 0 0 0'
    },
    initComponent: function () {
        Ext.apply(this, {
            items: [
                Ext.create('Ext.ux.form.field.CodeMirror', {
                    id: 'db-search-query',
                    pathModes: Ext.get('contextPath').dom.getAttribute('ctxPath') + '/webjars/codemirror/4.2/mode',
                    pathExtensions: Ext.get('contextPath').dom.getAttribute('ctxPath') + '/webjars/codemirror/4.2/lib/util',
                    labelAlign: 'top',
                    fieldLabel: 'Query',
                    hideLabel: true,
                    anchor: '100% 100%',
                    width: '100%',
                    allowBlank: false,
                    mode: 'text/x-sql',
                    modes: [
                        {
                            mime: ['text/x-sql'],
                            dependencies: ['sql/sql.js']
                        }
                    ],
                    listModes: [
                        {
                            text: 'SQL',
                            mime: 'text/x-sql'
                        },
                        {
                            text: 'MySQL',
                            mime: 'text/x-mysql',
                        },
                        {
                            text: 'MariaDB',
                            mime: 'text/x-mariadb'
                        },
                        {
                            text: 'Cassandra',
                            mime: 'text/x-cassandra'
                        },
                        {
                            text: 'PL/SQL',
                            mime: 'text/x-plsql'
                        },
                        {
                            text: 'MS-SQL',
                            mime: 'text/x-mssql'
                        }
                    ]
                })
            ],
            buttons: [
                {
                    text: 'Run',
                    iconCls: 'database-sql-image',
                    handler: this.onSearchClick
                },
                {
                    text: 'Validate',
                    iconCls: 'validate-image',
                    handler: this.onValidateClick
                }
            ]
        });
        this.callParent(arguments);
    },

    onSearchClick: function () {
        Ext.Ajax.request({ url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/database/',
            method: 'GET',
            params: {'query': Ext.getCmp('db-search-query').getValue(), 'type': 'sql'},
            success: function (responseObject) {
                var result = Ext.decode(responseObject.responseText);

                if (result.key) {

                    var fieldDefs = new Array();
                    var columnDefs = new Array({xtype: 'rownumberer'});
                    for (cl in result.value[0]) {
                        var fieldDef = {};
                        var columnDef = {};
                        columnDef["id"] = result.value[0][cl];
                        columnDef["header"] = result.value[0][cl];
                        columnDef["dataIndex"] = result.value[0][cl];
                        columnDef["flex"] = 1;
                        columnDefs.push(columnDef);

                        fieldDef['name'] = result.value[0][cl];
                        fieldDef['mapping'] = cl;
                        fieldDefs.push(fieldDef);
                    }

                    var values = new Array();

                    for (var i = 1; i < result.value.length; i++) {
                        var val = new Array();
                        for (var j = 0; j < result.value[i].length; j++) {
                            val.push(result.value[i][j]);
                        }
                        values.push(val);
                    }

                    var store = Ext.create('Ext.data.ArrayStore', {storeId: 'myStore', autoLoad: true, fields: fieldDefs, data: values});
                    console.log(values);

                    var window = Ext.create("Ext.Window",
                        {
                            title: 'Results',
                            modal: true,
                            maximizable: true,
                            width: 800,
                            height: 200,
                            layout: 'fit',
                            items: {
                                height: this.height,
                                xtype: "grid",
                                title: 'select id from product',
                                columnLines: true,
                                stripeRows: true,
                                autoScroll: true,
                                columns: columnDefs,
                                store: store,
                                layout: 'fit'
                            }
                        });
                    window.show();

                } else {
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: result.value,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            },
            failure: function (responseObject) {
                var error = Ext.decode(responseObject.responseText);
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: error,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },

    onValidateClick: function () {
        Ext.toast({
            html: 'Successfully validated!',
            closable: false,
            align: 't',
            slideInDuration: 400,
            minWidth: 400
        });
    }
});
