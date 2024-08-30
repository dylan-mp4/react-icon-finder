const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const ReactDOMServer = require('react-dom/server');
const { getAllIcons } = require('./iconHelper.js');

async function activate(context) {
  const disposable = vscode.commands.registerCommand('react-icon-finder.findIcons', async function () {
    const panel = vscode.window.createWebviewPanel(
      'reactIconFinder',
      'React Icon Finder',
      vscode.ViewColumn.One,
      {
        enableScripts: true
      }
    );

    const htmlPath = path.join(context.extensionPath, 'webview.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    panel.webview.html = htmlContent;

    const icons = await getAllIcons();
    const iconHtml = icons.map(icon => {
      const iconSvg = ReactDOMServer.renderToString(icon.component({}));
      return `<div class="icon" data-icon="${icon.name}" data-package="${icon.packageName}" data-name="${icon.name.toLowerCase()}">${iconSvg}</div>`;
    }).join('');

    panel.webview.postMessage({ icons: iconHtml });

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

module.exports = {
  activate,
  deactivate
};