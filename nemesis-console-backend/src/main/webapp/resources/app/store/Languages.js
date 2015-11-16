Ext.define('console.store.Languages', {
    extend: 'Ext.data.ArrayStore',

    model: 'console.model.Language',

    storeId: 'languages',

    data: [
        ['en', 'English'],
        ['en_GB', 'English (GB)'],
        ['en_US', 'English (US)'],
        ['bg_BG', 'Bulgarian'],
        ['de_DE', 'German'],
        ['fr_FR', 'French'],
        ['es_ES', 'Spanish']
    ]
});
