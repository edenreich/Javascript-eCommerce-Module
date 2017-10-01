
import Window from 'window';
import {assert} from 'chai';
import DOM from '../src/Helpers/DOM.js';

describe('DomHelperTest', function() {

	beforeEach(function() {	
		global.window = new Window();
		global.document = window.document;
		document.body.innerHTML = `<div class="test-class" id="testId"></div>`;
	});
	
	it('should fetch an element from the DOM', function() {
		let element1 = DOM.element('.test-class');
		let element2 = DOM.element('.none-existing-element');
		let element3 = DOM.element('#testId');

		assert.instanceOf(element1, window.HTMLDivElement);
		assert.isNull(element2);
		assert.isNotNull(element3);
	});

	it('should add a style tag if not already exists', function() {
		let css = `
			.element {
				position: absolute;
				display: block;
			}
		`;

		DOM.addStyle('style-tag-id', css);

		let styleTag = document.querySelector('#style-tag-id');

		assert.instanceOf(styleTag, window.HTMLStyleElement, '#style-tag-id is a style tag element');
		assert.equal(styleTag.innerHTML, '.element {position: absolute;display: block;}', 'css properties are minfied and exists');
	});

	it('should add a class to the element', function() {
		let element = document.querySelector('div');
		let dynamicElement = document.createElement('div');

		DOM.addClass(element, 'another-test-class');
		DOM.addClass(dynamicElement, 'test-class');

		assert.equal(element.className, 'test-class another-test-class');
		assert.equal(dynamicElement.className, 'test-class');
	});

	it('should remove a class from an element', function() {
		let element = document.querySelector('div');

		DOM.removeClass(element, 'test-class');
		DOM.removeClass(element, 'test-class');

		assert.equal(element.className, '');
	});

	it('should switch between class names', function() {
		let element = document.querySelector('div');

		DOM.switchClasses(element, 'test-class', 'some other-class');

		assert.equal('some other-class', element.className);
	});

	it('should create an element with a given attributes', function() {
		let element = DOM.createElement('div', {
			class: 'some-class',
			id: 'someId'
		});

		assert.instanceOf(element, window.HTMLDivElement);
		assert.equal(element.className, 'some-class');
		assert.equal(element.getAttribute('id'), 'someId');
	});

});