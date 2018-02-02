
import TurboEcommerce from '../../src/TurboEcommerce.js';

class Shop
{
	static load()
	{
		var shop = new TurboEcommerce({
			debug_level: 'error',
			class: 'col-xs-12',
			element: '.turbo-ecommerce',
			inject_libraries: ['bootstrap'],
			components: ['Products', 'Services', 'Filter', 'Cart', 'Pagination', 'Checkout'],
			loading_animation: true,
			no_css: false,
		});

		return shop;
	}
}

export default Shop;