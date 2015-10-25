Ext.define('HelplineConsole.view.Header', {
    extend: 'Ext.Container',
    xtype: 'appHeader',
    id: 'app-header',
    height: 35,
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'component',
                id: 'app-header-title',
                margins: '0, 0, 0, 5',
                cls: 'x-logo',
                flex: 1,
                autoEl: {
                    tag: 'a',
                    href: Ext.get('contextPath').dom.getAttribute('ctxPath'),
                    html: 'Helpline Console'
                }
            },
            {
                id: 'logout-form',
                border: false,
                frame: false,
                xtype: 'form',
                url: 'j_spring_security_logout',
                items: [
                    {
                        xtype: 'hidden',
                        name: '_csrf',
                        id: 'logout-form-csrf-param'
                    }
                ]
            },
            {
                xtype: 'component',
                id: 'app-header-logout',
                cls: 'x-logout-link',
                autoEl: {
                    tag: 'a',
                    href: '#',
                    html: this.logoutLinkName
                }
            },
            {
                xtype: 'combobox',
                listConfig: {
                    getInnerTpl: function (displayField) {
                        return '<img src="resources/img/flag-{isoCode}.gif" class="icon"/> {' + displayField + '}';
                    }
                },
                id: 'app-header-language-selector',
                margins: '0, 5, 0, 0',
                cls: 'x-language-selector',
                store: Ext.create('HelplineConsole.store.Languages'),
                valueField: 'isoCode',
                displayField: 'name',
                value: 'en_GB',
                typeAhead: true,
                listeners: {
                    select: {
                        fn: function (cb, record) {
                            window.location.search = Ext.urlEncode({"lang": record.data.isoCode});
                        },
                        scope: this
                    }
                }
            }
        ];

        this.callParent();
    }
});
