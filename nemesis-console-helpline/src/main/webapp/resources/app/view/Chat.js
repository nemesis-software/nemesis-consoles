Ext.define('HelplineConsole.view.Chat', {
    extend: 'Ext.panel.Panel',
    xtype: 'helplineconsoleChat',
    title: 'Chat',
    rootVisible: false,
    cls: 'examples-list',
    layout: 'border',
    lines: false,
    border: false,
    autoScroll: true,
    useArrows: true,
    requires: [
        'HelplineConsole.view.chat.ChatIncomingMessages'
    ],

    initComponent: function () {
        Ext.apply(this, { items: [
            {
                region: 'center',
                xtype: 'panel',
                rtl: false,
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'start'
                },
                items: [
                    {
                        xtype: 'inomingMessagesPanel',
                        id: 'chatlog-incoming-messages',
                        flex: 1
                    },
                    {
                        xtype: 'splitter',
                        collapsible: false
                    },
                    {
                        html: '',
                        split: true,
                        id: 'chat-history-log',
                        height: 400
                    }
                ]
            },
            {
                region: 'south',
                xtype: 'textareafield',
                id: 'chat-response-area',
                frame: true,
                border: true,
                readOnly: true,
                emptyText: 'Enter your message here ...',
                enableKeyEvents: true
            }
        ]
        });
        this.callParent();
    },
});
