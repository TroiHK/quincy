<?php
/**
 * Template Name: Sightmap Page
 *
 * */

$context = Timber::get_context();

$post = new TimberPost();
$context['post'] = $post;

Timber::render( array( 'pages/sightmap.twig', 'pages/page.twig' ), $context );
