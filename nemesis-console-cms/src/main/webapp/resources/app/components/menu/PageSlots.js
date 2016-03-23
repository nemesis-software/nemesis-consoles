Ext.define('console.components.menu.PageSlots', {

    extend: 'Ext.panel.Panel',

    alias: 'widget.components-menu-pageslots',

    requires: [
        'console.model.Slot'
    ],

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            title: 'Slots For This Page',
            iconCls: 'content_slot',
            id: 'page-slot-store',
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
                            //alert('selected ' + view.getSelection()[0].data.pk);
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
                            items: [{
                                itemId: 'addWidgetMenu',
                                text: 'Add Widget',
                                iconCls: 'widget_add',
                                handler: function(menu) {
                                    menu.fireEvent('addWidget');
                                }
                            }, {
                                itemId: 'edit',
                                text: 'Edit/Create slot',
                                iconCls: 'edit',
                                handler: function () {
                                    me.onEditSelected(view, record, item, index, event);
                                }
                            }]
                        });
                    },
                    onEditSelected: function (view, record, item, index, event) {
                        var parentCmpId = 'cms-viewport';

                        var entityConfiguration = Ext.create("console.markup." + record.data.entityName);
                        console.log(record);
                        var window = Ext.getCmp(parentCmpId).createWindow({
                            operation: 'edit',
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
                    store: Ext.create('Ext.data.Store',{
                        id: 'content-slot-store',
                        autoLoad: false,
                        autoSync: false,
                        autoScroll: true,
                        pageSize: 10,
                        model: 'console.model.Slot',
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
        });

        me.callParent();
    }
});
