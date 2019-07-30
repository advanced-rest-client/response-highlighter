import { fixture, assert } from '@open-wc/testing';
import '../response-highlighter.js';

describe('<response-highlighter>', function() {
  async function basicFixture() {
    return (await fixture(`<response-highlighter paginate></response-highlighter>`));
  }

  async function contentActionsFixture() {
    return (await fixture(`<response-highlighter>
      <paper-icon-button slot="content-action"></paper-icon-button>
      <paper-icon-button></paper-icon-button>
    </response-highlighter>`));
  }

  describe('basic', () => {
    let xml;
    let element;
    before(async () => {
      const response = await fetch('test.xml');
      xml = await response.text();
    });

    beforeEach(async () => {
      element = await basicFixture();
      element.responseText = xml;
      element.contentType = 'application/xml';
    });

    it('Set hasResponse to true', () => {
      assert.isTrue(element.hasResponse);
    });

    it('Content actions pane is visible', () => {
      const pane = element.shadowRoot.querySelector('.actions-panel');
      assert.isFalse(pane.classList.contains('hidden'));
    });
  });

  describe('content actions', () => {
    let element;
    beforeEach(async () => {
      element = await contentActionsFixture();
    });

    it('Renders content action', () => {
      const slot = element.shadowRoot.querySelector('slot[name="content-action"]');
      const buttons = slot.assignedNodes();
      assert.equal(buttons.length, 1);
    });
  });

  describe('Content type', () => {
    let element;
    beforeEach(async () => {
      element = await contentActionsFixture();
    });

    it('Computes content type with charset', () => {
      const result = element._computeLang('application/json; charsert=utf8');
      assert.equal(result, 'application/json');
    });

    it('Returns the same content type', () => {
      const result = element._computeLang('application/json');
      assert.equal(result, 'application/json');
    });

    it('Returns undefined when no argument', () => {
      const result = element._computeLang();
      assert.isUndefined(result);
    });

    it('Returns undefined when not a string', () => {
      const result = element._computeLang(13);
      assert.isUndefined(result);
    });
  });
});
