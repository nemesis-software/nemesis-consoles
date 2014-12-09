Ext.define('console.store.Experiences', {
    extend: 'Ext.data.ArrayStore',

    model: 'console.model.Experience',

    storeId: 'languages',

    data: [
        ['normal', 'Desktop'],
        ['tablet', 'Tablet'],
        ['mobile', 'Mobile']
    ]
});
