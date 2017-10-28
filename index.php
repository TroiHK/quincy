<?php 

/**
 * The document root is the public directory, which the application bootstraps
 * from. If you have a development environment where the application is served 
 * within a sub-directory of another host (ie localhost), this file merely 
 * redirects the browser to the document root.
 *
 * In a production environment, this file is uneccessary and SHOULD NOT be used. 
 * A production enviornment's host settings should set the document root to 
 * point to the application's public directory.
 */

header('Location: ' . $_SERVER['REQUEST_URI'] . 'public');
