Ext.define('console.store.Languages', {
    extend: 'Nemesis.LocalizedArrayStore',

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
