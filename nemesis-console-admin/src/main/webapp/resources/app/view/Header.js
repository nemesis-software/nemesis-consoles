Ext.define('AdminConsole.view.Header', {
    extend: 'Ext.Container',
    xtype: 'appHeader',
    id: 'app-header',
    logoutLinkName: 'Logout',
    height: 35,
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    initComponent: function () {
        var myMenu = Ext.create('AdminConsole.view.PortletsSelectionMenu');
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
                    html: 'Admin Console'
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
                xtype: 'button',
                id: 'dropDownMenu',
                text: 'Please select portlet',
                margin: '0 5 0 5',
                menu: myMenu
            },
            {
                xtype: 'combobox',
                listConfig: {
                    getInnerTpl: function (displayField) {
                        return '<img src="resources/img/flag-{isoCode}.gif" class="icon"/> {' + displayField + '}';
                    }
                },
                id: 'app-header-language-selector',
                margin: '0 5 0 0',
                cls: 'x-language-selector',
                store: Ext.create('AdminConsole.store.Languages'),
                valueField: 'isoCode',
                displayField: 'name',
                value: 'en_GB',
                typeAhead: true,
                listeners: {
                    select: {
                        fn: function (cb, record) {
                            window.location.search = Ext.urlEncode({"lang": record.data.isoCode});
                        }
                    },
                    scope: this
                }
            }
        ];

        this.callParent();
    }
});
