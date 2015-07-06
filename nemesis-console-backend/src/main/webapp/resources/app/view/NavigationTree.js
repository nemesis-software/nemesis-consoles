Ext.define('console.view.NavigationTree', function () {
    var self;  // This is a variable to store "this"

    return {
        extend: 'Ext.tree.Panel',
        xtype: 'backendconsoleTreeMenu',
        rootVisible: false,
        id: 'navigation-tree',
        cls: 'tree-list',
        //layout: 'anchor',
        margins: '0, 0, 5, 0',
        lines: true,
        border: true,
        frame: false,
        scrollable: true,
        useArrows: false,
        ctxMenu: null,
        requires: ['console.model.TreeModel'],
        columns: [{
            xtype: 'treecolumn',
            dataIndex: 'text',
            flex: 1,
            renderer: function(value){
                return translate(value);
            }
        }],
        hideHeaders: true,
        constructor: function () {
            self = this;  // Here you store "this" in the closure
            self.callParent(arguments);
        },
        listeners: {
            itemcontextmenu: function (view, record, item, index, eventObj) {
                view.select(record);
                eventObj.stopEvent();
                this.ctxMenu = this.buildCtxMenu(record);

                this.ctxMenu.showAt(eventObj.getXY());
            },
            itemclick: function (view, record, item, index, eventObj) {
                if (record.get('leaf')) {
                    var tabCmp = Ext.getCmp('tab-panel');
                    if (!tabCmp.getComponent(record.get('id'))) {

                        var entity = Ext.create("console.model.Entity", {id: record.get('id'), name: translate(record.get('id')), url: Ext.get('rest-base-url').dom.getAttribute('url') + record.get('id'), className: ''});

                        tabCmp.add(Ext.create("console.view.content.Page", {
                            itemId: entity.data.id,
                            title: entity.data.id,
                            iconCls: record.get('iconCls'),
                            entity: entity,
                            contentPanel: this.contentPanel
                        })).show();
                    } else {
                        tabCmp.setActiveTab(record.get('id'));
                    }
                }
            }
        },
        initComponent: function () {
            var store = new Ext.data.TreeStore({
                model: 'console.model.TreeModel',
                hasFilter: false,
                clearOnLoad: false,
                proxy: {
                    type: 'ajax',
                    url: Ext.get('rest-base-url').dom.getAttribute('url') + 'backend/navigation',
                    reader: {
                        type: 'json'
                    }
                },
                applyFilter: function (filter, value) {
                    var v;
                    try {
                        v = new RegExp(value, 'i');
                        this.filter({
                            filterFn: function (node) {
                                var children = node.childNodes,
                                    len = children && children.length,

                                // Visibility of leaf nodes is whether they pass the test.
                                // Visibility of branch nodes depends on them having visible children.
                                    visible = node.isLeaf() ? v.test(node.get('text')) : false;

                                // We're visible if one of our child nodes is visible.
                                // No loop body here. We are looping only while the visible flag remains false.
                                // Child nodes are filtered before parents, so we can check them here.
                                // As soon as we find a visible child, this branch node must be visible.
                                for (i = 0; i < len && !(visible = children[i].get('visible')); i++);

                                //expand the nodes with visible children(s)
                                if (!node.isLeaf() && visible) {
                                    node.expand();
                                }

                                return visible;
                            },
                            id: 'menuTreeTextFilter'
                        });
                    } catch (e) {
                        this.markInvalid('Invalid regular expression');
                    }

                    self.hasFilter = true;
                },
                isFiltered: function () {
                    return this.hasFilter;
                }
            });

            var loadMask = new Ext.LoadMask(this, {
                store: store
            });

            Ext.apply(this, {
                store: store
            });
            this.callParent();
        },
        buildCtxMenu: function (record) {
            var menu = Ext.create('Ext.menu.Menu', {
                items: [
                    {
                        itemId: 'create',
                        handler: function () {
                            var entityConfiguration = Ext.create("console.markup." + record.get('id'));
                            var window = Ext.getCmp('backend-viewport').createWindow({id: "", title: '[' + record.get('text') + ']', iconCls: record.get('id'), entity: Ext.create('console.model.Entity', {name: record.get('text'), url: Ext.get('rest-base-url').dom.getAttribute('url') + record.get('id')}), sections: entityConfiguration.sections, synchronizable: entityConfiguration.synchronizable});
                            Ext.getCmp('backend-viewport').restoreWindow(window);
                        },
                        text: 'Create',
                        iconCls: 'add'
                    }
                ]
            });

            if (record.data.childNodes !== null && record.data.childNodes.length > 0) {
                var submenu = Ext.create('Ext.menu.Menu');
                Ext.each(record.data.childNodes,
                    function (item) {
                        submenu.add({
                            text: item.text,
                            iconCls: item.iconCls,
                            itemId: item.text,
                            handler: function () {
                                var entityConfiguration = Ext.create("console.markup." + item.id);
                                var window = Ext.getCmp('backend-viewport').createWindow({id: null, title: '[' + item.text + ']', iconCls: item.iconCls, entity: Ext.create('console.model.Entity', {name: item.text, url: Ext.get('rest-base-url').dom.getAttribute('url') + item.id}), sections: entityConfiguration.sections});
                                Ext.getCmp('backend-viewport').restoreWindow(window);
                            }
                        })
                    }
                );

                menu.items.items[0].setMenu(submenu);
            }

            return menu;
        }
    }

});
