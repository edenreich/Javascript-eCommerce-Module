<p align="center"><img src="https://s21.postimg.org/6ak2pw1l3/laptop.png" width="220px" height="250px"></p>

# Javascript-eCommerce-Module
A super fast Webshop built with Vanila-Javascript(everything is loaded with Ajax). This module is there for handling the common components that are needed for runing a Webshop(Products, Services, Filter, Cart, Checkout, Pagination etc..).


### Install
Import the script demo/bundle.min.js to your files project.

or

1) run in the command line: ```npm install turbo-ecommerce```
2) run ```./node_modules/bin/turbo-ecommerce publish```

### Configuration

#### Configure the eCommerce:
- debug_level - the level of debuging('info', 'warning', 'error').
- element - what DOM element should it be bound to.
- inject_libraries - inject a specific external library from a list of libraries(atm only bootstrap, to be extended).
- components - define the components you will need.
```javascript
var shop = new TurboeCommerce({
	debug_level: 'info',
	element: 'body',
	inject_libraries: ['bootstrap'],
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
- attributes - to be explicit, only attributes names you specify will be showen inside of each product frame.
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
#### Configure the Filter:
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
- class - the class to apply to the preview cart icon.
- width - the width to apply to the preview cart icon.
- height - the height to apply to the preview cart icon.
- preview_class - the class to apply to the preview cart box.
- loader - the source/path to the loader you wish to be used.
- placement - the place where you want to cart icon to apear(available options: 'left-top', 'right-top').
- hover_color - the color when going over the cart icon with the mouse.
- page - the page where you want to display your cart.
```javascript
shop.Cart.setup({
	element: '.cart',
	cookie_name: 'cart',
	class: '',
	width: '60px',
	height: '60px',
	preview_class: '',
	loader: '/images/icons/spinner.svg',
	placement: 'right-top',
	fixed: true,
	hover_color: 'orange'
	page: 'path/to/the/cart/page.php'
});
```

#### Configure the Checkout:
upcomming...
```javascript
shop.Checkout.setup({
	
});
```

#### Configure the Services:
upcomming...will be slightly different from Products
```javascript
shop.Services.setup({
	
});
```

#### Configure the Filter:
upcomming...
```javascript
shop.Filter.setup({
	
});
```


## Events
You can also subscribe to events that will be published at certain point and time.

When products are loading your callback will be executed with a product object:
```javascript
shop.Events.subscribe('products.loading', function(product) {
	// handle event
};
```

When products are loaded your callback will be executed with a products object:
```javascript
shop.Events.subscribe('products.loaded', function(products) {
	// handle event
};
```

When product has been added to the cart your callback will be executed with the attributes of the product:
```javascript
shop.Events.subscribe('cart.products.added', function(attributes) {
	// handle event
};
```