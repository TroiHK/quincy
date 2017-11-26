<?php
/**
 * The Template for displaying all single posts
 *
 *
 * @package    Studio
 * @subpackage Timber
 * @since      Timber 0.1
 */

$context = Timber::get_context();
$post = Timber::query_post();
$context['post'] = $post;

$units = [];

$engrain_ap_id = get_field('floorplan_id');
$engrain_pro_id = get_field('property_id');

if ( $engrain_ap_id && $engrain_pro_id ) {
	$units = engrain::get_units($engrain_pro_id, $engrain_ap_id);
}

$unset_keys = [];
$min_price = '';

$sort = array();
foreach ($units as $key => $unit) {

	$sort['id'][$key] = $unit['id'];
	$sort['available_on'][$key] = strtotime($unit['available_on']);
	
}
array_multisort($sort['available_on'], SORT_ASC, $sort['id'], SORT_ASC,$units);

foreach ($units as $key => $unit) {

	if (!$unit['available_on'] ) {
		$unset_keys[] = $key;
	} elseif ($unit['price']) {
		$min_price = !$min_price ? $unit['price'] : ( $unit['price'] < $min_price ? $unit['price'] : $min_price );
	}
}

// echo "<pre>";
// print_r($units);die();

foreach ($unset_keys as $value) {
	unset($units[$value]);
}
if ($units) {
	$context['units'] = $units;
}

$context['min_price'] = $min_price;

Timber::render( array( 'pages/single-floorplan-items.twig', 'pages/single.twig' ), $context );
