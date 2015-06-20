Ext.define("console.locale.en.view.Header", {
    override: "console.view.Header",
    appTitleName: "Backend Console",
    logoutLinkName: 'Изход'
});

Ext.define("console.locale.en.view.Menu", {
    override: "console.view.Menu",
    title: "Навигация",
    filterEmptyText: 'Филтър...'
});

Ext.define("console.locale.en.navigation.EntityNames", {
    product: 'Продукт',                                        //catalog
    category: 'Категория',
    catalog: 'Каталог',
    catalog_version: 'Каталожна версия',
    unit: 'Единица',
    stock_level: 'Количества',
    keyword: 'Ключова дума',
    price: 'Цена',                                             //price
    discount: 'Намаление',
    tax: 'Данък',
    packaging: 'Опаковка',
    abstract_order: 'Поръчка',                                 //order
    abstract_order_entry: 'Поръчван продукт',
    invoice: 'Фактура',
    delivery_mode: 'Начин на доставка',
    payment_mode: 'Начин на плащане',
    media: 'Медиа',                                            //media
    media_format: 'Медиен формат',
    media_folder: 'Медийна папка',
    media_container: 'Медиен контейнер',
    media_watermark: 'Воден знак',
    search_facet_config: 'Фасетна конфигурация',               //search
    search_server_config: 'Сървърна конфигурация',
    search_facet: 'Фасет',
    customer: 'Клиент',                                        //user
    employee: 'Служител',
    usergroup: 'Групи',
    address: 'Адрес',
    title: 'Название',
    language: 'Език',                                          //i18n
    currency: 'Валути',
    country: 'Държава',
    region: 'Регион',
    voucher: 'Ваучер',                                         //marketing
    customer_review: 'Ревю',
    newsletter_subscriber: 'Абонати',
    warehouse: 'Склад',                                        //location
    point_of_service: 'Магазин',
    opening_schedule: 'Работно време',
    storefinder_configuration: 'Търсачка на магазини',
    abstract_page: 'Страница',                                 //cms
    abstract_template: 'Макет на страница',
    content_slot: 'Място на страница',
    site: 'Сайт',
    simple_cms_widget: 'Уйджет',
    cronjob: 'Задача',                                         //settings
    email_configuration: 'Имейл',
    social_configuration: 'Социалност',
    storage_configuration: 'Съхранение'
});

Ext.define("console.locale.en.view.TabPanel", {
    override: "console.view.TabPanel",
    entityNames: new console.locale.en.navigation.EntityNames()
});

Ext.define("console.locale.en.view.NavigationTree", {
    override: "console.view.NavigationTree",
    folderNames: {
        catalogfolder: 'Каталози',
        pricefolder: 'Цени',
        orderfolder: 'Поръчки',
        mediafolder: 'Медии',
        searchfolder: 'Търсения',
        searchfacetfolder: 'Фасети',
        userfolder: 'Потребители',
        i18nfolder: 'Интернационализация',
        marketingfolder: 'Маркетинг',
        locationfolder: 'Места',
        cmsfolder: 'Съдържание',
        widgetsfolder: 'Уиджети',
        settingsfolder: 'Настройки'

    },
    entityNames: new console.locale.en.navigation.EntityNames()
});

Ext.define("console.locale.en.view.content.search.SearchResults", {
    override: "console.view.content.search.SearchResults",
    title: "Резултати"
});

Ext.define("console.locale.en.view.content.search.SearchForm", {
    override: "console.view.content.search.SearchForm",
    title: "Търсене",
    searchButtonName: "Търси",
    restrictionNames: {
        'Equals': 'е равно на',
        'After': 'е след',
        'IsAfter': 'е след',
        'Before': 'е преди',
        'IsBefore': 'е преди',
        'StartingWith': 'започва с',
        'IsStartingWith': 'започва с',
        'EndingWith': 'завършва на',
        'IsEndingWith': 'завършва на',
        'GreaterThan': 'е по-голямо от',
        'IsGreaterThan': 'е по-голямо от',
        'LessThan': 'е по-малко от',
        'IsLessThan': 'е по-малко от',
        'Like': 'е като',
        'IsLike': 'е като',
        'NotLike': 'не е като',
        'IsNotLike': 'не е като',
        'Null': 'е празно',
        'IsNull': 'е празно',
        'NotNull': 'не е празно',
        'IsNotNull': 'не е празно'
    }
});
