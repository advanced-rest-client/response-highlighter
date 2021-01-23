# &lt;response-highlighter&gt;

An element that parses the HTTP response and displays highlighted result.

```html
<response-highlighter response-text="# Hello world" content-type="application/markdown"></response-highlighter>
```

## Deprecation notice

This component is deprecated. Use `@advanced-rest-client/arc-response` instead.

## Usage

### Installation
```
npm install --save @advanced-rest-client/response-highlighter
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@advanced-rest-client/response-highlighter/response-highlighter.js';
    </script>
  </head>
  <body>
    <response-highlighter responsetext="Plain text" contenttype="text/plain"></response-highlighter>
  </body>
</html>
```

### In a LitElement

```js
import { LitElement, html } from 'lit-element';
import '@advanced-rest-client/response-highlighter/response-highlighter.js';

class SampleElement extends PolymerElement {
  render() {
    return html`
    <response-highlighter
      .responseText="${this.response}"
      .contentType="${this.contentType}"></response-highlighter>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

## Development

```sh
git clone https://github.com/advanced-rest-client/response-highlighter
cd response-highlighter
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests
```sh
npm test
```

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)
