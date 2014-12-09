Ext.define('AdminConsole.view.portlet.PlatformTestsPortlet', {
    extend: 'Ext.grid.Panel',
    xtype: 'platformTestsPortlet',
    frame: false,
    height: 300,
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'AdminConsole.model.Test'
    ],

    initComponent: function () {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 2
        });

        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: false,
            model: 'AdminConsole.model.Test',
            proxy: {
                type: 'rest',
                url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/test',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                writer: {
                    type: 'json'
                }
            },
            listeners: {
                write: function (store, operation) {
                    var record = operation.getRecords()[0],
                        name = Ext.String.capitalize(operation.action),
                        verb;


                    if (name == 'Destroy') {
                        record = operation.records[0];
                        verb = 'Destroyed';
                    } else {
                        verb = name + 'd';
                    }
                    Ext.example.msg(name, Ext.String.format("{0} user: {1}", verb, record.getId()));

                }
            }
        });

        Ext.apply(this, {
            height: this.height,
            store: store,
            stripeRows: true,
            plugins: [this.cellEditing],
            columnLines: true,
            columns: [
                {
                    text: 'Class name',
                    flex: 1,
                    sortable: true,
                    renderer: this.testRenderer,
                    dataIndex: 'className'
                }
            ],
            selModel: {
                selType: 'checkboxmodel'
            },
            tbar: [
                {
                    text: 'Run',
                    iconCls: 'run-image',
                    scope: this,
                    handler: this.onAddClick
                },
                '-',
                {
                    xtype: 'radiogroup',
                    name: 'test-type-radiogroup',
                    width: '50%',
                    items: [
                        {
                            inputValue: true,
                            name: 'test-type-radiogroup',
                            boxLabel: 'Integ.',
                            labelStyle: 'color: #f00;'
                        },
                        {
                            inputValue: false,
                            name: 'test-type-radiogroup',
                            boxLabel: 'Unit'
                        },
                        {
                            inputValue: false,
                            name: 'test-type-radiogroup',
                            boxLabel: 'Both',
                            checked: true
                        }
                    ]
                },
                '-',
                '->',
                {
                    emptyText: 'Filter...',
                    text: 'category filter',
                    xtype: 'textfield',
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
                                    property: 'className',
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

    testRenderer: function (val) {
        if (val.isIntegration) {
            return '<span style="color:#000000;">' + val + '%</span>';
        }
        return '<span style="color:#6894C2;">' + val + '%</span>';
    },

    viewConfig: {
        stripeRows: true
    }
});
