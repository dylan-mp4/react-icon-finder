const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
const { getAllIcons } = require('../iconHelper');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');
		test('getAllIcons array', () => {
			const icons = getAllIcons();
			assert.ok(Array.isArray(icons), 'getAllIcons should return an array');
		});
		test('getAllIcons length', () => {
			const icons = getAllIcons();
			assert.ok(icons.length > 0, 'getAllIcons should return a non-empty array');
		});
		test('getAllIcons name', () => {
			const icons = getAllIcons();
			assert.ok(icons[0].name, 'Each icon should have a name');
		});
		test('getAllIcons packageName', () => {
			const icons = getAllIcons();
			assert.ok(icons[0].packageName, 'Each icon should have a packageName');
		});
		test('getAllIcons component', () => {
			const icons = getAllIcons();
			assert.ok(icons[0].component, 'Each icon should have a component');
		});

});
