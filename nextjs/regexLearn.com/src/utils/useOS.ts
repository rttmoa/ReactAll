const MobileRegexes = {
  iPhone: /ihone/i,
  iPod: /iod/i,
  iPad: /iad/i,
  Android: /android/i,
  BlackBerry: /blackberry/i,
  Mobile: /webos/i,
};

const passWhenSSR = fn => (typeof window === 'undefined' ? new Function() : fn);

// ? 判断是  Apple 
export const isMacOS = passWhenSSR(() => /macintosh|mac os x/i.test(window.navigator.userAgent));

// ? 判断是  Mobile
export const isMobile = passWhenSSR(() => Object.values(MobileRegexes).some(regex => regex.test(window.navigator.userAgent)),);