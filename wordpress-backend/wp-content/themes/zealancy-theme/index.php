<?php
/**
 * Zealancy Headless Theme Index
 * Redirects visitors to the Next.js frontend or WP Admin.
 */
$frontend_url = defined('ZEALANCY_FRONTEND_URL') ? ZEALANCY_FRONTEND_URL : 'http://localhost:3000';
wp_redirect($frontend_url);
exit;
