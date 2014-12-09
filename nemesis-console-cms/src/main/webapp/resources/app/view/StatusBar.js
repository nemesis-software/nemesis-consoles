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
                text: "Page: ",
            },
            {
                xtype: 'component',
                autoEl: {
                    tag: 'a',
                    href: '#',
                    id: null,
                    html: null,
                },
                listeners: {
                    el: {
                        click: function () {
                            var entityConfiguration = Ext.create("console.markup.abstract_page");
                            console.log(me.items.items[1].html);
                            var window = Ext.getCmp('cms-viewport').createWindow({id: me.page.uid, title: '[' + me.page.title + ']', iconCls: 'abstract_page', entity: Ext.create('console.model.Entity', {name: me.page.title, url: Ext.get('rest-base-url').dom.getAttribute('url') + 'abstract_page/' + me.page.pk}), sections: entityConfiguration.sections});

                            window.show();
                        }
                    }
                }
            }
        ];
        this.callParent();
    },
    updateContent: function (page) {
        this.page = page;
        this.items.items[1].update(page.title);
    }
});
