Ext.define('console.store.Languages', {
    extend: 'Ext.data.ArrayStore',

    model: 'console.model.Language',

    storeId: 'languages',

    data: [
        ['bg', 'Bulgarian'],
        ['en', 'English'],
        ['de', 'German'],
        ['fr', 'French'],
        ['sp', 'Spanish']
    ]
});
