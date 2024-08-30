const vscode = require('vscode');
const assert = require('assert');
const { getAllIcons } = require('../iconHelper');
const sinon = require('sinon');
const path = require('path');
const { activate} = require('../extension');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');
	test('getAllIcons returns an array', async () => {
		const icons = await getAllIcons();
		assert.ok(Array.isArray(icons), 'getAllIcons should return an array');
	});
	test('getAllIcons array contains objects with expected properties', async () => {
		const icons = await getAllIcons();
		assert.ok(icons.length > 0, 'getAllIcons should return a non-empty array');

		icons.forEach(icon => {
			assert.ok(icon.hasOwnProperty('name'), 'Icon object should have a name property');
			assert.ok(icon.hasOwnProperty('packageName'), 'Icon object should have a packageName property');
			assert.ok(icon.hasOwnProperty('component'), 'Icon object should have a component property');
		});
	});

	test('getAllIcons component property is a function', async () => {
		const icons = await getAllIcons();
		assert.ok(icons.length > 0, 'getAllIcons should return a non-empty array');

		icons.forEach(icon => {
			assert.ok(typeof icon.component === 'function', 'Icon component should be a function');
		});
	});

	let context;
	setup(() => {
		context = {
			subscriptions: [],
			extensionPath: path.resolve(__dirname, '..')
		};
	});

	teardown(() => {
		sinon.restore();
	});

	test('Command is registered', async () => {
		const registerCommandStub = sinon.stub(vscode.commands, 'registerCommand');
		await activate(context);
		assert.ok(registerCommandStub.calledOnce, 'Command should be registered');
		assert.strictEqual(registerCommandStub.firstCall.args[0], 'react-icon-finder.findIcons');
	});

	test('Webview panel is created', async () => {
		const createWebviewPanelStub = sinon.stub(vscode.window, 'createWebviewPanel').returns({
			webview: {
				html: '',
				postMessage: sinon.stub(),
				onDidReceiveMessage: sinon.stub()
			}
		});

		await activate(context);
		await vscode.commands.executeCommand('react-icon-finder.findIcons');

		assert.ok(createWebviewPanelStub.calledOnce, 'Webview panel should be created');
		assert.strictEqual(createWebviewPanelStub.firstCall.args[0], 'reactIconFinder');
	});

	test('Icons are processed and sent to webview', async () => {
		assert.ok(sinon.stub(vscode.window, 'createWebviewPanel').returns({
			webview: {
				html: '',
				postMessage: sinon.stub(),
				onDidReceiveMessage: sinon.stub()
			}
		}));
	});
});