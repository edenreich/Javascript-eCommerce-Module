<!DOCTYPE html>
<html>
<head>
	<title>eCommerce Module</title>
	<script type="text/javascript" src="../src/eCommerce.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<h1 class="col-xs-offset-1">eCommerce</h1>
<hr>

<div class="filter"></div>
<div class="products"></div>
<nav class="pagination-links"></nav>

<?php 
	
	$products = json_encode([
		['name' => 'Example Product 1', 'price' => 100.00, 'deliveryTime' => '6 days'],
		['name' => 'Example Product 2', 'price' => 120.00, 'deliveryTime' => '6 days'],
		['name' => 'Example Product 3', 'price' => 105.00, 'deliveryTime' => '6 days'],
		['name' => 'Example Product 4', 'price' => 105.00, 'deliveryTime' => '6 days'],
		['name' => 'Example Product 5', 'price' => 105.00, 'deliveryTime' => '6 days'],
	]); 

?>
<script type="text/javascript">
	(function(eCommerce){

		var eCommerce = new eCommerce;
		
		eCommerce.Settings({
			require: ['Products', 'Services', 'Filter']
		});

		eCommerce.Products.Settings({
			bindProductsTo: '.products',
			bindLinksTo: '.pagination-links',
			containerClass: 'col-xs-9',
			itemClass: 'col-xs-3',
			paginationClass: 'col-xs-offset-4 col-xs-10',
			width: '200px',
			height: '280px',
			attributes: ['name', 'price', 'deliveryTime', 'image'],
			url: 'products.php',
			initStaticData: <?php echo $products ?>
		});

		eCommerce.Products.AfterLoaded = function (product) {
			// run something after the products has been loaded.
		};

		eCommerce.Filter.Settings({
			bindTo: '.filter',
			class: 'col-xs-3',
			width: '',
			height: '',
		});

	})(eCommerce);
</script>
</body>
</html>