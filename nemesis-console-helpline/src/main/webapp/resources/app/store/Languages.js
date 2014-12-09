Ext.define('HelplineConsole.store.Languages', {
    extend: 'Ext.data.ArrayStore',

    model: 'HelplineConsole.model.Language',

    storeId: 'languages',

    data: [
        ['bg', 'Bulgarian'],
        ['en', 'English'],
        ['de', 'German'],
        ['fr', 'French'],
        ['sp', 'Spanish']
    ]
});
