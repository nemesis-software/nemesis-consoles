Ext.define('AdminConsole.view.portlet.PlatformHealthPortlet', {
	extend: 'Ext.panel.Panel',
	xtype: 'platformHealthPortlet',
	itemId: 'platformHealthPortletId',
	height: 120,
	layout: 'column',
	items: [{
		title: 'Service',
		itemId: 'serviceColumnPlatformHealth',
		columnWidth: 0.5,
		layout: 'vbox',
		border: 1,
		items: [],
		defaults: {
			padding: '0 0 0 5',
			width: '100%',
			border: '0 0 1 0',
			style: {
				borderColor: '#d0d0d0',
				borderStyle: 'solid'
			}
		}
	}, {
		title: 'Status',
		itemId: 'statusColumnPlatformHealth',
		columnWidth: 0.5,
		layout: {
			type: 'vbox',
			vertical: true,
			align: 'end'
		},
		border: 1,
		items: [],
		defaults: {
			width: '100%',
			border: '0 0 1 0',
			style: {
				borderColor: '#d0d0d0',
				borderStyle: 'solid'
			}
		}
	}]
});