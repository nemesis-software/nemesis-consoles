Ext.define('console.components.window.AddWidget', {
	extend: 'Ext.window.Window',

	contentSlot: null,
	store: Ext.create('Ext.data.Store',{
		id: 'addwidgets-store',
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
	}),

	initComponent: function() {
		var me = this;

		Ext.apply(me, {
			title: 'Add Widget',
			itemId: 'addWidgetWin',
			width: 400,
			height: 600,
			items: [{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				items: [{
					xtype: 'textfield',
					itemId: 'addWidgetInput',
					enableKeyEvents: true,
					minLength: 3,
					width: 300,
					margin: '5 5 5 5',
					listeners: {
						specialkey: function (f, e) {
							var storeWidgets = me.store;

							if (e.getKey() == e.ENTER) {
								var input = f.getValue();
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
				}, {
					xtype: 'button',
					text: 'Filter',
					margin: '5 15 5 5',
					width: 60,
					handler: function (btn) {
						var storeWidgets = me.store,
							input = btn.up('window').down('#addWidgetInput').getValue();

						if (input) {
							storeWidgets.proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'widget/search/findByUidLikeAndCatalogVersionUid?uid=%25' + input + "%25&catalogVersionUid=Staged";
							storeWidgets.load();
						} else {
							storeWidgets.proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'widget/search/findByCatalogVersionUid?catalogVersionUid=Staged';
							storeWidgets.load();
						}
					}
				}]
			}, {
				xtype: 'dataview',
				itemId: 'addwidget-dataview',
				bodyPadding: 0,
				trackOver: true,
				itemSelector: 'div.top-carousel-item',
				singleSelect: true,
				overItemCls: 'x-item-over',
				emptyText: 'No widgets available',
				scrollable: true,
				height: 520,
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
					select: function(myself){
						Ext.MessageBox.confirm('Confirm', 'Are you sure you want to add this widget to the selected slot?', function(btn, text){
							if(btn === 'yes') {
								console.app.addWidgetToSlot(myself.getSelection()[0].data.pk, me.contentSlot);
								me.destroy();
							} else {
								var storeWidgets = myself.store;
								if (storeWidgets.isFiltered()) {
									storeWidgets.clearFilter();
								}
							}
						}, this);
					},
					afterrender: function (p) {
						Ext.getCmp('add-widget-pager').setStore(this.getStore());
					}
				},
				store: me.store
			}],
			bbar: {
				id: 'add-widget-pager',
				xtype: 'pagingtoolbar',
				store: null,   // will be set in after renderer of the dataview
				displayInfo: false
			}
		});

		me.store.load();

		me.callParent(arguments);
	}
});
