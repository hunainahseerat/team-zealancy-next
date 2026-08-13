<?php
/**
 * Zealancy Headless Theme Functions
 */

if (!defined('ABSPATH')) {
    exit;
}

// Enable theme features
add_action('after_setup_theme', function () {
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
});

// Enable CORS headers for Next.js frontend during development & production
add_action('init', function () {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce");
});
