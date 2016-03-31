Ext.define('console.components.menu.Widgets', {

    extend: 'Ext.panel.Panel',

    alias: 'widget.components-menu-widgets',

    requires: ["console.utils.Utilities"],

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            title: 'Widgets',
            iconCls: 'widget',
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
                                var storeWidgets = Ext.getCmp('widgets-dataview').getStore();

                                if (e.getKey() == e.ENTER) {
                                    var input = Ext.getCmp('widgets-filter').getValue();
                                    if (input) {
                                        storeWidgets.proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'widget/search/findByUidLikeAndCatalogVersionUid?uid=%25' + input + "%25&catalogVersionUid=Staged";
                                        storeWidgets.load();
                                    } else {
                                        storeWidgets.proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'widget/search/findByCatalogVersionUid?catalogVersionUid=Staged';
                                        storeWidgets.load();
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
                        '<div class="top-carousel-item widget-dnd" id="widget-{pk}">',
                        '<div class="carousel-picture">',
                        '<a><img draggable="true" style="cursor: move;" src="{[this.getPreviewImage(values._links[\'self\'].href)]}" width="100"></a>',
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
                            //alert('selected ' + view.getSelection()[0].data.pk);
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
                            operation: 'edit',
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
                    store: Ext.create('Ext.data.Store',{
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
                        },
                        listeners: {
                            load: function(myself, records, successful, operation, eOpts) {
                                if (successful) {
                                    console.utils.Utilities.translateMenuItems(records);
                                }
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
        });

        me.callParent();
    }
});
