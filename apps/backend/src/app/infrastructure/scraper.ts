import * as request from 'request-promise';
import * as $ from 'cheerio';

export const scrape = async (url: string) => {
  const html = await request(url);

  const getMetaContent = (selector: string) => {
    const el = $(`meta[${selector}][content]`, html);
    const content = el.attr('content') || '';
    return content;
  };

  const getTitle = () => {
    const el = $(`title`, html);
    return el.text();
  };

  return {
    title: getMetaContent('property="og:title"') || getTitle(),
    description:
      getMetaContent('property="og:description"') ||
      getMetaContent('name="Description"') ||
      getMetaContent('name="description"'),
    locale: getMetaContent('property="og:locale"'),
    type: getMetaContent('property="og:type"'),
    // url: getMetaContent('og:url'),
    image:
      getMetaContent('property="og:image"') ||
      getMetaContent('property="og:image:url"'),
    name: getMetaContent('property="og:site_name"'),
    publishedAt: getMetaContent('property="article:published_time"'),
    modifiedAt: getMetaContent('property="article:modified_time"'),
  };
};
