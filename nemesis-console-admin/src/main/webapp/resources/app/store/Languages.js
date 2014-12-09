Ext.define('AdminConsole.store.Languages', {
    extend: 'Ext.data.ArrayStore',

    model: 'AdminConsole.model.Language',

    storeId: 'languages',

    data: [
        ['bg', 'Bulgarian'],
        ['en', 'English'],
        ['de', 'German'],
        ['fr', 'French'],
        ['sp', 'Spanish']
    ]
});
