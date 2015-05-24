Ext.define('HelplineConsole.model.Order', {
	extend: 'Ext.data.Model',
	fields: ['pk', 'uid', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate', 'totalTaxValues', 'deliveryStatus',
		'date', 'discountsIncludeDeliveryCost', 'net', 'totalTax', 'globalDiscountValues', 'status', 'paymentCost', 'deliveryCost',
		'calculated', 'discountsIncludePaymentCost', 'subtotal', 'totalPrice', 'appliedVoucherCodes', 'entityName', 'new', 'id', 'typeCode']
});