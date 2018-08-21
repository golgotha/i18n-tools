const I18n = require('../index');

describe('assign active locale', () => {

    it('Aasign translation and when change it', () => {
        const fallback = {
            hello: 'Hello'
        };

        const en = {
            hello: 'Hello'
        };

        const es = {
            hello: 'Hola'
        };

        const i18n = new I18n(fallback);
        i18n.addLocale('en', en)
            .addLocale('es', es)
            .assignTranslation('en');

        expect(i18n.t('hello')).toBe('Hello');

        i18n.assignTranslation('es');
        expect(i18n.t('hello')).toBe('Hola');
    });

});
