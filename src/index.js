
const UNDEFINED_VALUE = 'undefined';

function isObject(obj) {
  if (obj === undefined || obj === null) {
    return false;
  }

  if (obj.constructor == Array ||
      obj.constructor == Function ||
      obj.constructor == Number ||
      obj.constructor == Boolean ||
      obj.constructor == String) {
    return false
  }

  if (obj.constructor == Object) {
    return true;
  }
}

class I18n {

  constructor(fallbackLocale, options) {
    this.translations = {};
    this.fallbackLocale = fallbackLocale;
    this.options = options;
  }

  addLocale(locale, translation) {
      this.translations[locale] = translation;
      return this;
  }

  /**
   * Change language
   * @param locale
   * @returns {I18n}
   */
  changeLanguage(locale) {
    this.currentTranslation = this.translations[locale];

    if (!this.currentTranslation) {
        this.currentTranslation = this.translations[this.fallbackLocale];
    }
    return this;
  }

  /**
   * Check whether key exists.
   *
   * @param key A translation key.
   * @return boolean if a key exists.
   */
  exists(key) {
    if (key === undefined || key === null) {
      return false;
    }

    const paths = key.split('.');
    const value = this.resolveTemplate(paths);
    return value !== undefined;
  }

  /**
   * Get translation string by key.
   *
   * @param key an input key
   * @param options
   * @return {*|string}
   */
  t(key, options) {
    if (key === undefined || key === null) {
      console.warn("Provided key is undefined or null.")
      return UNDEFINED_VALUE;
    }

    if (options && typeof options !== 'object') {
      throw new Error('Argument parameters must be an object');
    }

    const paths = key.split('.');
    let template = this.resolveTemplate(paths);

    if (template === undefined) {
      return UNDEFINED_VALUE;
    }

    const keys = this._getKeys(options);
    keys.forEach((key) => {
      console.debug(`Template ${template}, Parameter value '${key.value}'`);
      template = template.replace(`\{\{${key.name}\}\}`, key.value);
    });

    return template;
  }

  /**
   * Return list keys with values.
   * @param parameters
   * @private
   */
  _getKeys(parameters) {
    const keys = [];
    this._traverseParameters(parameters,  null, keys);
    return keys;
  }

  /**
   * Get all key from a parameter object.
   * The object is key-value, like:
   * {
   *     key: value
   * }
   *
   * @param value An input object
   * @param key
   * @param keys
   * @private
   */
  _traverseParameters(value, key, keys) {
    if (isObject(value)) {
      for (const objKey of Object.keys(value)) {
        const resolvedKey = key ? key + "." + objKey : objKey;
        this._traverseParameters(value[objKey], resolvedKey, keys);
      }
    } else if(Array.isArray(value)) {
      console.warn("Skip key " + key + ". The key value is array.");
    } else {
      keys.push({
        name: key,
        value: value
      });
    }
  }

  resolveTemplate(paths) {
    let current = this.currentTranslation;
    let currentFallback = this.translations[this.fallbackLocale];

    for (const element of paths) {
      if (current[element] === undefined) {
        // Try find in fallback locale
        current = currentFallback[element];
        currentFallback = current;
        if (current === undefined) {
          return undefined;
        }
      } else {
        current = current[element];
        currentFallback = currentFallback[element];
      }
    }
    return current;
  }
}

module.exports = I18n;
