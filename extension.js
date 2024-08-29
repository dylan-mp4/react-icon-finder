const vscode = require('vscode');
const { getAllIcons } = require('./iconHelper');
const ReactDOMServer = require('react-dom/server');

function activate(context) {
  const disposable = vscode.commands.registerCommand('react-icon-finder.findIcons', function () {
    const panel = vscode.window.createWebviewPanel(
      'reactIconFinder',
      'React Icon Finder',
      vscode.ViewColumn.One,
      {
        enableScripts: true
      }
    );

    panel.webview.html = getWebviewContent();

    panel.webview.onDidReceiveMessage(
      message => {
        const importStatement = message.icon;
        vscode.env.clipboard.writeText(importStatement).then(() => {
          vscode.window.showInformationMessage('Import statement copied to clipboard: ' + importStatement);
        });
      },
      undefined,
      context.subscriptions
    );
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

function getWebviewContent() {
  const icons = getAllIcons();
  const iconHtml = icons.map(icon => {
    const iconSvg = ReactDOMServer.renderToString(icon.component({}));
    return `<div class="icon" data-icon="${icon.name}" data-package="${icon.packageName}" data-name="${icon.name.toLowerCase()}">${iconSvg}</div>`;
  }).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>React Icon Finder</title>
      <style>
        .icon { cursor: pointer; padding: 10px; display: inline-block; }
        .icon svg { width: 50px; height: 50px; }
        #search { margin-bottom: 20px; padding: 10px; width: 100%; box-sizing: border-box; }
        #pagination { margin-top: 20px; }
        .page { cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; margin: 0 5px; display: inline-block; }
      </style>
    </head>
    <body>
      <input type="text" id="search" placeholder="Search icons..." />
      <div id="icons">${iconHtml}</div>
      <div id="pagination"></div>
      <script>
        const vscode = acquireVsCodeApi();
        const searchInput = document.getElementById('search');
        const icons = Array.from(document.querySelectorAll('.icon'));
        const pagination = document.getElementById('pagination');
        const iconsPerPage = 300;
        let currentPage = 1;
        let filteredIcons = icons;

        function renderIcons(page, iconsToRender) {
          const start = (page - 1) * iconsPerPage;
          const end = start + iconsPerPage;
          icons.forEach(icon => icon.style.display = 'none');
          iconsToRender.slice(start, end).forEach(icon => icon.style.display = 'inline-block');

        function renderPagination(totalIcons) {
          const totalPages = Math.ceil(totalIcons / iconsPerPage);
          pagination.innerHTML = '';
          for (let i = 1; i <= totalPages; i++) {
            const pageElement = document.createElement('span');
            pageElement.textContent = i;
            pageElement.className = 'page';
            pageElement.addEventListener('click', () => {
              currentPage = i;
              renderIcons(currentPage, filteredIcons);
            });
            pagination.appendChild(pageElement);
          }
        }

        searchInput.addEventListener('input', () => {
          const query = searchInput.value.toLowerCase();
          filteredIcons = icons.filter(icon => {
            const name = icon.getAttribute('data-name');
            return name.includes(query);
          });
          renderPagination(filteredIcons.length);
          currentPage = 1;
          renderIcons(currentPage, filteredIcons);
        });

        icons.forEach(icon => {
          icon.addEventListener('click', () => {
            const iconName = icon.getAttribute('data-icon');
            const iconPackage = icon.getAttribute('data-package');
            const importStatement = \`import { \${iconName} } from 'react-icons/\${iconPackage}';\`;
            vscode.postMessage({ icon: importStatement });
          });
        });

        renderPagination(icons.length);
        renderIcons(currentPage, icons);
      </script>
    </body>
    </html>
  `;
}

module.exports = {
  activate,
  deactivate
};