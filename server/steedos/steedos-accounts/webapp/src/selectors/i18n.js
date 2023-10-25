
import * as I18n from '../i18n/i18n';

import { getSettings } from '../selectors';
import { getBrowserLng } from '../client/index'

export function getCurrentUserLocale(state) {
    return getBrowserLng();
}

// This is a placeholder for if we ever implement browser-locale detection
export function getCurrentLocale(state) {
    return getCurrentUserLocale(state, getSettings(state).DefaultClientLocale);
}

export function getTranslations(state, locale) { // state下In8下属性是否与locale匹配  返回是中文还是英文
    const localeInfo = I18n.getLanguageInfo(locale);
    // console.log(state)
    // console.log(locale) // zh-cn
    // console.log(localeInfo)
    // console.log(state.i18n.translations[locale]) // undefined
    let translations;
    if (localeInfo && state.i18n.translations[locale]) {
        translations = state.i18n.translations[locale];
    } else {
        // Default to English if an unsupported locale is specified
        translations = state.i18n.translations.en;
    }
    return translations;
}
