<?php

/**
 * Directory containing all of the site's files.
 *
 * @var string
 */
$root_dir = dirname(__DIR__);

/**
 * Document root.
 *
 * @var string
 */
$webroot_dir = $root_dir . '/public';

/**
 * Expose global env() function from oscarotero/env.
 */
Env::init();

/**
 * Use Dotenv to set required environment variables and load .env file in root.
 */
$dotenv = new Dotenv\Dotenv($root_dir);
if (file_exists($root_dir . '/.env')) {
    $dotenv->load();
    $dotenv->required(['DB_DATABASE', 'DB_USERNAME', 'DB_PASSWORD', 'WP_HOME']);
}

/**
 * Environment
 */
define('WP_ENV', env('WP_ENV'));

/**
 * URLs
 */
define('WP_HOME', env('WP_HOME'));
define('WP_SITEURL', WP_HOME . '/wp');

/**
 * Custom Content Directory
 */
define('CONTENT_DIR', '/app');
define('WP_CONTENT_DIR', $webroot_dir . CONTENT_DIR);
define('WP_CONTENT_URL', WP_HOME . CONTENT_DIR);

/**
 * DB settings
 */
define('DB_NAME', env('DB_DATABASE'));
define('DB_USER', env('DB_USERNAME'));
define('DB_PASSWORD', env('DB_PASSWORD'));
define('DB_HOST', env('DB_HOST') ?: 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');
$table_prefix = env('DB_PREFIX') ?: 'wp_';

/**
 * Authentication Unique Keys and Salts
 */
define('AUTH_KEY', env('AUTH_KEY'));
define('SECURE_AUTH_KEY', env('SECURE_AUTH_KEY'));
define('LOGGED_IN_KEY', env('LOGGED_IN_KEY'));
define('NONCE_KEY', env('NONCE_KEY'));
define('AUTH_SALT', env('AUTH_SALT'));
define('SECURE_AUTH_SALT', env('SECURE_AUTH_SALT'));
define('LOGGED_IN_SALT', env('LOGGED_IN_SALT'));
define('NONCE_SALT', env('NONCE_SALT'));

/**
 * Debugging
 */
define('WP_DEBUG', env('WP_DEBUG') ?: false);
define('SAVEQUERIES', env('WP_DEBUG') ?: false);
define('SCRIPT_DEBUG', env('WP_DEBUG') ?: false);
define('WP_DEBUG_DISPLAY', env('WP_DEBUG_DISPLAY') ?: true);
define('WP_DEBUG_LOG', env('WP_DEBUG_LOG') ?: false);

/**
 * Custom Settings
 */
define('DISALLOW_FILE_MODS', true);
define('AUTOMATIC_UPDATER_DISABLED', true);
define('DISABLE_WP_CRON', env('DISABLE_WP_CRON') ?: true);

/**
 * Bootstrap WordPress
 */
if (!defined('ABSPATH')) {
    define('ABSPATH', $webroot_dir . '/wp/');
}
