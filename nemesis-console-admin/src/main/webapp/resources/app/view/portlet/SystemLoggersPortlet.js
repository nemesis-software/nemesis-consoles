Ext.define('AdminConsole.view.portlet.SystemLoggersPortlet', {
    extend: 'Ext.grid.Panel',
    xtype: 'systemLoggersPortlet',
    frame: false,
    height: 300,
    logLevels: [],
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'AdminConsole.model.Logger',
        'AdminConsole.model.LogLevel'
    ],

    initComponent: function () {
        var me = this;
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 2
        });

        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: false,
            storeId: 'loggerListStore',
            model: 'AdminConsole.model.Logger',
            proxy: {
                type: 'rest',
                useDefaultXhrHeader: false,
                url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/logger',
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json'
                }
            }
        });

        Ext.apply(this, {
            height: this.height,
            store: store,
            stripeRows: true,
            plugins: [this.cellEditing],
            columnLines: true,
            id: 'system-loggers-grid',
            columns: [
                {
                    text: 'Name',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'name',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        emptyText: 'Logger name'
                    }
                },
                {
                    text: 'Parent Name',
                    width: 100,
                    sortable: true,
                    dataIndex: 'parentName',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: true,
                        emptyText: 'Parent name'
                    }
                },
                {
                    text: 'Level',
                    width: 75,
                    sortable: true,
                    dataIndex: 'level',
                    editor: {
                        xtype: 'combo',
                        allowBlank: true,
                        valueField: 'id',
                        displayField: 'id',
                        store: Ext.create('Ext.data.ArrayStore', {
                            model: 'AdminConsole.model.LogLevel',
                            proxy: {
                                type: 'rest',
                                url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/loglevel',
                                useDefaultXhrHeader: false,
                                cors: true,
                                reader: {
                                    type: 'json',
                                    idProperty: 'id'
                                }
                            }
                        })
                    }
                }
            ],
            selModel: {
                selType: 'cellmodel'
            },
            tbar: [
                {
                    text: 'Add',
                    iconCls: 'add',
                    id: 'system-loggers-add-btn',
                    scope: this,
                    handler: this.onAddClick
                },
                '-',
                {
                    text: 'Save',
                    iconCls: 'save',
                    id: 'system-loggers-save-btn',
                    scope: this,
                    handler: this.onSaveClick
                },
                {
                    text: 'Delete',
                    iconCls: 'delete',
                    id: 'system-loggers-delete-btn',
                    scope: this,
                    handler: this.onDeleteClick
                },
                '->',
                {
                    emptyText: 'Filter...',
                    text: 'category filter',
                    xtype: 'textfield',
                    id: 'system-loggers-filter',
                    width: 150,
                    enableKeyEvents: true,
                    triggers: {
                        clear: {
                            cls: 'x-form-clear-trigger',
                            weight: 1, // controls display order
                            handler: function () {
                                this.setRawValue('');
                                this.up('tablepanel').store.clearFilter();
                            }
                        }
                    },
                    listeners: {
                        keyup: function () {
                            var store = this.up('tablepanel').store;
                            store.clearFilter();
                            if (this.value) {
                                store.filter({
                                    property: 'name',
                                    value: this.value,
                                    anyMatch: true,
                                    caseSensitive: false
                                });
                            }
                        },
                        buffer: 500
                    }
                }
            ]
        });

        this.callParent(arguments);
    },

    viewConfig: {
        stripeRows: true
    },

    onAddClick: function () {
        // Create a model instance
        var rec = Ext.create('AdminConsole.model.Logger');

        this.getStore().insert(0, rec);
        this.cellEditing.startEditByPosition({
            row: 0,
            column: 0
        });
    },

    onSaveClick: function () {
        var store = this.getStore();
        store.sync({
            success: function (batch, options) {
                store.load();
                Ext.toast({
                    html: 'Successfully saved!',
                    closable: false,
                    align: 't',
                    slideInDuration: 400,
                    minWidth: 400
                });
            },
            failure: function (responseObject, options) {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: responseObject.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });

            }
        });
    },
    onDeleteClick: function () {
        var grid = Ext.getCmp('system-loggers-grid');
        var selection = grid.getSelectionModel().getSelection();
        if (grid.getSelectionModel().hasSelection()) {
            var selectedRecord = grid.getSelectionModel().getSelection()[0];
            this.getStore().removeAt(grid.store.indexOf(selectedRecord));
        }
    }
});
