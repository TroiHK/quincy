<?php
/*
Plugin Name:  Mail Settings 
Plugin URI:   https://engrain.com/
Description:  Configure PHPMailer based on environment variables.
Version:      1.0.0
Author:       Engrain, Inc
Author URI:   https://engrain.com/
License:      MIT License
*/

add_action( 'phpmailer_init', 'mail_configure_phpmailer', 1 );
add_filter('wp_mail_from', 'mail_configure_default_mail_from', 1);

function mail_configure_phpmailer( $phpmailer ) {
    $driver = env('MAIL_DRIVER') ?: 'mail';

    $drivers = [
      'smtp' => ['enabler' => 'isSMTP'],
      'mail' => ['enabler' => 'isMail'],
      'qmail' => ['enabler' => 'isQmail'],
      'sendmail' => ['enabler' => 'isSendmail']
    ];

    call_user_func([$phpmailer, $drivers[$driver]['enabler']]);

    $phpmailer->Host = env('MAIL_HOST') ?: 'localhost';
    $phpmailer->Username = env('MAIL_USERNAME') ?: '';
    $phpmailer->Password = env('MAIL_PASSWORD') ?: '';
    $phpmailer->Port = env('MAIL_PORT') ?: 25;

    $phpmailer->SMTPAuth = true;
    $phpmailer->SMTPSecure = env('MAIL_ENCRYPTION') ?: '';
}

function mail_configure_default_mail_from( $phpmailer ) {
    return 'noreply@engrain.com';
}
