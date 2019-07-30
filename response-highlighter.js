/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@advanced-rest-client/prism-highlight/prism-highlight.js';
/**
 * An element that parses the HTTP response and displays highlighted result.
 *
 * It splits the response by line (by default it's 500) and if the response has
 * more than that it shows only first 500 lines and the user can request to
 * display the rest or next 500 lines. This is to make the element work faster.
 * If the response is very long it may take some time to parse and tokenize it.
 * Control number of lines by setting the maxRead attribute.
 *
 * ### Example
 *
 * ```html
 * <response-highlighter></response-highlighter>
 * ```
 * ```javascript
 * const display = document.querySelector('response-highlighter');
 * display.responseText = someJsonResponse;
 * display.contentType = 'application/json';
 * ```
 *
 * ## Content actions
 *
 * Child elements added to light DOM with slot name `content-action` are rendered
 * in actions container. It is a way to render additional actions related to
 * the response text.
 *
 * ### Example
 *
 * ```html
 * <response-highlighter>
 *  <paper-icon-button title="Additional action" icon="arc:cached"></paper-icon-button>
 *  <paper-icon-button title="Clear the code" icon="arc:clear"></paper-icon-button>
 * </response-highlighter>
 * ```
 *
 * See demo for more information.
 *
 * ## Changes in version 2
 *
 * - Custom search has been removed from the element.
 *
 * ### Styling
 *
 * `<response-highlighter>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--response-highlighter` | Mixin applied to the element | `{}`
 * `--response-highlighter-action-bar` | Mixin applied to the action bar above the highlighted code | `{}`
 * `--no-info-message` | Mixin applied to the "nothing to display" message (theme variable) | `{}`
 *
 * See prism-highlight element for more styling options.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof UiElements
 */
class ResponseHighlighter extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
    }

    .actions-panel {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .actions-panel.hidden {
      display: none;
    }

    .no-info {
      color: var(--empty-info-color, rgba(0, 0, 0, 0.74));
      font-size: var(--empty-info-fonr-size, 16px);
    }

    [hidden] {
      display: none !important;
    }
    </style>
    <div class\$="[[_computeActionsPanelClass(hasResponse)]]">
      <slot name="content-action"></slot>
    </div>
    <prism-highlight hidden\$="[[!hasResponse]]" code="[[responseText]]" lang\$="[[lang]]"></prism-highlight>
    <p class="no-info" hidden\$="[[hasResponse]]">Nothing to display.</p>`;
  }

  static get is() {
    return 'response-highlighter';
  }

  static get properties() {
    return {
      /**
       * The response text to display.
       */
      responseText: String,
      // Computed value, true if the responseText has text.
      hasResponse: {
        type: Boolean,
        value: false,
        computed: '_computeHasResponse(responseText)'
      },
      /**
       * Response content type.
       * It will be used to determine which syntaxt highlighter to use.
       */
      contentType: String,
      /**
       * The lang property for the Prism.
       */
      lang: {
        type: String,
        computed: '_computeLang(contentType)'
      }
    };
  }
  // Computes if the element has the response data.
  _computeHasResponse(responseText) {
    return !!responseText;
  }
  // Computes CSS class for the content actions pane.
  _computeActionsPanelClass(hasResponse) {
    let clazz = 'actions-panel';
    if (!hasResponse) {
      clazz += ' hidden';
    }
    return clazz;
  }
  /**
   * Computes a `lang` property for the Prism from the response content-type.
   *
   * @param {String} contentType
   * @return {String}
   */
  _computeLang(contentType) {
    if (!contentType || !contentType.indexOf) {
      return undefined;
    }
    if (contentType.indexOf(';') !== -1) {
      return contentType.split(';')[0];
    }
    return contentType;
  }
}
window.customElements.define(ResponseHighlighter.is, ResponseHighlighter);
