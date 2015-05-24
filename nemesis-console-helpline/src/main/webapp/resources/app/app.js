Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'HelplineConsole',
    appFolder: 'resources/app',
    autoCreateViewport: false,

    requires: [
        'Ext.window.MessageBox',
        'HelplineConsole.model.ChatConversation'
    ],

    controllers: [
        'Main',
        'MenuController'
    ],

    launch: function () {

        // Create the actual viewport in body
        Ext.create('HelplineConsole.view.Viewport', {
            renderTo: Ext.getBody(),
            listeners: {
                afterrender: function () {
                    var mask = Ext.get('splash-screen'),
                        parent = Ext.get('splash-background');
                    ;
                    mask.fadeOut({callback: function () {
                        mask.destroy();
                    }});
                    parent.fadeOut({callback: function () {
                        parent.destroy();
                    }});
                    Ext.getCmp('app-header-logout').getEl().on('click', function () {
                        Ext.getCmp('logout-form-csrf-param').setValue(Ext.get('security').dom.getAttribute('token'));
                        Ext.getCmp('logout-form').submit({
                            standardSubmit: true
                        });
                    });

                    Ext.getCmp('chat-response-area').getEl().on('keyup', function (e, textarea) {
                        if (e.getKey() === e.ENTER) {
                            var event = Ext.create('HelplineConsole.model.ChatMessage', {author: Ext.get('security').dom.getAttribute('username'), broadcasterId: currentConversation.data.broadcasterId, time: new Date().getTime(), message: textarea.value});
                            subSocket.push({data: Ext.encode(event.data)});
                            Ext.getCmp('chat-response-area').setValue(null);
                        }
                    });

                    soundManager.setup({
                        // where to find flash audio SWFs, as needed
                        url: 'resources/js/soundmanager/swf/',
                        // optional: prefer HTML5 over Flash for MP3/MP4
                        // preferFlash: false,
                        onready: function () {
                            // SM2 is ready to play audio!

                            var notificationSound = soundManager.createSound({ id: 'notification', url: 'resources/sound/notification.wav' });

                        }
                    });

                    var currentConversation = Ext.create('HelplineConsole.model.ChatConversation', {});
                    var username = 'csagent-007';

                    var socket = $.atmosphere;
                    var subSocket;

                    function subscribe() {
                        var request = {
                            url: document.location.protocol + '//' + document.location.hostname + ':' + document.location.port + document.location.pathname + 'chat/json/helpline-queue-agent-pe6o',
                            transport: 'websocket',
                            contentType: "application/json",
                            logLevel: 'debug',
                            shared: true,
                            trackMessageLength: true,
                            fallbackTransport: 'long-polling'
                        };
                        request.onMessage = function (response) {
                            if (response.status == 200) {

                                var data = response.responseBody;
                                if (data.length > 0) {
                                    data = jQuery.parseJSON(data);
                                    var d = new Date(parseInt(data.time));

                                    //var msg = new HelplineConsole.model.ChatMessage({
                                    //	author: data.author,
                                    //	date: '',
                                    //	message: data.message
                                    //});
                                    var msg = Ext.create('HelplineConsole.model.ChatMessage', {author: data.author, broadcasterId: data.broadcasterId, date: format(d.getHours(), 2) + ":" + format(d.getMinutes(), 2) + ":" + format(d.getSeconds(), 2), message: data.message});
                                    var incomingMessageIndex = Ext.getCmp('chatlog-incoming-messages').getStore().find('broadcasterId', data.broadcasterId);
                                    if (incomingMessageIndex != -1) {
                                        var currConv = Ext.getCmp('chatlog-incoming-messages').getStore().getAt(incomingMessageIndex);
                                        var evs = [];
                                        evs.push(currConv.events);
                                        evs.push(msg);
                                        currConv.events = msg;
                                        Ext.getCmp('chatlog-incoming-messages').getStore().update(currConv);
                                    } else {
                                        var evs = [];
                                        if (msg.data.broadcasterId === currentConversation.data.broadcasterId) {
                                            addChatLine(msg.data);
                                            currentConversation.data.events.push(msg);
                                        } else {
                                            evs.push(msg);
                                            currentConversation = Ext.create('HelplineConsole.model.ChatConversation', {broadcasterId: data.broadcasterId, events: evs});
                                            Ext.getCmp('chatlog-incoming-messages').getStore().add(currentConversation);
                                        }
                                    }

                                    soundManager.play('notification');

                                    //Ext.getCmp('chatlog-incoming-messages').store()
                                    //$("#chat_div").chatbox("option", "boxManager").addMsg("[" + data.author + " - " + format(d.getHours(),2) + ":" + format(d.getMinutes(),2) + ":" + format(d.getSeconds(),2) + "]", data.message);
                                }
                            }
                        };

                        subSocket = socket.subscribe(request);
                        //play subscribe sound.

                    }

                    function format(a, b) {
                        return(1e15 + a + "").slice(-b);
                    }

                    function unsubscribe() {
                        socket.unsubscribe();
                        //play unsubscribe sound.

                    }

                    function connect() {
                        unsubscribe();
                        subscribe();
                    }

                    function addChatLine(chatEvent) {

                        var color = '#000000';
                        if (chatEvent.author === '<sec:authentication property="principal.username" />') {
                            color = '#748024';
                        }

                        var line = "<div style='color: " + color + "'><span class='info'>[" + chatEvent.author + " - " + chatEvent.date + "]</span>  " + chatEvent.message + "</div>";
                        Ext.getCmp('chat-history-log').update(Ext.getCmp('chat-history-log').html + line);
                        //scrollIntoView
                    }

                    connect();
                }
            }
        });

        var params = Ext.urlDecode(window.location.search.substring(1));

        if (params.lang) {
            var record = Ext.getCmp('app-header-language-selector').getStore().findRecord('isoCode', params.lang, null, null, null, true);
            if (record) {
                Ext.getCmp('app-header-language-selector').setValue(record.data.isoCode);
            }
        }

        var serverTime = Ext.util.Cookies.get('serverTime');
        serverTime = serverTime == null ? null : Math.abs(serverTime);
        var clientTimeOffset = (new Date()).getTime() - serverTime;
        Ext.util.Cookies.set('clientTimeOffset', clientTimeOffset);

        var runner = new Ext.util.TaskRunner();

        // poll some page every 10 seconds
        var task = runner.start({
            run: function () {
                var sessionExpiry = Math.abs(Ext.util.Cookies.get('sessionExpiry'));
                var timeOffset = Math.abs(Ext.util.Cookies.get('clientTimeOffset'));
                var localTime = (new Date()).getTime();
                if (localTime - timeOffset > (sessionExpiry + 15000)) { // 15 extra seconds to make sure
                    Ext.TaskManager.stop(task);
                    location.href = "login";
                }
            },
            interval: 10000
        });
    }
});
