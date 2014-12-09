Ext.define('AdminConsole.model.ChartStock', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name'},
        {name: 'cpu', type: 'float'},
        {name: 'memory', type: 'float'}
    ]
});
