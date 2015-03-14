Ext.define('AdminConsole.controller.portlets.PlatformHealthPortletController', {
	extend: 'Ext.app.Controller',
	views: ['AdminConsole.view.portlet.PlatformHealthPortlet'],
	refs: [],

	init: function() {
		this.control({
			'#adminDashboard #platformHealthPortletId': {
				afterrender: this.loadStatus
			}
		});
	},

	loadStatus: function() {
		var self = this;
		var serviceList = [];
		var statusList = [];

		Ext.Ajax.request({
			url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/health',
			method: 'POST',
			params: {},
			success: function(responseObject) {
				var json = Ext.decode(responseObject.responseText);
				self.generalStatusUp();
				self.fillSuccessStatus(json);
			},
			failure: function(responseObject) {
				self.generalStatusDown();
				self.fillFailureStatus();
			}
		});
	},

	generalStatusDown: function() {
		Ext.getCmp('portlet-platform-health').setIconCls('status-error');
		Ext.getCmp('platformHealthPortletBtn').setIconCls('status-error');
	},

	generalStatusUp: function() {
		Ext.getCmp('portlet-platform-health').setIconCls('status-pass');
		Ext.getCmp('platformHealthPortletBtn').setIconCls('status-pass');
	},

	fillSuccessStatus: function(object) {
		var serviceList = [];
		var statusList = [];
		var serviceColumn = Ext.ComponentQuery.query('#serviceColumnPlatformHealth')[0];
		var statusColumn = Ext.ComponentQuery.query('#statusColumnPlatformHealth')[0];

		for (var property in object) {
			if (object.hasOwnProperty(property)) {
				if (typeof object[property] == "object") {
					var innerObject = object[property];
					for (var innerProperty in innerObject) {
						if (innerObject.hasOwnProperty(innerProperty) && innerProperty == 'status') {
							serviceList[serviceList.length] = property;
							statusList[statusList.length] = innerObject[innerProperty];
						}
					}
				}
			} else {
				//console.log("General status: " property + " = " + object[property]);
			}
		}

		for (var i = 0; i < serviceList.length; i++) {
			var name = serviceList[i].toUpperCase();
			if (i == serviceList.length - 1) {
				serviceColumn.add({
					xtype: 'label',
					text: name,
					border: 0
				});
			} else {
				serviceColumn.add({
					xtype: 'label',
					text: name
				});
			}
		}

		for (var i = 0; i < statusList.length; i++) {
			var status = statusList[i];
			if (i == statusList.length - 1) {
				if (status == 'UP') {
					statusColumn.add({
						xtype: 'title',
						iconCls: 'icon-style status-pass',
						border: 0
					});
				} else {
					statusColumn.add({
						xtype: 'title',
						iconCls: 'icon-style status-error',
						border: 0
					});
				}
			} else {
				if (status == 'UP') {
					statusColumn.add({
						xtype: 'title',
						iconCls: 'icon-style status-pass'
					});
				} else {
					statusColumn.add({
						xtype: 'title',
						iconCls: 'icon-style status-error'
					});
				}
			}
		}
	},

	fillFailureStatus: function() {
		var serviceColumn = Ext.ComponentQuery.query('#serviceColumnPlatformHealth')[0];
		var statusColumn = Ext.ComponentQuery.query('#statusColumnPlatformHealth')[0];

		serviceColumn.add({
			xtype: 'label',
			text: 'MYSQL'
		});
		statusColumn.add({
			xtype: 'title',
			iconCls: 'icon-style status-error'
		});

		serviceColumn.add({
			xtype: 'label',
			text: 'REDIS'
		});
		statusColumn.add({
			xtype: 'title',
			iconCls: 'icon-style status-error'
		});

		serviceColumn.add({
			xtype: 'label',
			text: 'SOLR',
			border: 0
		});
		statusColumn.add({
			xtype: 'title',
			iconCls: 'icon-style status-error',
			border: 0
		});
	}

});