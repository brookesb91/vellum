<p align="center">
  <img src="assets/logo@0,1x.png" />
</p>

<h2 align="center">Vellum</h2>
<h4 align="center">Webrings: Reborn</h4>

---

## Introduction

> TODO

## For Webmasters

### Quick Set-Up

Add the Vellum iframe to your page.

> `referrerpolicy` **must** be set to `unsafe-url`

```html
<iframe
  src="https://vellum.app/embed"
  frameborder="0"
  referrerpolicy="unsafe-url"
></iframe>
```

Add the required meta information to your page head.

```html
<meta name="vellum:title" content="Skribul" />
<meta name="vellum:description" content="Share your doodles" />
<meta name="vellum:image" content="https://skribul.app/images/logo.png" />
<meta name="vellum:tags" content="web-app,drawing,social" />
```

### Advanced Set-Up

> TODO

## Meta Reference

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
