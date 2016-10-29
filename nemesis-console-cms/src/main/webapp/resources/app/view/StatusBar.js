Ext.define('console.view.StatusBar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'statusBar',
    id: 'content-panel-status-bar',
    page: null,

    initComponent: function () {
        var me = this;

        me.items = [
            {
                xtype: 'label',
                text: "Page: "
            },
            {
                xtype: 'component',
                itemId: 'pageLink',
                autoEl: {
                    tag: 'a',
                    href: '#',
                    id: null,
                    html: null
                },
                listeners: {
                    el: {
                        click: function () {
                            var entityConfiguration = Ext.create("console.markup.abstract_page");
                            console.log(me.items.items[1].html);
                            var window = Ext.getCmp('cms-viewport').getWindow(me.page.id);
                            if (!window) {
                                window = Ext.getCmp(parentCmpId).createWindow({
                                    id: me.page.code,
                                    operation: 'edit',
                                    title: '[' + me.page.title + ']',
                                    iconCls: 'abstract_page',
                                    entity: Ext.create('console.model.Entity', {
                                        entityName: 'abstract_page',
                                        entityId: me.page.id,
                                        entityClassName: me.page.title,
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + 'abstract_page/' + me.page.id,
                                        synchronizable: entityConfiguration.synchronizable
                                    }),
                                    sections: entityConfiguration.sections
                                });
                            }

                            Ext.getCmp('cms-viewport').restoreWindow(window);
                        }
                    }
                }
            }
        ];
        this.callParent();
    },
    updateContent: function (page) {
        var me = this;
        me.page = page;
        me.down('#pageLink').update(page.title);
    }
});
