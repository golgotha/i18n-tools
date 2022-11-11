# i18n-tools

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/golgotha/i18n-tools/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/golgotha/i18n-tools/tree/master)

A simple internationalization library.

### Installation

Install with [npm](https://www.npmjs.com/)

```bash
# via npm
npm install @numizmatclub/i18n-tool

# or Yarn
yarn add @numizmatclub/i18n-tool
```

### Usage


```javascript
import I18n from '@numizmatclub/i18n-tool';
import de_DE from './de_DE.json';

const i18n = new I18n('en_US')
    .addLocale("en_US", {
        title: "Title",
        totalItemsX: "Total items: {0}",
        deep: {
            dive: "Dive"
        }
    })
    .addLocale("uk_UA", {
        title: "Заголовок",
        totalItemsX: "Всього елементів: {0}"
    })
    .addLocale("de_DE", de_DE)
    .assignTranslation('en_US');

    const title = i18n.t('title');
    const totalItems = i18n.t('totalItemsX', 10);
    const deepDive = i18n.t('deep.dive');
```

Change translation:

```javascript
    i18n.assignTranslation("uk_UA");
```
