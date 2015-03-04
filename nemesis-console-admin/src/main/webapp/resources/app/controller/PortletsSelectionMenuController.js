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
				beforerender: this.onDropDownClick
			},
			'#app-header #dropDownMenu #momoryUsagePortletBtn': {
				click: this.openMemoryUsagePortlet
			},
			'#app-header #dropDownMenu #pkAnalyzerPortletBtn': {
				click: this.openPkAnalyzerPortlet
			},
			'#app-header #dropDownMenu #platformActionsPortletBtn': {
				click: this.openPlatformActionsPortlet
			},
			'#app-header #dropDownMenu #platformInfoPortletBtn': {
				click: this.openPlatformInfoPortlet
			},
			'#app-header #dropDownMenu #platformTestsPortletBtn': {
				click: this.openPlatformTestsPortlet
			},
			'#app-header #dropDownMenu #systemLoggersPortletBtn': {
				click: this.openSystemLoggersPortlet
			},
			'#app-header #dropDownMenu #systemPropertiesPortletBtn': {
				click: this.openSystemPropertiesPortlet
			}
		});
	},

	onDropDownClick: function() {
		var dashboard = Ext.ComponentQuery.query('#adminDashboard');
		var parts = dashboard[0].parts.items;
		var visibleParts = dashboard[0].defaultContent;
		var menu = this.getMenu();
		for (var i = 0; i < parts.length; i++) {
			var name = parts[i]._viewTemplate.template.title;
			var icon = this.iconSelector(parts[i]._id);
			if (this.containsElement(visibleParts, parts[i]._id)) {
				menu.add({
					id: parts[i]._id + 'Btn',
					text: name,
					disabled: true,
					iconCls: icon
				});
			} else {
				menu.add({
					id: parts[i]._id + 'Btn',
					text: name,
					disabled: false,
					iconCls: icon
				});
			}
		}
	},

	iconSelector: function(id) {
		var icon = '';
		if (id == 'momoryUsagePortlet') {
			icon = 'system-monitor';
		} else if (id == 'pkAnalyzerPortlet'){
			icon = 'key';
		} else if (id == 'platformActionsPortlet'){
			icon = 'warning';
		} else if (id == 'platformInfoPortlet'){
			icon = 'information';
		} else if (id == 'platformTestsPortlet'){
			icon = 'junit';
		} else if (id == 'systemLoggersPortlet'){
			icon = 'logs';
		} else if (id == 'systemPropertiesPortlet'){
			icon = 'property';
		}
		return icon;
	},

	containsElement: function(array, element) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].type == element) {
				return true;
			}
		}
		return false
	},

	openPlatformInfoPortlet: function(self) {
		Ext.getCmp('portlet-platform-info').show();
		self.disable();
	},

	openMemoryUsagePortlet: function(self) {
		Ext.getCmp('portlet-memory-usage').show();
		self.disable();
	},

	openPkAnalyzerPortlet: function(self) {
		Ext.getCmp('portlet-pk-analyzer').show();
		self.disable();
	},

	openPlatformActionsPortlet: function(self) {
		Ext.getCmp('portlet-platform-actions').show();
		self.disable();
	},

	openPlatformTestsPortlet: function(self) {
		Ext.getCmp('portlet-platform-tests').show();
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