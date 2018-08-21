module.exports = class I18n {


  constructor(fallbackTranslation) {
    this.translations = {};
    this.fallbackTranslation = fallbackTranslation;
  }

  addLocale(locale, translation) {
      this.translations[locale] = translation;
      return this;
  }

  assignTranslation(locale) {
    try {
      this.activeTranslation = this.translations[locale];
    } catch (e) {
      this.activeTranslation = this.fallbackTranslation;
    }
    return this;
  }

  t(key, ...parameters) {
    const paths = key.split('.');
    let template = this._findDeep(paths);

    if (parameters) {
      parameters.forEach((parameter, index) => {
        template = template.replace(`\{${index}\}`, parameter);
      });
    }

    return template;
  }

  _findDeep(paths) {
    let current = this.activeTranslation;
    let currentFallback = this.fallbackTranslation;
    for (let i = 0; i < paths.length; ++i) {
      if (current[paths[i]] === undefined) {
        // Try find in fallback locale
        current = currentFallback[paths[i]];
        currentFallback = current;
        if (current === undefined) {
          return 'undefined';
        }
      } else {
        current = current[paths[i]];
        currentFallback = currentFallback[paths[i]];
      }
    }
    return current;
  }
};
