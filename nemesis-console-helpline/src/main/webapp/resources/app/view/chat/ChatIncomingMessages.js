Ext.define('HelplineConsole.view.chat.ChatIncomingMessages', {
    extend: 'Ext.grid.Panel',
    xtype: 'inomingMessagesPanel',
    forceFit: true,
    store: Ext.create('Ext.data.ArrayStore', {
        autoLoad: true,
        autoSync: false,
        model: 'HelplineConsole.model.ChatConversation'
    }),
    columns: [
        {
            header: 'Incoming Messages',
            renderer: function (value, metaData, record, row, col, store, gridView) {
                return '<b> [' + record.data.events[record.data.events.length - 1].data.author + '] ' + record.data.events[record.data.events.length - 1].data.message + '</b>';
            }
        }
    ],
    listeners: {
        itemclick: function (view, record, item, index, event) {
            console.log(record.data.events[0].data);
            var html = "";
            for (chatEvent in record.data.events) {
                html += this.buildChatLine(record.data.events[chatEvent].data);
            }

            Ext.getCmp('chat-history-log').update(html);

            //scroll into view

            //remove from store
            this.store.remove(record);

            //enable response
            Ext.getCmp('chat-response-area').setReadOnly(false);
        },
    },
    viewConfig: {
        emptyText: 'No incoming messages',
        deferEmptyText: false
    },

    initComponent: function () {
        this.items = [

        ];

        this.callParent();
    },
    buildChatLine: function (chatEvent) {
        return "<span class='info'>[" + chatEvent.author + " - " + chatEvent.date + "]</span>  " + chatEvent.message;
    }
});
