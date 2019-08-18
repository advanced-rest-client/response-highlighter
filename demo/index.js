import '@advanced-rest-client/arc-demo-helper/arc-demo-helper.js';
import '@polymer/paper-toast/paper-toast.js';
import '@anypoint-web-components/anypoint-input/anypoint-input.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import '@anypoint-web-components/anypoint-styles/colors.js';
import '../response-highlighter.js';

let url = '/demo/index.html';

async function download(url) {
  const opts = {
    method: 'GET',
    mode: 'cors'
  };
  const response = await fetch(url, opts);
  const ct = response.headers.get('content-type');
  const text = await response.text();
  const node = document.querySelector('response-highlighter');
  node.responseText = text;
  node.contentType = ct;
}

document.getElementById('urlInput').addEventListener('input', (e) => {
  url = e.target.value;
});

document.getElementById('download').addEventListener('click', () => {
  download(url);
});

document.getElementById('actionClick').addEventListener('click', () => {
  document.querySelector('paper-toast').opened = true;
});

document.getElementById('clearButton').addEventListener('click', () => {
  const node = document.querySelector('response-highlighter');
  node.responseText = undefined;
  node.contentType = undefined;
});
