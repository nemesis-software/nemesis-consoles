Ext.define('HelplineConsole.view.Menu', {
    extend: 'Ext.panel.Panel',
    xtype: 'helplineconsoleMenu',

    requires: [
        'Ext.layout.container.Accordion'
    ],
    title: 'Search',
    rootVisible: false,
    cls: 'examples-list',
    layout: 'accordion',
    defaults: {
        bodyStyle: 'padding:10px'
    },
    lines: false,
    border: true,
    frame: false,
    autoScroll: true,
    useArrows: true,
    initComponent: function () {
        Ext.apply(this, {
            items: [
                {
                    title: 'Tickets',
                    iconCls: 'ticket',
                    xtype: 'panel',

                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Search tickets',
                            defaultType: 'textfield',
                            defaults: {
                                anchor: '100%',
                            },
                            fieldDefaults: {
                                labelAlign: 'top',
                                msgTarget: 'side'
                            },
                            items: [
                                { allowBlank: false, fieldLabel: 'Ticket nr', name: 'ticketNumber', emptyText: 'ticketNumber' },
                                { allowBlank: false, fieldLabel: 'User ID', name: 'userId', emptyText: 'userId' },

                            ]
                        },
                        {
                            xtype: 'button',
                            text: 'Search',
                            iconCls: 'search-btn',
                            style: {
                                'margin-right': '10px'
                            }
                        },
                        {
                            xtype: 'component',
                            autoEl: {
                                tag: 'a',
                                href: '#',
                                html: 'Create'
                            }
                        }
                    ]
                },
                {
                    title: 'Orders',
                    iconCls: 'abstract_order',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Search orders',
                            defaultType: 'textfield',
                            defaults: {
                                anchor: '100%'
                            },
                            fieldDefaults: {
                                labelAlign: 'top',
                                msgTarget: 'side'
                            },
                            items: [
                                { allowBlank: false, fieldLabel: 'Order nr.', name: 'orderNumber', emptyText: 'order number' }
                            ]
                        },
                        {
                            xtype: 'button',
                            text: 'Search',
                            iconCls: 'search-btn',
                            style: {
                                'margin-right': '10px'
                            }
                        },
                        {
                            xtype: 'component',
                            autoEl: {
                                tag: 'a',
                                href: '#',
                                html: 'Create'
                            }
                        }
                    ]
                },
                {
                    title: 'Customer',
                    iconCls: 'customer',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Search customers',
                            defaultType: 'textfield',
                            defaults: {
                                anchor: '100%'
                            },
                            fieldDefaults: {
                                labelAlign: 'top',
                                msgTarget: 'side'
                            },
                            items: [
                                { allowBlank: false, fieldLabel: 'User ID', name: 'user', emptyText: 'user id' },
                                { allowBlank: false, fieldLabel: 'Name', name: 'name', emptyText: 'name' }
                            ]
                        },
                        {
                            xtype: 'button',
                            text: 'Search',
                            iconCls: 'search-btn',
                            handler: this.onSearchCustomerClick,
                            style: {
                                'margin-right': '10px'
                            }
                        },
                        {
                            xtype: 'component',
                            autoEl: {
                                tag: 'a',
                                href: '#',
                                html: 'Create'
                            }
                        }
                    ]
                }
            ]
        });
        this.callParent();
    },
    onSearchCustomerClick: function () {
        Ext.create('Ext.window.Window', {
            layout: 'anchor',
            items: [
                {
                    xtype: 'grid',
                    stripeRows: true,
                    store: Ext.create('Ext.data.Store', {
                        autoLoad: true,
                        autoSync: false,
                        model: 'AdminConsole.model.Property',
                        proxy: {
                            type: 'rest',
                            url: 'http://localhost:8111/platform/property',
                            useDefaultXhrHeader: false,
                            cors: true,
                            reader: {
                                type: 'json'
                            }
                        }
                    })
                }
            ],
            title: 'Results',
            width: 600,
            height: 300,
            id: 'customerResultsWindow',
            modal: true
        }).show();

        Ext.Ajax.request({ url: 'http://localhost:8111/platform/database/',
            method: 'POST',
            params: {'action': 'init'},
            success: function (responseObject) {

            },
            failure: function (responseObject) {
                Ext.Msg.alert('Error', 'Error: ' + responseObject.responseText);
            }
        });
    }
});
