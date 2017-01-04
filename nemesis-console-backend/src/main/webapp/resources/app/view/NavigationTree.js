Ext.define('console.view.NavigationTree', function () {
    var self;  // This is a variable to store "this"

    function filterFunction(node, text) {
        var regex = new RegExp(text, 'i');

        if (node.isLeaf()) {
            return regex.test(translate(node.get('text')));
        }

        var children = node.childNodes;
        var childrenCount = children && children.length;

        for (var i = 0; i < childrenCount; i++) {
            if (filterFunction(children[i], text)) {
                node.expand();
                return true;
            }
        }

        return false;
    }

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
            renderer: function (value) {
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

                        var entity = Ext.create("console.model.Entity", {
                            entityName: record.get('id'),
                            entityClassName: translate(record.get('id')),
                            url: Ext.get('rest-base-url').dom.getAttribute('url') + record.get('id')
                        });

                        tabCmp.add(Ext.create("console.view.content.Page", {
                            itemId: entity.data.entityName,
                            title: entity.data.entityName,
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
                    try {
                        this.filter({
                            filterFn: function (node) {
                                return filterFunction(node, value);
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
                            var entity = Ext.create('console.model.Entity', {
                                entityName: record.get('text'),
                                entityClassName: record.get('text'),
                                url: Ext.get('rest-base-url').dom.getAttribute('url') + record.get('id'),
                                isNew: true
                            });
                            var window = Ext.getCmp('viewport').createWindow({
                                id: null,
                                title: '[' + record.get('text') + ']',
                                iconCls: record.get('id'),
                                entity: entity,
                                sections: entityConfiguration.sections,
                                synchronizable: entityConfiguration.synchronizable
                            });
                            Ext.getCmp('viewport').restoreWindow(window);
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
                                var window = Ext.getCmp('viewport').createWindow({
                                    id: null,
                                    title: '[' + item.text + ']',
                                    iconCls: item.iconCls,
                                    entity: Ext.create('console.model.Entity', {
                                        entityName: item.text,
                                        entityClassName: item.text,
                                        isNew: true,
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + item.id
                                    }),
                                    sections: entityConfiguration.sections
                                });
                                Ext.getCmp('viewport').restoreWindow(window);
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
