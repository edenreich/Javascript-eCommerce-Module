<?php

// for demonstrate purposes I created simple 3 pages. In real case senario you would fetch those records from the database.

$products = [];

if (isset($_GET['page'])) {
	switch ($_GET['page']) {
		case '1':
			$products = json_decode(file_get_contents('../data/products_page_one.json'), true);
			break;
		case '2':
			$products = json_decode(file_get_contents('../data/products_page_two.json'), true);
			break;
		case '3':
			$products = json_decode(file_get_contents('../data/products_page_three.json'), true);
			break;
		default:
			$products = json_decode(file_get_contents('../data/products_all.json'), true);
			break;
	}

} else {
	$products = json_decode(file_get_contents('../data/products_all.json'), true);
}

echo json_encode($products);