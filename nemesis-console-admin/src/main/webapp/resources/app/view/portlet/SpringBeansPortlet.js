Ext.define('AdminConsole.view.portlet.SpringBeansPortlet', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.springbeansportlet',
    xtype: 'springBeansPortlet',
    itemId: 'springBeansPortletId',
    id: 'spring-beans',
    frame: false,
    height: 300,
    requires: [
        'AdminConsole.model.SpringBean'
    ],
    columns: [{
        text: 'Bean',
        flex: 1,
        dataIndex: 'bean'
    }, {
        text: 'Scope',
        flex: 1,
        dataIndex: 'scope'
    }, {
        text: 'Type',
        flex: 1,
        dataIndex: 'type'
    }, {
        text: 'Resource',
        flex: 1,
        dataIndex: 'resource'
    }, {
        text: 'Dependencies',
        flex: 1,
        dataIndex: 'dependencies'
    }],
    tbar: [{
        xtype: 'label',
        itemId: 'context',
        style: {
            fontWeight: 'bold',
            fontSize: '11px',
            color: '#333'
        },
        margin: '0 0 0 5',
        text: ''
    }, {
        xtype: 'tbfill'
    }, {
        xtype: 'textfield',
        id: 'spring-beans-filter',
        emptyText: 'Filter...',
        width: 150,
        enableKeyEvents: true,
        triggers: {
            clear: {
                cls: 'x-form-clear-trigger',
                handler: function() {
                    this.setRawValue('');
                    this.up('springBeansPortlet').store.clearFilter();
                }
            }
        },
        listeners: {
            keyup: function() {
                var store = this.up('springBeansPortlet').store;
                store.clearFilter();
                if (this.value) {
                    store.filter({
                        property: 'bean',
                        value: this.value,
                        anyMatch: true,
                        caseSensitive: false
                    });
                }
            },
            buffer: 500
        }
    }],
});