Ext.define('console.view.Menu', {
    extend: 'Ext.form.Panel',
    xtype: 'backendconsoleMenu',
    id: 'navigation-menu',
    title: 'Navigation',
    filterEmptyText: 'Filter...',
    layout: {
        type: 'border'
    },
    defaults: {
        xtype: 'panel'
    },
    requires: [
        'console.view.ux.SearchField',
        'console.view.NavigationTree'
    ],

    initComponent: function () {
        this.items = [
            {
                region: 'north',
                emptyText: this.filterEmptyText,
                xtype: 'customtrigger',
                id: 'navigation-menu-filter',
                width: 150,
                enableKeyEvents: true,
                triggers: {
                    clear: {
                        cls: 'x-form-clear-trigger',
                        weight: 1, // controls display order
                        handler: function () {
                            var tree = Ext.getCmp('navigation-tree');
                            var store = tree.getStore();
                            this.reset();
                            store.clearFilter();
                            tree.collapseAll();
                            this.focus();
                        }
                    }
                },
                listeners: {
                    keyup: function () {
                        var tree = Ext.getCmp('navigation-tree');
                        tree.getEl().mask("Loading...")
                        var store = tree.getStore();
                        store.clearFilter();
                        if (this.value) {
                            store.applyFilter('text', this.value);
                        }
                        tree.getEl().unmask()
                    },
                    buffer: 500
                }
            },
            {
                region: 'center',
                xtype: "backendconsoleTreeMenu",
                contentPanel: this.contentPanel
            }
        ];

        this.callParent();
    }
});
