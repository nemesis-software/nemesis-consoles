Ext.define('HelplineConsole.model.ChatMessage', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'broadcasterId'},
        {name: 'author'},
        {name: 'time'},
        {name: 'date'},
        {name: 'message'}
    ]
});
