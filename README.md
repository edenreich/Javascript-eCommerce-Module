<p align="center"><img src="https://s21.postimg.org/6ak2pw1l3/laptop.png" width="220px" height="250px"></p>

# Javascript-eCommerce-Module
A javascript module to handle the products, services and filter that appears on each page. So basically insteaded of setting some HTML-Markups and running a foreach loop to display all of your products/services, you will simply set a server-side script that returns a an array of json products/services objects. Do note that it wont work if javascript is not activated on the user browser so under rare circumstancesit as the one Ive just mentioned it wont work.


### Install
import the script eCommerce.js to your files project.

### Configuration

#### Configure the eCommerce:
- components - define the components you will need.
```javascript
	eCommerce.Settings({
		components: ['Products', 'Services', 'Filter', 'Pagination'],
	});
```

#### Configure the Products:
- element - what DOM element should it be bound to.
- class - the class name for each product element.
- width - the fixed width of each product item.
- height - the fixed height of each product item.
- attributes - to be explicit, only attributes names you specify will be showen inside of a product item.
```javascript
eCommerce.Products.Settings({
	element: '.products',
	class: 'col-xs-3',
	width: '200px',
	height: '280px',
	attributes: ['name', 'price', 'deliveryTime', 'image'],
	url: 'products.php',
});
```
#### Configure the Pagination:
- element - what DOM element should it be bound to.
- class - the class name for each product element.
```javascript
eCommerce.Pagination.Settings({
	element: '.pagination-links',
	class: 'col-xs-offset-4 col-xs-10',
});
```

If you want to run something after the products are loaded into the container you may use AfterLoaded callback:
```javascript
eCommerce.Products.AfterLoaded = function(product) {
	// run something after the products has been loaded.
};
```
