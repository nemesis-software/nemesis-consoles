Ext.define('HelplineConsole.model.User', {
	extend: 'Ext.data.Model',
	fields: ['pk', 'uid', 'createdBy', 'createdDate', 'lastModifiedBy', 'displayName', 
			'loginDisabled', 'lastName', 'firstName', 'encodedPassword', 'passwordEncoding', 'entityName', 'typeCode', 'new', 'id']
});