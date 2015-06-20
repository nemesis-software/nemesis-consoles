Ext.define('console.view.Menu', {
    extend: 'Ext.panel.Panel',
    xtype: 'cmsconsoleMenu',

    requires: [
        'Ext.view.View',
        'Ext.XTemplate',
        'Ext.layout.container.Accordion'
    ],
    title: 'Configure',
    rootVisible: false,
    cls: 'examples-list',
    layout: 'accordion',
    defaults: {
        bodyStyle: 'overflow-y:auto;'
    },
    lines: false,
    border: false,
    autoScroll: true,
    useArrows: true,
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            items: [
                {
                    xtype: 'panel',
                    frame: false,
                    border: false,
                    title: 'Page Templates',
                    iconCls: 'abstract_template',
                    items: [
                        {
                            bodyPadding: 0,
                            xtype: 'dataview',
                            scroll: 'vertical',
                            trackOver: true,
                            itemSelector: 'div.top-carousel-item',
                            overItemCls: 'x-item-over',
                            emptyText: 'No templates available',
                            tpl: [
                                '<tpl for=".">',
                                '<div id="template-{uid}" class="top-carousel-item">',
                                '<div class="carousel-picture">',
                                '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="width: 124px; height: 185px" id="svg-template-{uid}">',
                                '<rect width="124" height="185" fill="none" stroke-width="1" stroke="#000000" />',
                                '{previewCanvas}',
                                '</svg>',
                                '</div>',
                                '<div class="carousel-item">',
                                '<div class="widget-description">{name}</div>',
                                '<div class="carousel-item-header">{uid}</div>',
                                '</div>',
                                '</div>',
                                '</tpl>'
                            ],
                            store: Ext.create('Ext.data.Store',
                                {
                                    id: 'page-template-store',
                                    autoLoad: true,
                                    autoSync: false,
                                    autoScroll: true,
                                    pageSize: 100,
                                    model: Ext.define('name', {
                                        extend: 'Ext.data.Model',
                                        fields: ["uid", "name", "title", "previewCanvas"]
                                    }),
                                    proxy: {
                                        type: 'rest',
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + 'page_template/search/findAllByCatalogVersionEquals?catalogVersion=' + Ext.get('catalogVersion').dom.getAttribute('value'),
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
                                })
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    frame: false,
                    border: false,
                    title: 'Pages',
                    iconCls: 'abstract_page',
                    items: [
                        {
                            bodyPadding: 0,
                            xtype: 'dataview',
                            scroll: 'vertical',
                            trackOver: true,
                            itemSelector: 'div.top-carousel-item',
                            overItemCls: 'x-item-over',
                            emptyText: 'No pages available',
                            tpl: new Ext.XTemplate(
                                '<tpl for=".">',
                                '<div id="page-{uid}" class="top-carousel-item">',
                                '<div class="carousel-picture">',
                                '<a><img src="' + Ext.get('website-base-url').dom.getAttribute('url') + 'media/content/{uid}/{uid}.png"></a>',
                                '<rect width="124" height="185" fill = "none" stroke-width = "1" stroke = "#000000" />',
                                '{[this.getPageCanvas()]}',
                                '{previewCanvas}',
                                '</div>',
                                '<div class="carousel-item">',
                                '<div class="widget-description">{name}</div>',
                                '<div class="carousel-item-header">{uid}</div>',
                                '</div>',
                                '</div>',
                                '</tpl>',
                                {
                                    getPageCanvas: function () {
                                        return me.pageCanvas;
                                    }
                                }
                            ),
                            store: Ext.create('Ext.data.Store',
                                {
                                    id: 'content-page-store',
                                    autoLoad: true,
                                    autoSync: false,
                                    autoScroll: true,
                                    pageSize: 100,
                                    model: Ext.define('name', {
                                        extend: 'Ext.data.Model',
                                        fields: ["uid", "name", "title"]
                                    }),
                                    proxy: {
                                        type: 'rest',
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + 'content_page/search/findAllByCatalogVersion?catalogVersion=' + Ext.get('catalogVersion').dom.getAttribute('value'),
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
                                })
                        }
                    ]
                },
                {
                    title: 'Slots For This Page',
                    iconCls: 'content_slot',
                    id: 'page-slot-store',
                    xtype: 'panel',
                    frame: false,
                    border: false,
                    items: [
                        {
                            bodyPadding: 0,
                            xtype: 'dataview',
                            scroll: 'vertical',
                            trackOver: true,
                            overItemCls: 'x-item-over',
                            itemSelector: 'div.top-carousel-item',
                            emptyText: 'No slots available',
                            tpl: new Ext.XTemplate(
                                '<tpl for=".">',
                                '<div class="top-carousel-item" id="slot-{uid}">',
                                '<div class="carousel-picture">',
                                '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="width: 124px; height: 185px">',
                                '<rect width="124" height="185" fill = "none" stroke-width = "1" stroke = "#000000" />',
                                '{[this.getTemplateCanvas()]}',
                                '{previewCanvas}',
                                '</svg>',
                                '</div>',
                                '<div class="carousel-item">',
                                '<div class="widget-description">{position}</div>',
                                '<div class="carousel-item-header">{uid}</div>',
                                '</div>',
                                '</div>',
                                '</tpl>',
                                {
                                    getTemplateCanvas: function () {
                                        return me.templateCanvas;
                                    }
                                }
                            ),
                            store: Ext.create('Ext.data.Store',
                                {
                                    id: 'content-slot-store',
                                    autoLoad: false,
                                    autoSync: false,
                                    autoScroll: true,
                                    pageSize: 100,
                                    model: Ext.define('name', {
                                        extend: 'Ext.data.Model',
                                        fields: ["uid", "position", "previewCanvas"]
                                    }),
                                    proxy: {
                                        type: 'rest',
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + 'content_slot/search/findByPageOrTemplate',
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
                                })
                        }
                    ]
                },
                {
                    title: 'Widgets',
                    iconCls: 'simple_cms_widget',
                    xtype: 'panel',
                    frame: false,
                    border: false,
                    items: [
                        {
                            bodyPadding: 0,
                            xtype: 'dataview',
                            scroll: 'vertical',
                            trackOver: true,
                            itemSelector: 'div.top-carousel-item',
                            overItemCls: 'x-item-over',
                            emptyText: 'No pages available',
                            tpl: [
                                '<tpl for=".">',
                                '<div class="top-carousel-item" id="widget-{uid}">',
                                '<div class="carousel-picture">',
                                '<a><img src="{[this.getPreviewImage(values._links[\'self\'].href)]}" width="100"></a>',
                                '</div>',
                                '<div class="carousel-item">',
                                '<div class="widget-description">{name}</div>',
                                '<div class="carousel-item-header">{uid}</div>',
                                '</div>',
                                '</div>',
                                '</tpl>',
                                {
                                    getPreviewImage: function (selfUrl) {
                                        var tmp = selfUrl.slice(0, selfUrl.lastIndexOf('/'));
                                        var widget_type = (tmp).substr(tmp.lastIndexOf('/') + 1, tmp.length);
                                        return Ext.get('contextPath').dom.getAttribute('ctxPath') + "/resources/img/" + widget_type + ".svg";
                                    }
                                }
                            ],
                            store: Ext.create('Ext.data.Store',
                                {
                                    autoLoad: true,
                                    autoSync: false,
                                    autoScroll: true,
                                    pageSize: 100,
                                    model: Ext.define('name', {
                                        extend: 'Ext.data.Model',
                                        fields: ["uid", "name", "_links"]
                                    }),
                                    proxy: {
                                        type: 'rest',
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + 'simple_cms_widget',
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
                                })
                        }
                    ]
                },
                {
                    xtype: 'panel',
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
                            store: Ext.create('Ext.data.Store',
                                {
                                    autoLoad: true,
                                    autoSync: false,
                                    autoScroll: true,
                                    pageSize: 100,
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
                                }
                            ),
                            listeners: {
                                itemclick: function (view, record, item, index, e, eOpts) {
                                    Ext.get('website-iframe').dom.src = Ext.get('website-base-url').dom.getAttribute('url') + "email/" + record.raw.uid + "?site=solar&live_edit_view=true";
                                    view.el.setStyle('background', '#DDDDDD');
                                    view.el.setStyle('border-color', '#000');
                                }
                            }
                        }
                    ]
                }
            ]
        });

        this.callParent();
    },
    somefn: function (uid) {
        alert(uid);
    }
});
