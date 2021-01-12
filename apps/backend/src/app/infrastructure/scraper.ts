import * as request from 'request-promise';
import * as $ from 'cheerio';
import { parseTags } from './parse-tags';

interface Scraper<T> {
  name: keyof Meta;
  selector: string;
  process: (el: any) => T;
}

type Scrapers = Scraper<any>[];

interface Meta {
  title: string;
  description: string;
  image: string;
  icon: string;
  type: string;
  locale: string;
  color: string;
  name: string;
  tags: string[];
  publishedAt: string;
  modifiedAt: string;
}

const scrapers: Scrapers = [
  {
    name: 'title',
    selector:
      'meta[name="vellum:title"][content],' +
      'meta[property="og:title"][content],' +
      'title',
    process: (el): string =>
      el.length
        ? $(el).get(0).tagName === 'META'
          ? $(el).attr('content')
          : $(el).text()
        : '',
  },
  {
    name: 'description',
    selector:
      'meta[name="vellum:description"][content],' +
      'meta[property="og:description"][content],' +
      'meta[name="Description"][content],' +
      'meta[name="description"][content]',
    process: (el): string => (el.length ? $(el).attr('content') : ''),
  },
  {
    name: 'image',
    selector:
      'meta[name="vellum:image"][content],' +
      'meta[property="og:image:url"][content],' +
      'meta[property="og:image"][content]',
    process: (el): string => (el.length ? $(el).attr('content') : ''),
  },
  {
    name: 'icon',
    selector:
      'meta[name="vellum:icon"][content],' +
      'link[rel="icon"][sizes="196x196"][href]' +
      'link[rel="icon"][sizes="32x32"][href],' +
      'link[rel="icon"][href]',
    process: (el) => (el.length ? $(el).attr('href') : ''),
  },
  {
    name: 'type',
    selector:
      'meta[name="vellum:type"][content],' +
      'meta[property="og:type"][content]',
    process: (el): string => (el.length ? $(el).attr('content') : ''),
  },
  {
    name: 'locale',
    selector:
      'meta[name="vellum:locale"][content],' +
      'meta[property="og:locale"][content]',
    process: (el): string => (el.length ? $(el).attr('content') : ''),
  },
  {
    name: 'name',
    selector:
      'meta[name="vellum:name"][content],' +
      'meta[property="og:site_name"][content]',
    process: (el): string => (el.length ? $(el).attr('content') : ''),
  },
  {
    name: 'tags',
    selector: 'meta[name="vellum:tags"][content]',
    process: (el): string[] =>
      el.length ? parseTags($(el).attr('content')) : [],
  },
  {
    name: 'color',
    selector:
      'meta[name="vellum:color"][content],' +
      'meta[name="theme-color"][content]',
    process: (el): string => (el.length ? $(el).attr('content') : ''),
  },
  {
    name: 'publishedAt',
    selector:
      'meta[name="vellum:published_at"][content],' +
      'meta[property="article:published_time"][content]',
    process: (el): string => (el.length ? $(el).attr('content') : ''),
  },
  {
    name: 'modifiedAt',
    selector:
      'meta[name="vellum:modified_at"][content],' +
      'meta[property="article:modified_time"][content]',
    process: (el): string => (el.length ? $(el).attr('content') : ''),
  },
];

export const scrape = async (url: string) => {
  const html = await request(url);

  const meta: Meta = {} as Meta;

  for (let i = 0; i < scrapers.length; i++) {
    const scraper = scrapers[i];
    const el = $(scraper.selector, html);
    meta[scraper.name] = scraper.process(el);
  }

  return meta;
};
