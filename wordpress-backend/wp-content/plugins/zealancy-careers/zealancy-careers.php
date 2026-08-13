<?php
/**
 * Plugin Name: Zealancy Careers & CMS
 * Plugin URI: https://teamzealancy.com
 * Description: Production-grade WordPress backend plugin for Team Zealancy Next.js frontend. Manages CPTs, REST API endpoints, candidate applications, resume uploads, email alerts, and Discord webhooks.
 * Version: 1.0.0
 * Author: Team Zealancy
 * Author URI: https://teamzealancy.com
 * Text Domain: zealancy-careers
 * Requires at least: 5.8
 * Requires PHP: 7.4
 * License: GPLv2 or later
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Define Plugin Constants
define('ZEALANCY_VERSION', '1.0.0');
define('ZEALANCY_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('ZEALANCY_PLUGIN_URL', plugin_dir_url(__FILE__));
define('ZEALANCY_PLUGIN_BASENAME', plugin_basename(__FILE__));

// Require Core Class Files
require_once ZEALANCY_PLUGIN_DIR . 'includes/class-zealancy-cpt.php';
require_once ZEALANCY_PLUGIN_DIR . 'includes/class-zealancy-meta.php';
require_once ZEALANCY_PLUGIN_DIR . 'includes/class-zealancy-uploader.php';
require_once ZEALANCY_PLUGIN_DIR . 'includes/class-zealancy-notifications.php';
require_once ZEALANCY_PLUGIN_DIR . 'includes/class-zealancy-rest-api.php';
require_once ZEALANCY_PLUGIN_DIR . 'includes/class-zealancy-admin.php';

/**
 * Initialize Plugin Architecture
 */
function zealancy_careers_init() {
    Zealancy_CPT::init();
    Zealancy_Meta::init();
    Zealancy_REST_API::init();
    Zealancy_Admin::init();
}
add_action('plugins_loaded', 'zealancy_careers_init');

/**
 * Activation Hook
 */
register_activation_hook(__FILE__, function () {
    Zealancy_CPT::register_post_types();
    flush_rewrite_rules();

    // Create custom uploads folder for secure resume storage
    $upload_dir = wp_upload_dir();
    $resume_dir = $upload_dir['basedir'] . '/zealancy-resumes';
    if (!file_exists($resume_dir)) {
        wp_mkdir_p($resume_dir);
        // Add index.php to prevent directory listing on shared hosting like Hostinger
        file_put_contents($resume_dir . '/index.php', '<?php // Silence is golden.');
    }
});

/**
 * Deactivation Hook
 */
register_deactivation_hook(__FILE__, function () {
    flush_rewrite_rules();
});
