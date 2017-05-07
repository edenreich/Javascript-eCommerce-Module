<p align="center"><img src="https://s21.postimg.org/6ak2pw1l3/laptop.png" width="220px" height="250px"></p>

# Javascript-eCommerce-Module
A javascript module to handle the products, services and filter that appears on each page. So basically insteaded of setting some HTML-Markups and running a foreach loop to display all of your products/services, you will simply pass this module an array of objects that you fetched from the database and bind it to a specific DOM Element. Do note that it wont work if javascript is not activated on the user browser so under rare circumstancesit as the one Ive just mentioned it wont work.


### Install
import the script eCommerce.js to your files project.
and make sure you include it in your 

### Configuration

#### Configure the eCommerce:
- cartSessionId - if you want to give each cart a specific id.
- require - property to define what kind of modules you will need.
```javascript
	eCommerce.Settings({
		require: ['Products', 'Services', 'Filter'],
	});
```

#### Configure the Products:
- bindTo - what DOM element should serve as the products container.
- itemClass - the class name for each product element.
- width - the fixed width of each product item.
- height - the fixed height of each product item.
- only - to be explicit, only property names you specify will be showen inside of a product item.
```javascript
eCommerce.Products.Settings({
	bindProductsTo: '.products',
	bindLinksTo: '.pagination-links',
	itemClass: 'col-xs-3',
	width: '200px',
	height: '250px',
	only: ['name', 'price', 'deliveryTime'],
	fetchFrom: 'products.php',
});
```
if you are using an MVC you might want just to pass the items like so:
```javascript
// the products you passed to the view
var productItems = [
	{name: 'Example Product', price: '10.00', deliveryTime: '3 days'},
	{name: 'Example Product 2', price: '10.00', deliveryTime: '3 days'}
];

eCommerce.Products.Items(productItems);
```
