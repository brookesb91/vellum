import * as request from 'request-promise';
import * as $ from 'cheerio';

export const scrape = async (url: string) => {
  const html = await request(url);

  const getMetaContent = (property: string) => {
    const el = $(`meta[property="${property}"][content]`, html);
    const content = el.attr('content') || '';
    return content;
  };

  return {
    title: getMetaContent('og:title'),
    description: getMetaContent('og:description'),
    locale: getMetaContent('og:locale'),
    type: getMetaContent('og:type'),
    // url: getMetaContent('og:url'),
    image: getMetaContent('og:image'),
    name: getMetaContent('og:site_name'),
    publishedAt: getMetaContent('article:published_time'),
    modifiedAt: getMetaContent('article:modified_time'),
  };
};
