Ext.define('AdminConsole.controller.portlets.PlatformInfoPortletController', {
	extend: 'Ext.app.Controller',
	views: ['AdminConsole.view.portlet.PlatformInfoPortlet'],
	refs: [],

	init: function() {
		this.control({
			'#adminDashboard #platformInfoPortletId': {
				afterrender: this.getInfo
			}
		});
	},

	getInfo: function() {
		var self = this;
		Ext.Ajax.request({
			url: Ext.get('website-base-url').dom.getAttribute('url') + 'platform/info',
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
		for (var property in object) {
			if (object.hasOwnProperty(property)) {
				if (property == "app") {
					var innerObject = object[property];
					for (var innerProperty in innerObject) {
						if (innerObject.hasOwnProperty(innerProperty)) {
							var propertyColumn = Ext.ComponentQuery.query('#applicationTabPropertyColumn')[0];
							var valueColumn = Ext.ComponentQuery.query('#applicationTabValueColumn')[0];
							propertyColumn.add({
								xtype: 'label',
								text: innerProperty + ":"
							});
							valueColumn.add({
								xtype: 'label',
								text: innerObject[innerProperty]
							});
						}
					}
				} else if (property == "platform") {
					var innerObject = object[property];
					for (var innerProperty in innerObject) {
						if (innerObject.hasOwnProperty(innerProperty)) {
							var propertyColumn = Ext.ComponentQuery.query('#platformTabPropertyColumn')[0];
							var valueColumn = Ext.ComponentQuery.query('#platformTabValueColumn')[0];
							propertyColumn.add({
								xtype: 'label',
								text: innerProperty + ":"
							});
							valueColumn.add({
								xtype: 'label',
								text: innerObject[innerProperty]
							});
						}
					}
				}
			}
		}
	}

});
