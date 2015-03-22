Ext.define('AdminConsole.model.SystemProperty', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'property',
		type: 'string',
		defaultValue: ''
	}, {
		name: 'key',
		type: 'string',
		defaultValue: ''
	}, {
		name: 'value',
		type: 'string',
		defaultValue: ''
	}]
});