[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/response-highlighter.svg)](https://www.npmjs.com/package/@advanced-rest-client/response-highlighter)

[![Build Status](https://travis-ci.org/advanced-rest-client/response-highlighter.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/response-highlighter)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/response-highlighter)

## &lt;response-highlighter&gt;

An element that parses the HTTP response and displays highlighted result.


```html
<response-highlighter response-text="# Hello world" content-type="application/markdown"></response-highlighter>
```

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

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
    <response-highlighter></response-highlighter>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement, html} from '@polymer/polymer';
import '@advanced-rest-client/response-highlighter/response-highlighter.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <response-highlighter></response-highlighter>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

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
