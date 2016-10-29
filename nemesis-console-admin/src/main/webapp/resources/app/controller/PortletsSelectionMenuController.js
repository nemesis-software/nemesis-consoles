Ext.define('AdminConsole.controller.PortletsSelectionMenuController', {
	extend: 'Ext.app.Controller',
	views: [],
	refs: [{
		ref: 'menu',
		selector: 'portletsMenu'
	}],

	init: function() {
		this.control({
			'#app-header #dropDownMenu': {
				beforerender: this.loadDropdownMenu
			},
			'#app-header #dropDownMenu #importCSVPortletBtn': {
				click: this.openImportCSVPortlet
			},
			'#app-header #dropDownMenu #momoryUsagePortletBtn': {
				click: this.openMemoryUsagePortlet
			},
			'#app-header #dropDownMenu #idAnalyzerPortletBtn': {
				click: this.openIdAnalyzerPortlet
			},
			'#app-header #dropDownMenu #platformActionsPortletBtn': {
				click: this.openPlatformActionsPortlet
			},
			'#app-header #dropDownMenu #platformInfoPortletBtn': {
				click: this.openPlatformInfoPortlet
			},
			'#app-header #dropDownMenu #platformHealthPortletBtn': {
				click: this.openPlatformHealthPortlet
			},
			'#app-header #dropDownMenu #springBeansPortletBtn': {
				click: this.openSpringBeansPortlet
			},
			'#app-header #dropDownMenu #sqlSearchPortletBtn': {
				click: this.openSqlSearchPortlet
			},
			'#app-header #dropDownMenu #systemLoggersPortletBtn': {
				click: this.openSystemLoggersPortlet
			},
			'#app-header #dropDownMenu #systemPropertiesPortletBtn': {
				click: this.openSystemPropertiesPortlet
			}
		});
	},

	loadDropdownMenu: function() {
		var dashboard = Ext.ComponentQuery.query('#adminDashboard');
		var parts = dashboard[0].parts.items;
		var menu = this.getMenu();
		for (var i = 0; i < parts.length; i++) {
			var name = parts[i]._viewTemplate.template.title;
			var icon = parts[i]._viewTemplate.template.iconCls;

			menu.add({
				id: parts[i]._id + 'Btn',
				text: name,
				disabled: true,
				iconCls: icon
			});
		}
	},

	openImportCSVPortlet: function(self) {
		Ext.getCmp('portlet-csv-import').show();
		self.disable();
	},

	openMemoryUsagePortlet: function(self) {
		Ext.getCmp('portlet-memory-usage').show();
		self.disable();
	},

	openIdAnalyzerPortlet: function(self) {
		Ext.getCmp('portlet-id-analyzer').show();
		self.disable();
	},

	openPlatformActionsPortlet: function(self) {
		Ext.getCmp('portlet-platform-actions').show();
		self.disable();
	},

	openPlatformInfoPortlet: function(self) {
		Ext.getCmp('portlet-platform-info').show();
		self.disable();
	},

	openPlatformHealthPortlet: function(self) {
		Ext.getCmp('portlet-platform-health').show();
		self.disable();
	},

	openSpringBeansPortlet: function(self) {
		Ext.getCmp('portlet-spring-beans').show();
		self.disable();
	},

	openSqlSearchPortlet: function(self) {
		Ext.getCmp('portlet-db-search').show();
		self.disable();
	},

	openSystemLoggersPortlet: function(self) {
		Ext.getCmp('portlet-log4j-levels').show();
		self.disable();
	},

	openSystemPropertiesPortlet: function(self) {
		Ext.getCmp('portlet-sys-properties').show();
		self.disable();
	}
});
