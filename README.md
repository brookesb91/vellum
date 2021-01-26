# Vellum

## Example Embed

```html
<iframe
  src="https://vellum.app/embed"
  frameborder="0"
  referrerpolicy="unsafe-url"
></iframe>
```

## Example Meta

```html
<meta name="vellum:title" content="Skribul" />
<meta name="vellum:description" content="Share your doodles" />
<meta name="vellum:image" content="https://skribul.app/images/logo.png" />
<meta name="vellum:tags" content="web-app,drawing,social" />
```

### What is scraped?

| Name        | Selector                                   | Description      | Fallbacks                                                                                                        |
| ----------- | ------------------------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| Title       | `meta[name="vellum:title"][content]`       | Page title       | `meta[property="og:title"][content], title`                                                                      |
| Description | `meta[name="vellum:description"][content]` | Page description | `meta[property="og:description"][content], meta[name="Description"][content], meta[name="description"][content]` |
| Image       | `meta[name="vellum:image"][content]`       | Page image       | `meta[property="og:image:url"][content], meta[property="og:image"][content]`                                     |
| Icon        | `meta[name="vellum:icon"][content]`        | Page icon        | `link[rel="icon"][sizes="196x196"][href], link[rel="icon"][sizes="32x32"][href], link[rel="icon"][href]`         |
| Type        | `meta[name="vellum:type"][content]`        | Page type        | `meta[property="og:type"][content]`                                                                              |
| Locale      | `meta[name="vellum:locale"][content]`      | Page locale      | `meta[property="og:locale"][content]`                                                                            |
| Name        | `meta[name="vellum:name"][content]`        | Page site name   | `meta[property="og:site_name"][content]`                                                                         |
| Tags        | `meta[name="vellum:tags"][content]`        | Page tags        |                                                                                                                  |
| Color       | `meta[name="vellum:color"][content]`       | Page theme color | `meta[name="theme-color"][content]`                                                                              |
