Ext.define('console.view.LanguageSwitcher', function () {
    var theme = location.href.match(/ext-theme-(\w+)/);

    theme = theme && theme[1];

    if (!Ext.themeName) {
        Ext.themeName = theme;
    }

    return {
        extend: 'Ext.Container',
        xtype: 'languageSwitcher',
        id: 'language-switcher',
        margin: '0 10 0 0',
        layout: 'hbox',
        initComponent: function () {
            this.items = [
                {
                    xtype: 'combo',
                    id: 'language-switcher-combo',
                    width: 170,
                    labelWidth: 50,
                    fieldLabel: 'Theme',
                    displayField: 'name',
                    valueField: 'value',
                    margin: '0 5 0 0',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['value', 'name'],
                        data: [
                            { value: 'bg', name: 'Bulgarian' },
                            { value: 'de', name: 'German' },
                            { value: 'en', name: 'English' },
                            { value: 'sp', name: 'Spanish' }
                        ]
                    }),
                    value: theme,
                    listeners: {
                        select: function (combo) {
                            location.href = location.href.replace(
                                    'ext-theme-' + theme, 'ext-theme-' + combo.getValue()
                            );
                        }
                    }
                },
                {
                    xtype: 'button',
                    hidden: true, // !(Ext.repoDevMode || location.href.indexOf('qa.sencha.com') !== -1),
                    enableToggle: true,
                    text: 'RTL',
                    margin: '0 5 0 0',
                    listeners: {
                        toggle: function (btn, pressed) {
                            // TODO: handle rtl switching
                        }
                    }
                }
            ];

            this.callParent();
        }
    };
});
