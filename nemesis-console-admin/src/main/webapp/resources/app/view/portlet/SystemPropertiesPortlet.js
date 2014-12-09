Ext.define('AdminConsole.view.portlet.SystemPropertiesPortlet', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.syspropertiesportlet',
    xtype: 'systemPropertiesPortlet',
    frame: false,
    height: 300,
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'AdminConsole.model.Property'
    ],

    initComponent: function () {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 2
        });

        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: false,
            storeId: 'propertiesListStore',
            model: 'AdminConsole.model.Property',
            proxy: {
                type: 'rest',
                url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/property',
                useDefaultXhrHeader: false,
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    encode: false,
                    writeAllFields: true
                }
            }
        });

        Ext.apply(this, {
            height: this.height,
            plugins: [this.cellEditing],
            store: store,
            id: 'system-properties-grid',
            stripeRows: true,
            columnLines: true,
            columns: [
                {
                    text: 'Key',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'key',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        emptyText: 'Key'
                    }
                },
                {
                    text: 'Value',
                    width: 250,
                    sortable: true,
                    dataIndex: 'value',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: true,
                        emptyText: 'Value'
                    }
                }
            ],
            selModel: {
                selType: 'rowmodel'
            },
            tbar: [
                {
                    text: 'Add',
                    iconCls: 'add',
                    id: 'system-properties-add-btn',
                    scope: this,
                    handler: this.onAddClick
                },
                '-',
                {
                    text: 'Save',
                    iconCls: 'save',
                    id: 'system-properties-save-btn',
                    scope: this,
                    handler: this.onSaveClick
                },
                {
                    text: 'Delete',
                    iconCls: 'delete',
                    id: 'system-properties-delete-btn',
                    scope: this,
                    handler: this.onDeleteClick
                },
                '->',
                {
                    emptyText: 'Filter...',
                    text: 'category filter',
                    xtype: 'textfield',
                    id: 'system-properties-filter',
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
                                    property: 'key',
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

    onAddClick: function () {
        // Create a model instance
        var rec = new AdminConsole.model.Property({
            key: '',
            value: ''
        });

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
                console.log(options);
                store.load();
                Ext.toast({
                    html: 'Successfully saved!',
                    closable: false,
                    align: 't',
                    slideInDuration: 400,
                    minWidth: 400
                });
            },
            failure: function (batch, options) {
                var error = Ext.decode(responseObject.responseText);
                Ext.Msg.alert('Error', 'Error: ' + error);
            }
        });
    },

    onDeleteClick: function () {
        var grid = Ext.getCmp('system-properties-grid');
        var selection = grid.getSelectionModel().getSelection();
        if (grid.getSelectionModel().hasSelection()) {
            var selectedRecord = grid.getSelectionModel().getSelection()[0];
            this.getStore().removeAt(grid.store.indexOf(selectedRecord));
        }
    }
});
