<?php
/**
 * Template Name: Gallery Page
 *
 * */

$context = Timber::get_context();

$post = new TimberPost();
$context['post'] = $post;

Timber::render( array( 'pages/gallery.twig', 'pages/page.twig' ), $context );
