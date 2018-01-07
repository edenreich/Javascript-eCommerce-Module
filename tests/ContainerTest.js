
import Window from 'window';
import {assert} from 'chai';
import Container from '../src/Core/Container.js';

describe('ContainerTest', function() {

	beforeEach(function() {	
		const window = new Window();
		global.document = window.document;
		document.body.innerHTML = `<div class="products"></div>
					   <div class="filter"></div>
					   <div class="pagination-links"></div>`;
	});
	
	it('binds an instance to the container and able to retrieve it later', function() {
		let container = new Container;
		let dummyObject = new DummyObject;

		container.setInstance('DummyObject', dummyObject);
		
		let instance = container.getInstance('DummyObject');

		assert.typeOf(instance, 'object');
		assert.ok(container.instanceExist('DummyObject'));
	});

	it('binds dependencies to the container correctly', function() {

		let container = new Container;

		container.bind('Foo', function() {
			return new DummyObject(new DummyDependency);
		});

		let instance = container.make('Foo');

		assert.typeOf(instance, 'object');
		assert.typeOf(instance.dependency, 'object');
		assert.equal(instance.dependency.constructor.name, 'DummyDependency');
	});
});


class DummyDependency
{
	constructor()
	{
		//
	}
}

class DummyObject 
{
	constructor(dummyDependency)
	{
		this.dependency = dummyDependency;
	}
}
