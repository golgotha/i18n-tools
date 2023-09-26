const I18n = require('../src');

describe('Library test', () => {

    it('Add translations and when change form en to es', () => {
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
            .changeLanguage('en');

        expect(i18n.t('hello')).toBe('Hello');
        expect(i18n.t('deep.word')).toBe('Word');

        i18n.changeLanguage('es');
        expect(i18n.t('hello')).toBe('Hola');
    });

    it('Check key exists', () => {
        const translations = {
            foo: 'bar'
        };

        const i18n = new I18n('en')
            .addLocale('en', translations)
            .changeLanguage('en');

        expect(i18n.exists('foo')).toEqual(true);
        expect(i18n.exists('foo.bar')).toEqual(false);
    });

    it('Interpolation ', () => {
        const translations = {
            hello: 'Hello {{name}}',
            fooBar: 'Foo {{foo.bar}}',
            fooBazz: 'Foo {{foo.bazz.name}}'
        };

        const i18n = new I18n('en')
            .addLocale('en', translations)
            .changeLanguage('en');

        const parameters = {
            name: 'John',
            foo: {
                bar: 'bazz',
                bazz: {
                    name: 'Max'
                }
            }
        };
        expect(i18n.t('hello', parameters)).toBe('Hello John');
        expect(i18n.t('fooBar', parameters)).toBe('Foo bazz');
        expect(i18n.t('fooBazz', parameters)).toBe('Foo Max');
    });

    it('Fallback translation', () => {
        const fallback = {
            hello: 'Hello'
        };

        const i18n = new I18n('en')
            .addLocale('en', fallback)
            .changeLanguage('es');

        expect(i18n.t('hello')).toBe('Hello');
    });

    it('Return undefined if key not exists', () => {
        const fallback = {
            hello: 'Hello'
        };

        const i18n = new I18n('en')
            .addLocale('en', fallback)
            .changeLanguage('en');

        expect(i18n.t('notexist')).toBe('undefined');
    });

});
