import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  // Використовуємо українську локаль за замовчуванням, якщо локаль не визначена
  const safeLocale = locale || 'uk';
  
  return {
    locale: safeLocale,
    messages: (await import(`./messages/${safeLocale}.json`)).default
  };
});
