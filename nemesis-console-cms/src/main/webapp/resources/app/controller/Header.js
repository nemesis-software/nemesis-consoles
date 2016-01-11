Ext.define("console.controller.Header", {
    extend: 'Ext.app.Controller',

    control: {
        'appHeader': {
            translateMenu: 'onTranslateMenuNavigationItems'
        }
    },

    onTranslateMenuNavigationItems: function(langCode) {
        Ext.log(this.$className + '.onTranslateMenuNavigationItems');

        var cmbCatalogs = Ext.getCmp('catalogsCombo'),
            storeCatalogs = cmbCatalogs.getStore(),
            menuPagesDataView = Ext.getCmp('content-page-dataview'),
            storeContentPage = menuPagesDataView.getStore(),
            menuWidgetsDataView = Ext.getCmp('widgets-dataview'),
            storeWidgets = menuWidgetsDataView.getStore();

        //Translates calalogs combo items
        storeCatalogs.getRange().forEach(function (record) {
            var catalogName = '',
                name = record.get('name');
            if (langCode === 'bg_BG') {
                catalogName = name.bg_BG.value;
            }
            //TODO Change it when other language translates appears from the REST
            else {
                catalogName = name.en.value;
            }
            if (!Ext.isEmpty(catalogName)) {
                record.set('catalogName', catalogName);
            }
        });
    }
});
