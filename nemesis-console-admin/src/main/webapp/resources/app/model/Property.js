Ext.define('AdminConsole.model.Property', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'key', type: 'string', defaultValue: ''},
        {name: 'value', type: 'string', defaultValue: ''}
    ],
    idProperty: 'key'
});
