<?php
/**
 * Template Name: Amenities Page
 *
 * */

$context = Timber::get_context();

$post = new TimberPost();
$context['post'] = $post;

Timber::render( array( 'pages/amenities.twig', 'pages/page.twig' ), $context );
