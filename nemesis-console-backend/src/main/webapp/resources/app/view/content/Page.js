Ext.define('console.view.content.Page', {
    extend: 'Ext.panel.Panel',
    xtype: 'contentPageTab',
    closable: true,
    layout: 'border',
    requires: [
        'console.view.content.search.SearchForm',
        'console.view.content.search.SearchResults',
        'console.view.TaskBar'
    ],
    initComponent: function () {
        this.items = [
            {
                region: 'north',
                xtype: 'contentSearchForm',
                collapsible: true,
                split: true,
                id: this.entity.data.id + '-search-form',
                entity: this.entity,
            },
            {
                region: 'center',
                xtype: 'contentSearchResults',
                collapsible: false,
                id: this.entity.data.id + '-search-result',
                entity: this.entity,
            }
        ];

        this.callParent();
    }
});
