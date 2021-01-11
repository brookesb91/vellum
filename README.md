# Vellum

## Embed

```html
<iframe
  src="https://vellum.app/embed"
  frameborder="0"
  referrerpolicy="unsafe-url"
></iframe>
```

## Meta

Vellum specific tags

```html
<!-- Page title -->
<meta name="vellum:title" content="..." />
<!-- Page description -->
<meta name="vellum:description" content="..." />
<!-- Page image -->
<meta name="vellum:image" content="..." />
<!-- Page tags -->
<meta name="vellum:tags" content="..." />
```

Example

```html
<meta name="vellum:title" content="Skribul" />
<meta name="vellum:description" content="Share your doodles" />
<meta name="vellum:image" content="https://skribul.app/images/logo.png" />
<meta name="vellum:tags" content="web-app,drawing,social" />
```

### Selectors

Title - `meta[name="vellum:title"][content], meta[property="og:title"][content], title`

Description - `meta[name="vellum:description"][content], meta[property="og:description"][content], meta[name="Description"][content], meta[name="description"][content]`

Image - `meta[name="vellum:image"], meta[property="og:image:url"], meta[property="og:image]`
