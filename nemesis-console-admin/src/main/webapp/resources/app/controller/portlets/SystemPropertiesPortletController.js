Ext.define('AdminConsole.controller.portlets.SystemPropertiesPortletController', {
	extend: 'Ext.app.Controller',
	views: ['AdminConsole.view.portlet.SystemPropertiesPortlet'],
	refs: [],

	init: function() {
		this.control({
			'#adminDashboard #systemPropertiesPortletId': {
				beforerender: this.loadData
			}
		});
	},

	loadData: function() {
		var self = this;
		Ext.Ajax.request({
			url: Ext.get('website-base-url').dom.getAttribute('url') + 'platform/env',
			method: 'GET',
			params: {},
			success: function(responseObject) {
				var json = Ext.decode(responseObject.responseText);
				self.parseData(json);
			},
			failure: function(responseObject) {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: responseObject.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
			}
		});
	},

	parseData: function(object) {
		var store = Ext.create('Ext.data.Store', {
			storeId: 'systemPropertyStore',
			model: 'AdminConsole.model.SystemProperty',
			groupField: 'property'
		});
		for (var property in object) {
			if (object.hasOwnProperty(property)) {
				if (typeof object[property] == "object") {
					var innerObject = object[property];
					for (var innerProperty in innerObject) {
						if (innerObject.hasOwnProperty(innerProperty)) {
							var model = new AdminConsole.model.SystemProperty({
								property: property,
								key: innerProperty,
								value: innerObject[innerProperty]
							});
							store.add(model);
						}
					}
				}
			}
		}
		var systemPortletView = Ext.ComponentQuery.query('#systemPropertiesPortletId')[0];
		systemPortletView.setStore(store);
	}
});
