Ext.define('HelplineConsole.store.Languages', {
    extend: 'Ext.data.ArrayStore',

    model: 'HelplineConsole.model.Language',

    storeId: 'languages',

    data: [
        ['bg_BG', 'Bulgarian'],
        ['en_GB', 'English'],
        ['de_DE', 'German'],
        ['fr_FR', 'French'],
        ['es_ES', 'Spanish']
    ]
});
