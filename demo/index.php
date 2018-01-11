<!DOCTYPE html>
<html>
<head>
	<title>Turbo-eCommerce Module</title>
	<script type="text/javascript" src="/js/bundle.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<h2 class="col-xs-offset-1"><a href="/">Turbo-eCommerce</a></h2>
<hr>

<div class="cart"></div>
<div class="filter"></div>
<div class="products"></div>
<nav class="pagination-links"></nav>

<script type="text/javascript">
	(function(TurboeCommerce) {

		var shop = new TurboeCommerce({
			components: ['Products', 'Services', 'Filter', 'Cart', 'Pagination']
		});

		shop.Products.setup({
			element: '.products',
			class: 'col-xs-10',
			item_class: 'col-xs-2',
			add_button_class: 'btn btn-primary',
			favorite_button_class: 'btn btn-danger',
			width: '200px',
			height: '280px',
			attributes: ['name', 'price', 'deliveryTime', 'image'],
			url: 'products.php',
		});

		shop.Pagination.setup({
			element: '.pagination-links',
			class: 'col-xs-offset-4 col-xs-8',
			per_page: 5,
			total_items: 15,
		});

		shop.Events.subscribe('products.loading', function(product) {
			// handle products while loading.
		});

		shop.Events.subscribe('products.loaded', function(products) {
			// handle products after loaded.
		});
		

		shop.Filter.setup({
			element: '.filter',
			class: 'col-xs-2',
		});

		shop.Cart.setup({
			element: '.cart',
			cookie_name: 'cart',
			placement: 'right-top',
			hover_color: 'orange'
		});

	})(TurboeCommerce);
</script>
</body>
</html>