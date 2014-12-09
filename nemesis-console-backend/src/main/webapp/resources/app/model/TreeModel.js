Ext.define('console.model.TreeModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'text', type: 'string'}
    ],
    idProperty: 'text'
});
