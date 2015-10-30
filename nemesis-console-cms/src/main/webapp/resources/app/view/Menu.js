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
                            id: 'page-template-toolbar',
                            xtype: 'toolbar',
                            border: true,
                            baseCls: 'subMenu',
                            cls: 'effect1',
                            dock: 'top',
                            height: 25,
                            items: [
                                {
                                    id: 'page-template-filter',
                                    xtype: 'textfield',
                                    name: 'SearchDownload',
                                    itemId: 'SearchDownload',
                                    enableKeyEvents: true,
                                    allowBlank: true,
                                    minLength: 3,
                                    width: '79%',
                                    listeners: {
                                        specialkey: function (f, e) {
                                            if (e.getKey() == e.ENTER) {
                                                var input = Ext.getCmp('page-template-filter').getValue();
                                                if (input) {
                                                    Ext.getCmp('page-template-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'page_template/search/findByUidLikeAndCatalogVersionUid?uid=%25' + input + "%25&catalogVersionUid=Staged";
                                                    Ext.getCmp('page-template-dataview').getStore().load();
                                                } else {
                                                    Ext.getCmp('page-template-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'page_template/search/findByCatalogVersionUid?catalogVersionUid=Staged';
                                                    Ext.getCmp('page-template-dataview').getStore().load();
                                                }
                                            }
                                        }
                                    }
                                },
                                '->',
                                {
                                    xtype: 'button',
                                    cls: 'x-btn-default-small',
                                    text: 'Filter',
                                    width: '20%',
                                    handler: function () {
                                        var input = Ext.getCmp('page-template-filter').getValue();
                                        if (input) {
                                            Ext.getCmp('page-template-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'page_template/search/findByUidLikeAndCatalogVersionUid?uid=%25' + input + "%25&catalogVersionUid=Staged";
                                            Ext.getCmp('page-template-dataview').getStore().load();
                                        } else {
                                            Ext.getCmp('page-template-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'page_template/search/findByCatalogVersionUid?catalogVersionUid=Staged';
                                            Ext.getCmp('page-template-dataview').getStore().load();
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            id: 'page-template-dataview',
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
                            listeners: {
                                select: function (view) {
                                    alert('selected ' + view.getSelection()[0].data.pk);
                                },
                                afterrender: function (p) {
                                    Ext.getCmp('templates-pager').setStore(this.getStore());
                                },
                                itemcontextmenu: function (view, record, item, index, event) {
                                    //			view.select(record);
                                    event.stopEvent();
                                    var ctxMenu = this.buildCtxMenu(view, record, item, index, event);

                                    ctxMenu.showAt(event.getXY());
                                }
                            },
                            buildCtxMenu: function (view, record, item, index, event) {
                                var me = this;
                                return Ext.create('Ext.menu.Menu', {
                                    items: [
                                        {
                                            itemId: 'edit',
                                            handler: function () {
                                                me.onEditSelected(view, record, item, index, event);
                                            },
                                            text: 'Edit',
                                            iconCls: 'edit'
                                        }
                                    ]
                                });
                            },
                            onEditSelected: function (view, record, item, index, event) {
                                var parentCmpId = 'cms-viewport';

                                var entityConfiguration = Ext.create("console.markup." + record.data.entityName);
                                console.log(record);
                                var window = Ext.getCmp(parentCmpId).createWindow({
                                    id: record.data.uid,
                                    iconCls: 'page_template',
                                    entity: Ext.create('console.model.Entity', {
                                        id: record.data.entityName,
                                        pk: record.data.pk,
                                        name: record.data.entityName,
                                        url: record.data._links['self'].href,
                                        synchronizable: entityConfiguration.synchronizable
                                    }),
                                    sections: entityConfiguration.sections
                                });
                                window.show();
                            },
                            store: Ext.create('Ext.data.Store',
                                {
                                    id: 'page-template-store',
                                    autoLoad: true,
                                    autoSync: false,
                                    autoScroll: true,
                                    pageSize: 10,
                                    model: Ext.define('name', {
                                        extend: 'Ext.data.Model',
                                        fields: ["uid", "name", "title", "previewCanvas"]
                                    }),
                                    proxy: {
                                        type: 'rest',
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + 'page_template/search/findByCatalogVersionUid?catalogVersionUid=Staged',
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
                    ],
                    bbar: {
                        id: 'templates-pager',
                        xtype: 'pagingtoolbar',
                        store: null,   // will be set in after renderer of the dataview
                        displayInfo: false
                    }
                },
                {
                    xtype: 'panel',
                    frame: false,
                    border: false,
                    title: 'Pages',
                    iconCls: 'abstract_page',
                    items: [
                        {
                            xtype: 'toolbar',
                            border: true,
                            baseCls: 'subMenu',
                            cls: 'effect1',
                            dock: 'top',
                            height: 25,
                            items: [{
                                id: 'content-page-filter',
                                xtype: 'textfield',
                                name: 'SearchDownload',
                                itemId: 'SearchDownload',
                                enableKeyEvents: true,
                                allowBlank: true,
                                minLength: 3,
                                width: '79%',
                                listeners: {
                                    specialkey: function (f, e) {
                                        if (e.getKey() == e.ENTER) {
                                            var input = Ext.getCmp('content-page-filter').getValue();
                                            if (input) {
                                                Ext.getCmp('content-page-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'content_page/search/findByUidLikeAndCatalogVersionUid?uid=%25' + input + "%25&catalogVersionUid=Staged";
                                                Ext.getCmp('content-page-dataview').getStore().load();
                                            } else {
                                                Ext.getCmp('content-page-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'content_page/search/findByCatalogVersionUid?catalogVersionUid=Staged';
                                                Ext.getCmp('content-page-dataview').getStore().load();
                                            }
                                        }
                                    }
                                }
                            },
                                '->',
                                {
                                    xtype: 'button',
                                    cls: 'x-btn-default-small',
                                    text: 'Filter',
                                    width: '20%',
                                    handler: function () {
                                        var input = Ext.getCmp('content-page-filter').getValue();
                                        if (input) {
                                            Ext.getCmp('content-page-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'content_page/search/findByUidLikeAndCatalogVersionUid?uid=%25' + input + "%25&catalogVersionUid=Staged";
                                            Ext.getCmp('content-page-dataview').getStore().load();
                                        } else {
                                            Ext.getCmp('content-page-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'content_page/search/findByCatalogVersionUid?catalogVersionUid=Staged';
                                            Ext.getCmp('content-page-dataview').getStore().load();
                                        }
                                    }
                                }]
                        },
                        {
                            bodyPadding: 0,
                            id: 'content-page-dataview',
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
                            listeners: {
                                select: function (view) {
                                    alert('selected ' + view.getSelection()[0].data.pk);
                                },
                                afterrender: function (p) {
                                    Ext.getCmp('pages-pager').setStore(this.getStore());
                                }, itemcontextmenu: function (view, record, item, index, event) {
                                    //			view.select(record);
                                    event.stopEvent();
                                    var ctxMenu = this.buildCtxMenu(view, record, item, index, event);

                                    ctxMenu.showAt(event.getXY());
                                }
                            },
                            buildCtxMenu: function (view, record, item, index, event) {
                                var me = this;
                                return Ext.create('Ext.menu.Menu', {
                                    items: [
                                        {
                                            itemId: 'edit',
                                            handler: function () {
                                                me.onEditSelected(view, record, item, index, event);
                                            },
                                            text: 'Edit',
                                            iconCls: 'edit'
                                        }
                                    ]
                                });
                            },
                            onEditSelected: function (view, record, item, index, event) {
                                var parentCmpId = 'cms-viewport';

                                var entityConfiguration = Ext.create("console.markup." + record.data.entityName);
                                console.log(record);
                                var window = Ext.getCmp(parentCmpId).createWindow({
                                    id: record.data.uid,
                                    iconCls: 'content_page',
                                    entity: Ext.create('console.model.Entity', {
                                        id: record.data.entityName,
                                        pk: record.data.pk,
                                        name: record.data.entityName,
                                        url: record.data._links['self'].href,
                                        synchronizable: entityConfiguration.synchronizable
                                    }),
                                    sections: entityConfiguration.sections
                                });
                                window.show();
                            },
                            store: Ext.create('Ext.data.Store',
                                {
                                    id: 'content-page-store',
                                    autoLoad: false,
                                    autoSync: false,
                                    autoScroll: true,
                                    pageSize: 10,
                                    model: Ext.define('name', {
                                        extend: 'Ext.data.Model',
                                        fields: ["uid", "name", "title"]
                                    }),
                                    proxy: {
                                        type: 'rest',
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + 'content_page/search/findByCatalogVersionUid?catalogVersionUid=Staged',
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
                    ],
                    bbar: {
                        id: 'pages-pager',
                        xtype: 'pagingtoolbar',
                        store: null,   // will be set in after renderer of the dataview
                        displayInfo: false
                    }
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
                            listeners: {
                                select: function (view) {
                                    debugger;
                                    alert('selected ' + view.getSelection()[0].data.pk);
                                },
                                afterrender: function (p) {
                                    Ext.getCmp('page-slots-pager').setStore(this.getStore());
                                },
                                itemcontextmenu: function (view, record, item, index, event) {
                                    //			view.select(record);
                                    event.stopEvent();
                                    var ctxMenu = this.buildCtxMenu(view, record, item, index, event);

                                    ctxMenu.showAt(event.getXY());
                                }
                            },
                            buildCtxMenu: function (view, record, item, index, event) {
                                var me = this;
                                return Ext.create('Ext.menu.Menu', {
                                    items: [
                                        {
                                            itemId: 'edit',
                                            handler: function () {
                                                me.onEditSelected(view, record, item, index, event);
                                            },
                                            text: 'Edit',
                                            iconCls: 'edit'
                                        }
                                    ]
                                });
                            },
                            onEditSelected: function (view, record, item, index, event) {
                                var parentCmpId = 'cms-viewport';

                                var entityConfiguration = Ext.create("console.markup." + record.data.entityName);
                                console.log(record);
                                var window = Ext.getCmp(parentCmpId).createWindow({
                                    id: record.data.uid,
                                    iconCls: 'content_slot',
                                    entity: Ext.create('console.model.Entity', {
                                        id: record.data.entityName,
                                        pk: record.data.pk,
                                        name: record.data.entityName,
                                        url: record.data._links['self'].href,
                                        synchronizable: entityConfiguration.synchronizable
                                    }),
                                    sections: entityConfiguration.sections
                                });
                                window.show();
                            },
                            store: Ext.create('Ext.data.Store',
                                {
                                    id: 'content-slot-store',
                                    autoLoad: false,
                                    autoSync: false,
                                    autoScroll: true,
                                    pageSize: 10,
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
                    ],
                    bbar: {
                        id: 'page-slots-pager',
                        xtype: 'pagingtoolbar',
                        store: null,   // will be set in after renderer of the dataview
                        displayInfo: false
                    }
                },
                {
                    title: 'Widgets',
                    iconCls: 'widget',
                    xtype: 'panel',
                    frame: false,
                    border: false,
                    items: [
                        {
                            xtype: 'toolbar',
                            border: true,
                            baseCls: 'subMenu',
                            cls: 'effect1',
                            dock: 'top',
                            height: 25,
                            items: [{
                                id: 'widgets-filter',
                                xtype: 'textfield',
                                name: 'SearchDownload',
                                itemId: 'SearchDownload',
                                enableKeyEvents: true,
                                allowBlank: true,
                                minLength: 3,
                                width: '79%',
                                listeners: {
                                    specialkey: function (f, e) {
                                        if (e.getKey() == e.ENTER) {
                                            var input = Ext.getCmp('widgets-filter').getValue();
                                            if (input) {
                                                Ext.getCmp('widgets-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'widget/search/findByUidLikeAndCatalogVersionUid?uid=%25' + input + "%25&catalogVersionUid=Staged";
                                                Ext.getCmp('widgets-dataview').getStore().load();
                                            } else {
                                                Ext.getCmp('widgets-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'widget/search/findByCatalogVersionUid?catalogVersionUid=Staged';
                                                Ext.getCmp('widgets-dataview').getStore().load();
                                            }
                                        }
                                    }
                                }
                            },
                                '->',
                                {
                                    xtype: 'button',
                                    cls: 'x-btn-default-small',
                                    text: 'Filter',
                                    width: '20%',
                                    handler: function () {
                                        var input = Ext.getCmp('widgets-filter').getValue();
                                        if (input) {
                                            Ext.getCmp('widgets-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'widget/search/findByUidLikeAndCatalogVersionUid?uid=%25' + input + "%25&catalogVersionUid=Staged";
                                            Ext.getCmp('widgets-dataview').getStore().load({
                                                //drag-n-drop experiments https://docs.sencha.com/extjs/5.1/core_concepts/drag_drop.html
                                                //callback : function(records, options, success) {
                                                //    if (success) {
                                                //        var overrides = {
                                                //            // Called the instance the element is dragged.
                                                //            b4StartDrag: function () {
                                                //                // Cache the drag element
                                                //                if (!this.el) {
                                                //                    this.el = Ext.get(this.getEl());
                                                //                }
                                                //
                                                //                //Cache the original XY Coordinates of the element, we'll use this later.
                                                //                this.originalXY = this.el.getXY();
                                                //            },
                                                //            // Called when element is dropped in a spot without a dropzone, or in a dropzone without matching a ddgroup.
                                                //            onInvalidDrop: function () {
                                                //                // Set a flag to invoke the animated repair
                                                //                this.invalidDrop = true;
                                                //            },
                                                //            // Called when the drag operation completes
                                                //            endDrag: function () {
                                                //                // Invoke the animation if the invalidDrop flag is set to true
                                                //                if (this.invalidDrop === true) {
                                                //                    // Remove the drop invitation
                                                //                    this.el.removeCls('dropOK');
                                                //
                                                //                    // Create the animation configuration object
                                                //                    var animCfgObj = {
                                                //                        easing: 'elasticOut',
                                                //                        duration: 1,
                                                //                        scope: this,
                                                //                        callback: function () {
                                                //                            // Remove the position attribute
                                                //                            this.el.dom.style.position = '';
                                                //                        }
                                                //                    };
                                                //
                                                //                    // Apply the repair animation
                                                //                    this.el.setXY(this.originalXY[0], this.originalXY[1], animCfgObj);
                                                //                    delete this.invalidDrop;
                                                //                }
                                                //            }
                                                //        };
                                                //        var carElements = Ext.get('widgets-dataview').select('.widget-dnd')
                                                //        Ext.each(carElements.elements, function(el) {
                                                //            var dd = Ext.create('Ext.dd.DD', el, 'carsDDGroup', {
                                                //                isTarget  : false
                                                //            });
                                                //            //Apply the overrides object to the newly created instance of DD
                                                //            Ext.apply(dd, overrides);
                                                //        });
                                                //    }
                                                //}
                                            });
                                        } else {
                                            Ext.getCmp('widgets-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'widget/search/findByCatalogVersionUid?catalogVersionUid=Staged';
                                            Ext.getCmp('widgets-dataview').getStore().load();
                                        }
                                    }
                                }]
                        },
                        {
                            id: "widgets-dataview",
                            bodyPadding: 0,
                            xtype: 'dataview',
                            trackOver: true,
                            itemSelector: 'div.top-carousel-item',
                            singleSelect: true,
                            overItemCls: 'x-item-over',
                            emptyText: 'No widgets available',
                            tpl: new Ext.XTemplate(
                                '<tpl for=".">',
                                '<div class="top-carousel-item widget-dnd" id="widget-{uid}">',
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
                                    getPreviewImage: function (url) {
                                        var tmp = url.substring(0, url.lastIndexOf('/'));
                                        var widget_type = tmp.substring(tmp.lastIndexOf('/') + 1, tmp.length);
                                        return Ext.get('contextPath').dom.getAttribute('ctxPath') + "/resources/img/" + widget_type + ".svg";
                                    }
                                }
                            ),
                            listeners: {
                                select: function (view) {
                                    debugger;
                                    alert('selected ' + view.getSelection()[0].data.pk);
                                },
                                afterrender: function (p) {
                                    Ext.getCmp('widgets-pager').setStore(this.getStore());
                                },
                                itemcontextmenu: function (view, record, item, index, event) {
                                    //			view.select(record);
                                    event.stopEvent();
                                    var ctxMenu = this.buildCtxMenu(view, record, item, index, event);

                                    ctxMenu.showAt(event.getXY());
                                }
                            },
                            buildCtxMenu: function (view, record, item, index, event) {
                                var me = this;
                                return Ext.create('Ext.menu.Menu', {
                                    items: [
                                        {
                                            itemId: 'edit',
                                            handler: function () {
                                                me.onEditSelected(view, record, item, index, event);
                                            },
                                            text: 'Edit',
                                            iconCls: 'edit'
                                        },
                                        '-',
                                        {
                                            itemId: 'copy',
                                            handler: function () {
                                                me.onCopySelected(view, record, item, index, event);
                                            },
                                            text: 'Copy',
                                            iconCls: 'copy'
                                        }
                                    ]
                                });
                            },
                            onEditSelected: function (view, record, item, index, event) {
                                var parentCmpId = 'cms-viewport';

                                var entityConfiguration = Ext.create("console.markup." + record.data.entityName);
                                console.log(record);
                                var window = Ext.getCmp(parentCmpId).createWindow({
                                    id: record.data.uid,
                                    iconCls: record.data.entityName ? record.data.entityName : 'widget',
                                    entity: Ext.create('console.model.Entity', {
                                        id: record.data.entityName,
                                        pk: record.data.pk,
                                        name: record.data.entityName,
                                        url: record.data._links['self'].href,
                                        synchronizable: entityConfiguration.synchronizable
                                    }),
                                    sections: entityConfiguration.sections
                                });
                                window.show();
                            },
                            onCopySelected: function (view, record, item, index, event) {
                                Ext.getCmp('cms-viewport').clipboard = {
                                    data: {
                                        pk: record.data.pk,
                                        id: record.data.uid,
                                        name: record.data.entityName,
                                        url: record.data._links.self.href
                                    }
                                };
                            },
                            store: Ext.create('Ext.data.Store',
                                {
                                    id: 'widgets-store',
                                    autoLoad: true,
                                    autoSync: false,
                                    autoScroll: true,
                                    pageSize: 10,
                                    model: Ext.define('name', {
                                        extend: 'Ext.data.Model',
                                        fields: ["uid", "name", "_links"]
                                    }),
                                    proxy: {
                                        type: 'rest',
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + 'widget/search/findByCatalogVersionUid?catalogVersionUid=Staged',
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
                    ],
                    bbar: {
                        id: 'widgets-pager',
                        xtype: 'pagingtoolbar',
                        store: null,   // will be set in after renderer of the dataview
                        displayInfo: false
                    }
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
                                }
                            ),
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
                }
            ]
        });

        this.callParent();
    },
    somefn: function (uid) {
        alert(uid);
    }
});
