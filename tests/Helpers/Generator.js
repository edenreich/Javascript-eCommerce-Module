
class Generator
{
	static products(length)
	{
		let i;
		let products = [];

		for(i = 1; i <= length; i++) {
			let product = {};

			product.name = 'Example Product ' + i;
			product.price = Math.floor(Math.random() * 1100);
			product.deliveryTime = Math.floor(Math.random() * 10) + ' days';
			product.image = 'images/' + i + '.jpg';

			products.push(product);
		}

		return products;
	}
}

export default Generator;