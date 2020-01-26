# Font Selector

Font Selector is a simple to use font picker that replaces your **native select element** with a dropdown that has **font preview functionality**.

You can host the fonts wherever you like. Font Selector is not coupled to Google Fonts. So you won't have any issues regarding GDPR.

Font Selector is written in SCSS and strictly typed TypeScript.

**See Demo**: http://fontselector.cilb.de

## Getting started

Create your select element like you are used to it. Add the font URL as a data attribute to each option:
```html
<select id="my-font-select">
    <option value="Open Sans" data-font-url="./fonts/OpenSans-Regular.ttf">Open Sans</option>
</select>
```

Please mind: If you store the URLs on some different host than the host of your website, CORS headers need to be set correctly.

Now add the CSS to your HTML head...

```html
<head>
    <link rel="stylesheet" type="text/css" href="font-selector/styles.css" />
</head>
```

... and add the JavaScript Code at the bottom of your body:

```html
<script type="text/javascript">
    new FontSelector('#my-font-select');
</script>
```

That's all!

## Options

You can pass an options object to the second argument of the FontSelector constructor to change class names or listen to events:
- wrapperClassName: string
- dropdownClassName: string
- dropdownSelectedFontClassName: string
- dropdownSelectedFontNameClassName: string
- dropdownFontListClassName: string
- isExpandedClassName: string
- onExpanded: Function
- onSelected: Function
- onCollapsed: Function

## Build

- run `npm install` to install dependencies
- run `npm run dev` to build JS and CSS in development mode once
- run `npm run watch` to build JS and CSS in development mode each time a source file has been changed
- run `npm run build` to build JS and CSS in production mode (minified)

