<p align="center"><img src="https://s21.postimg.org/6ak2pw1l3/laptop.png" width="220px" height="250px"></p>

# Javascript-eCommerce-Module
A javascript module to handle the products, services and filter that appears on each page. So basically insteaded of setting some HTML-Markups and running a foreach loop to display all of your products/services, you will simply set a server-side script that returns a an array of json products/services objects. Do note that it wont work if javascript is not activated on the user browser so under rare circumstancesit as the one Ive just mentioned it wont work.


### Install
import the script eCommerce.js to your files project.

### Configuration

#### Configure the eCommerce:
- components - define the components you will need.
```javascript
	var shop = new eCommerce({
		components: ['Products', 'Services', 'Filter', 'Pagination', 'Cart']
	});
```

#### Configure the Products:
- element - what DOM element should it be bound to.
- class - the class name for each product element.
- item_class - the class to apply on each product frame.
- add_button_class - the class to apply on the add to cart button.
- favorite_button_class - the class to apply on the favorite button.
- width - the fixed width of each product item.
- height - the fixed height of each product item.
- attributes - to be explicit, only attributes names you specify will be showen inside of a product frame.
- url - the server side url to fetch the products from.
```javascript
shop.Products.setup({
	element: '.products',
	class: 'col-xs-10',
	item_class: 'col-xs-3',
	add_button_class: 'btn btn-primary',
	favorite_button_class: 'btn btn-danger',
	width: '200px',
	height: '280px',
	attributes: ['name', 'price', 'deliveryTime', 'image'],
	url: 'products.php',
});
```
#### Configure the Pagination:
- element - what DOM element should it be bound to.
- class - the class name for each product element.
- per_page - the amount of items you would like to display per page.
- total_items - the total amount of items.
```javascript
shop.Pagination.setup({
	element: '.pagination-links',
	class: 'col-xs-offset-4 col-xs-8',
	per_page: 5,
	total_items: 10
});
```
#### Configure the Pagination:
- element - what DOM element should it be bound to.
- class - the class name for each product element.
```javascript
shop.Filter.setup({
	element: '.filter',
	class: 'col-xs-2',
});
```

#### Configure the Cart:
- element - what DOM element should it be bound to.
- cookie_name - the name of the cookie.
- placement - the place where you want to cart icon to apear(available options: 'left-top', 'right-top').
- hover_color - the color when going over the cart icon with the mouse.
```javascript
shop.Cart.setup({
	element: '.cart',
	cookie_name: 'cart',
	placement: 'right-top',
	hover_color: 'orange'
});
```

## Events
If you want to run something after the products are loaded into the container you may use AfterLoaded callback:
```javascript
eCommerce.Products.AfterLoaded = function(product) {
	// run something after the products has been loaded.
};
```
