Ext.define('console.components.window.AddWidget', {
	extend: 'Ext.window.Window',

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
					xtype: 'combobox',
					itemId: 'addWidgetCmb',
					fieldLabel: "Add Widget",
					labelWidth: 80,
					width: 300,
					minChars: 2,
					margin: "5 0 5 5",
					hideTrigger: true,
					store: me.store,
					displayField: 'name',
					valueField: 'pk',
					autoSelect: true,
					typeAhead: true,
					queryMode: 'local'
				}, {
					xtype: 'button',
					text: 'Filter',
					margin: '5 15 5 5',
					width: 60,
					handler: function (btn) {
						var me = this,
							cmb = btn.up('fieldcontainer').down('combo'),
							addWidgetDataViewStore = me.up('window').down('#addwidget-dataview').store;

						if (addWidgetDataViewStore.isFiltered()) {
							addWidgetDataViewStore.clearFilter();
						}

						if (!Ext.isEmpty(cmb.getValue())) {
							addWidgetDataViewStore.filter('pk', cmb.getValue());
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
					select: function(myself, record, index, eOpts){
						Ext.MessageBox.confirm('Confirm', 'Are you sure you want to add this widget to the selected slots?', function(btn, text){
							if(btn === 'yes') {
								alert('the widget will be added to the slot soon.');
								me.destroy();
							} else {
								var storeWidgets = myself.store;
								if (storeWidgets.isFiltered()) {
									storeWidgets.clearFilter();
								}
							}
						}, this);
					}
				},
				store: me.store
			}]
		});

		if(me.store.isFiltered()) {
			me.store.clearFilter();
		}

		me.callParent(arguments);
	}
});