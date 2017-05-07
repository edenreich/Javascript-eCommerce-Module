<?php

// for demonstrate purposes I created simple 3 pages. In real case senario you would fetch those records from the database.

$products = [];

if($_GET['page'] == 1) {
	$products = [
		['name' => 'Example Product 1', 'price' => 100.00, 'deliveryTime' => '6 days'],
		['name' => 'Example Product 2', 'price' => 120.00, 'deliveryTime' => '6 days'],
		['name' => 'Example Product 3', 'price' => 105.00, 'deliveryTime' => '6 days'],
		['name' => 'Example Product 4', 'price' => 105.00, 'deliveryTime' => '6 days'],
		['name' => 'Example Product 5', 'price' => 105.00, 'deliveryTime' => '6 days'],
	];

	echo json_encode($products);
	return;
} else if($_GET['page'] == 2) {
	$products = [
		['name' => 'Example Product 6', 'price' => 100.00, 'deliveryTime' => '6 days'],
		['name' => 'Example Product 7', 'price' => 120.00, 'deliveryTime' => '6 days'],
		['name' => 'Example Product 8', 'price' => 105.00, 'deliveryTime' => '6 days'],
		['name' => 'Example Product 9', 'price' => 105.00, 'deliveryTime' => '6 days'],
		['name' => 'Example Product 10', 'price' => 105.00, 'deliveryTime' => '6 days'],
	];

	echo json_encode($products);
	return;
} else if($_GET['page'] == 3) {
	$products = [
		['name' => 'Example Product 11', 'price' => 100.00, 'deliveryTime' => '6 days'],
		['name' => 'Example Product 12', 'price' => 120.00, 'deliveryTime' => '6 days'],
		['name' => 'Example Product 13', 'price' => 105.00, 'deliveryTime' => '6 days'],
		['name' => 'Example Product 14', 'price' => 105.00, 'deliveryTime' => '6 days'],
		['name' => 'Example Product 15', 'price' => 105.00, 'deliveryTime' => '6 days'],
	];

	echo json_encode($products);
}
