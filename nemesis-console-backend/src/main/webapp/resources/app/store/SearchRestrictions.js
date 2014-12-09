Ext.define('console.store.SearchRestrictions', {
    extend: 'Ext.data.ArrayStore',

    model: 'console.model.SearchRestriction',

    storeId: 'searchRestrictions',

    data: [
        ['Equals', 'is equal'],
        ['After', 'is after'],
        ['Before', 'is before'],
        ['StartingWith', 'is starting with'],
        ['EndingWith', 'is ending with'],
        ['GreaterThan', 'is greater than'],
        ['LessThan', 'is less than'],
        ['Like', 'is like'],
        ['notlike', 'is not like']
    ]
});
