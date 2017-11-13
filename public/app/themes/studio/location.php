<?php
/**
 * Template Name: Location Page
 *
 * */

$context = Timber::get_context();

$post = new TimberPost();
$context['post'] = $post;

Timber::render( array( 'pages/location.twig', 'pages/page.twig' ), $context );
