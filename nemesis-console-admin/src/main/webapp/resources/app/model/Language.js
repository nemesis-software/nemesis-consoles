Ext.define('AdminConsole.model.Language', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'isoCode', type: 'string'},
        {name: 'name', type: 'string'}
    ],
    idProperty: 'isoCode'
});
