import { fixture, assert, html, nextFrame } from '@open-wc/testing';
import '../response-highlighter.js';

describe('<response-highlighter>', function() {
  async function basicFixture() {
    return (await fixture(`<response-highlighter></response-highlighter>`));
  }

  async function responseFixture() {
    let txt = 'Some test text to be displayed in the raw viewer\n';
    txt += 'Some test text to be displayed in the raw viewer\n';
    txt += 'Some test text to be displayed in the raw viewer\n';
    txt += 'Some test text to be displayed in the raw viewer\n';
    txt += 'Some test text to be displayed in the raw viewer\n';
    return (await fixture(html`<response-highlighter .responseText="${txt}" contenttype="text/plain"></response-highlighter>`));
  }

  async function contentActionsFixture() {
    return (await fixture(`<response-highlighter>
      <paper-icon-button slot="content-action"></paper-icon-button>
      <paper-icon-button></paper-icon-button>
    </response-highlighter>`));
  }

  describe('_actionsPanelClass', () => {
    it('returns hidden class when no response', async () => {
      const element = await basicFixture();
      const result = element._actionsPanelClass;
      assert.equal(result, 'actions-panel hidden');
    });

    it('returns base class when response', async () => {
      const element = await responseFixture();
      const result = element._actionsPanelClass;
      assert.equal(result, 'actions-panel');
    });
  });

  describe('content actions', () => {
    it('has distributed nodes', async () => {
      const element = await contentActionsFixture();
      const slot = element.shadowRoot.querySelector('slot[name="content-action"]');
      const buttons = slot.assignedNodes();
      assert.equal(buttons.length, 1);
    });

    it('actions are hidden when no response', async () => {
      const element = await basicFixture();
      const node = element.shadowRoot.querySelector('.actions-panel');
      const result = getComputedStyle(node).display.trim();
      assert.equal(result, 'none');
    });

    it('actions are visible when response', async () => {
      const element = await contentActionsFixture();
      element.responseText = 'test';
      await nextFrame();
      const node = element.shadowRoot.querySelector('.actions-panel');
      const result = getComputedStyle(node).display.trim();
      assert.notEqual(result, 'none');
    });
  });

  describe('basic', () => {
    it('renders empty message when no response', async () => {
      const element = await basicFixture();
      const node = element.shadowRoot.querySelector('.no-info');
      assert.ok(node);
    });

    it('renders code output when response', async () => {
      const element = await responseFixture();
      const node = element.shadowRoot.querySelector('prism-highlight');
      assert.ok(node);
    });

    it('returns value for lang property', async () => {
      const element = await responseFixture();
      assert.equal(element.lang, 'text/plain');
    });
  });

  describe('_computeLang()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
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
