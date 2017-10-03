<?php

// for demonstrate purposes I created simple 3 pages. In real case senario you would fetch those records from the database.

$products = [];

if(isset($_GET['page']) && $_GET['page'] == 1) {
	$products = [
		[
			'name' => 'Example Product 1', 
			'price' => 100.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/1.jpg'
		],
		[
			'name' => 'Example Product 2', 
			'price' => 120.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/2.jpg'
		],
		[
			'name' => 'Example Product 3', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/3.jpg'
		],
		[
			'name' => 'Example Product 4', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/4.jpg'
		],
		[
			'name' => 'Example Product 5', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/5.jpg'
		],
	];

	echo json_encode($products);
} elseif(isset($_GET['page']) && $_GET['page'] == 2) {
	$products = [
		[
			'name' => 'Example Product 6', 
			'price' => 100.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/6.jpg'
		],
		[
			'name' => 'Example Product 7', 
			'price' => 120.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/7.jpg'
		],
		[
			'name' => 'Example Product 8', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/8.jpg'
		],
		[
			'name' => 'Example Product 9', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/9.jpg'
		],
		[
			'name' => 'Example Product 10', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/10.jpg'
		],
	];

	echo json_encode($products);
} elseif(isset($_GET['page']) && $_GET['page'] == 3) {
	$products = [
		[
			'name' => 'Example Product 11', 
			'price' => 100.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/11.jpg'
		],
		[
			'name' => 'Example Product 12', 
			'price' => 120.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/12.jpg'
		],
		[
			'name' => 'Example Product 13', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/13.jpg'
		],
		[
			'name' => 'Example Product 14', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/14.jpg'
		],
		[
			'name' => 'Example Product 15', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/15.jpg'
		],
	];

	echo json_encode($products);
} else {
	$products = [
		[
			'name' => 'Example Product 1', 
			'price' => 100.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/1.jpg'
		],
		[
			'name' => 'Example Product 2', 
			'price' => 120.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/2.jpg'
		],
		[
			'name' => 'Example Product 3', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/3.jpg'
		],
		[
			'name' => 'Example Product 4', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/4.jpg'
		],
		[
			'name' => 'Example Product 5', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/5.jpg'
		],
		[
			'name' => 'Example Product 6', 
			'price' => 100.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/6.jpg'
		],
		[
			'name' => 'Example Product 7', 
			'price' => 120.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/7.jpg'
		],
		[
			'name' => 'Example Product 8', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/8.jpg'
		],
		[
			'name' => 'Example Product 9', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/9.jpg'
		],
		[
			'name' => 'Example Product 10', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/10.jpg'
		],
		[
			'name' => 'Example Product 11', 
			'price' => 100.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/11.jpg'
		],
		[
			'name' => 'Example Product 12', 
			'price' => 120.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/12.jpg'
		],
		[
			'name' => 'Example Product 13', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/13.jpg'
		],
		[
			'name' => 'Example Product 14', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/14.jpg'
		],
		[
			'name' => 'Example Product 15', 
			'price' => 105.00, 
			'deliveryTime' => '6 days',
			'image' => 'images/15.jpg'
		],
	];

	echo json_encode($products);
}
