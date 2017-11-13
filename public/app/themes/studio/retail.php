<?php
/**
 * Template Name: Retail Page
 *
 * */

$context = Timber::get_context();

$post = new TimberPost();
$context['post'] = $post;

Timber::render( array( 'pages/retail.twig', 'pages/page.twig' ), $context );
