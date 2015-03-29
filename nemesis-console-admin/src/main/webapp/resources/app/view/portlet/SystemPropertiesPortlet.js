Ext.define('AdminConsole.view.portlet.SystemPropertiesPortlet', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.syspropertiesportlet',
    xtype: 'systemPropertiesPortlet',
    itemId: 'systemPropertiesPortletId',
    id: 'system-properties-grid',
    frame: false,
    height: 300,
    requires: [
        'Ext.grid.feature.Grouping',
        'AdminConsole.model.SystemProperty'
    ],
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{columnName}: {name}',
        enableGroupingMenu: false,
        id: 'propertiesGrouping'
    }],
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 2
    },
    columns: [{
        text: 'Key',
        flex: 1,
        dataIndex: 'key',
        editor: {
            xtype: 'textfield',
            allowBlank: false,
            emptyText: 'Key'
        }
    }, {
        text: 'Value',
        flex: 1,
        dataIndex: 'value',
        editor: {
            xtype: 'textfield',
            allowBlank: true,
            emptyText: 'Value'
        }
    }],
    tbar: [{
            text: 'Add',
            iconCls: 'add',
            id: 'system-properties-add-btn',
            scope: this,
            handler: this.onAddClick
        },
        '-', {
            text: 'Save',
            iconCls: 'save',
            id: 'system-properties-save-btn',
            scope: this,
            handler: this.onSaveClick
        }, {
            text: 'Delete',
            iconCls: 'delete',
            id: 'system-properties-delete-btn',
            scope: this,
            handler: this.onDeleteClick
        },
        '->', {
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
                    handler: function() {
                        this.setRawValue('');
                        this.up('systemPropertiesPortlet').store.clearFilter();
                    }
                }
            },
            listeners: {
                keyup: function() {
                    var store = this.up('systemPropertiesPortlet').store;
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
    ],

    onAddClick: function() {
        // TODO refactor when backend functionality is ready

        // Create a model instance
        // var rec = new AdminConsole.model.Property({ // Change to SystemProperty
        //     key: '',
        //     value: ''
        // });

        // this.getStore().insert(0, rec);
        // this.cellEditing.startEditByPosition({
        //     row: 0,
        //     column: 0
        // });
    },

    onSaveClick: function() {
        // TODO refactor when backend functionality is ready

        // var store = this.getStore();
        // store.sync({
        //     success: function(batch, options) {
        //         store.load();
        //         Ext.toast({
        //             html: 'Successfully saved!',
        //             closable: false,
        //             align: 't',
        //             slideInDuration: 400,
        //             minWidth: 400
        //         });
        //     },
        //     failure: function(batch, options) {
        //         var error = Ext.decode(responseObject.responseText);
        //         Ext.Msg.alert('Error', 'Error: ' + error);
        //     }
        // });
    },

    onDeleteClick: function() {
        // TODO refactor when backend functionality is ready

        // var grid = Ext.getCmp('system-properties-grid');
        // var selection = grid.getSelectionModel().getSelection();
        // if (grid.getSelectionModel().hasSelection()) {
        //     var selectedRecord = grid.getSelectionModel().getSelection()[0];
        //     this.getStore().removeAt(grid.store.indexOf(selectedRecord));
        // }
    }
});