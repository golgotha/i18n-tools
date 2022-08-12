const I18n = require('../src');

describe('assign active locale', () => {

    it('Assign translation and when change it', () => {
        const fallback = {
            hello: 'Hello'
        };

        const en = {
            hello: 'Hello',
            deep: {
                word: 'Word'
            }
        };

        const es = {
            hello: 'Hola'
        };

        const i18n = new I18n('en');
        i18n.addLocale('en', en)
            .addLocale('es', es)
            .assignTranslation('en');

        expect(i18n.t('hello')).toBe('Hello');
        expect(i18n.t('deep.word')).toBe('Word');

        i18n.assignTranslation('es');
        expect(i18n.t('hello')).toBe('Hola');
    });

    it('Fallback translation', () => {
        const fallback = {
            hello: 'Hello'
        };

        const i18n = new I18n('en')
            .addLocale('en', fallback)
            .assignTranslation('en');

        expect(i18n.t('hello')).toBe('Hello');
    });

});
