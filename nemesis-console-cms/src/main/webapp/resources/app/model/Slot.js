Ext.define('console.model.Slot', {
	extend: 'Ext.data.Model',

	fields: [
		{ name: 'uid', type: 'string' },
		{ name: 'position', type: 'string' },
		{ name: 'previewCanvas', type: 'string' }
	]
});
