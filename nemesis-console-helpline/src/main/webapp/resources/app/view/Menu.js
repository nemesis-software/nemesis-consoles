Ext.define('HelplineConsole.view.Menu', {
    extend: 'Ext.panel.Panel',
    xtype: 'helplineconsoleMenu',

    requires: [
        'Ext.layout.container.Accordion',
        'HelplineConsole.model.User',
        'HelplineConsole.model.Order'
    ],
    title: 'Search',
    cls: 'examples-list',
    layout: 'accordion',
    defaults: {
        bodyStyle: 'padding:10px'
    },

    items: [{
        xtype: 'panel',
        title: 'Tickets',
        iconCls: 'ticket',
        items: [{
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
            items: [{
                allowBlank: false,
                fieldLabel: 'Ticket nr',
                name: 'ticketNumber',
                emptyText: 'ticketNumber'
            }, {
                allowBlank: false,
                fieldLabel: 'User ID',
                name: 'userId',
                emptyText: 'userId'
            }]
        }, {
            xtype: 'button',
            text: 'Search',
            iconCls: 'search-btn',
            style: {
                'margin-right': '10px'
            }
        }, {
            xtype: 'component',
            autoEl: {
                tag: 'a',
                href: '#',
                html: 'Create'
            }
        }]
    }, {
        xtype: 'panel',
        id: 'ordersPanel',
        title: 'Orders',
        iconCls: 'abstract_order',
        items: [{
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
            items: [{
                allowBlank: false,
                itemId: 'orderSearchField',
                fieldLabel: 'Order nr.',
                name: 'orderNumber',
                emptyText: 'order number'
            }]
        }, {
            xtype: 'button',
            itemId: 'orderSearchBtn',
            id: 'orderSearchBtn',
            text: 'Search',
            iconCls: 'search-btn',
            style: {
                'margin-right': '10px'
            }
        }, {
            xtype: 'component',
            autoEl: {
                tag: 'a',
                href: '#',
                html: 'Create'
            }
        }]
    }, {
        xtype: 'panel',
        id: 'customersPanel',
        title: 'Customers',
        iconCls: 'customer',
        items: [{
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
            items: [{
                allowBlank: false,
                itemId: 'userSearchField',
                fieldLabel: 'User ID',
                name: 'user',
                emptyText: 'user id'
            }, {
                // allowBlank: false,
                fieldLabel: 'Name',
                name: 'name',
                emptyText: 'name'
            }]
        }, {
            xtype: 'button',
            itemId: 'userSearchBtn',
            id: 'userSearchBtn',
            text: 'Search',
            iconCls: 'search-btn',
            style: {
                'margin-right': '10px'
            }
        }, {
            xtype: 'button',
            text: 'Create',
            iconCls: 'create-user'
        }]
    }]
});