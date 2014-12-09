Ext.define('AdminConsole.model.Logger', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: 'string', defaultValue: ''},
        {name: 'parentName', type: 'string', defaultValue: ''},
        {name: 'level', type: 'string', defaultValue: 'DEBUG'}
    ],
    idProperty: 'name'
});
