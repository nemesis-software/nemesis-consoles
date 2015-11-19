Ext.define('console.components.menu.Emails', {

    extend: 'Ext.panel.Panel',

    alias: 'widget.console-components-menu-emails',

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            frame: false,
            border: false,
            title: 'Emails',
            iconCls: 'email_configuration',
            items: [
                {
                    bodyPadding: 0,
                    xtype: 'dataview',
                    scroll: 'vertical',
                    trackOver: true,
                    overItemCls: 'x-item-over',
                    emptyText: 'No emails available',
                    itemSelector: 'div.top-carousel-item',
                    tpl: [
                        '<tpl for=".">',
                        '<div id="page-{uid}" class="top-carousel-item">',
                        '<div class="carousel-picture">',
                        '<a><img src="' + Ext.get('website-base-url').dom.getAttribute('url') + 'media/content/{uid}/{uid}.png"></a>',
                        '</div>',
                        '<div class="carousel-item">',
                        '<div class="widget-description">{name}</div>',
                        '<div class="carousel-item-header">{uid}</div>',
                        '</div>',
                        '</div>',
                        '</tpl>'],
                    store: Ext.create('Ext.data.Store',{
                        id: 'emails-store',
                        autoLoad: true,
                        autoSync: false,
                        autoScroll: true,
                        pageSize: 30,
                        model: Ext.define('name', {
                            extend: 'Ext.data.Model',
                            fields: ["uid", "name", "title"]
                        }),
                        proxy: {
                            type: 'rest',
                            url: Ext.get('rest-base-url').dom.getAttribute('url') + 'email_page',
                            limitParam: 'size',
                            useDefaultXhrHeader: false,
                            cors: true,
                            reader: {
                                type: 'json',
                                rootProperty: function (o) {
                                    var data = [];
                                    for (var key in o._embedded) {
                                        data = data.concat(o._embedded[key]);
                                    }
                                    return data;
                                },
                                totalProperty: 'page.totalElements'
                            }
                        }
                    }),
                    listeners: {
                        itemclick: function (view, record, item, index, e, eOpts) {
                            Ext.get('website-iframe').dom.src = Ext.get('website-base-url').dom.getAttribute('url') + "email/page/" + record.raw.uid + "?subject=" + record.raw.title + "&live_edit_view=true&site=" + ((Ext.getCmp('site-combo').getSelection() != null) ? Ext.getCmp('site-combo').getSelection().data.uid : 'solar');
                            view.el.setStyle('background', '#DDDDDD');
                            view.el.setStyle('border-color', '#000');
                        },
                        afterrender: function (p) {
                            Ext.getCmp('emails-pager').setStore(this.getStore());
                        }
                    }
                },
            ],
            bbar: {
                id: 'emails-pager',
                xtype: 'pagingtoolbar',
                store: null,   // will be set in after renderer of the dataview
                displayInfo: false
            }
        });

        me.callParent();
    }
});
