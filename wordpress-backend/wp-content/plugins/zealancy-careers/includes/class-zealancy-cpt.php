<?php
/**
 * Zealancy CPT Handler Class
 * Conforms to WordPress Coding Standards
 */

if (!defined('ABSPATH')) {
    exit;
}

class Zealancy_CPT {

    public static function init() {
        add_action('init', array(__CLASS__, 'register_post_types'));
    }

    public static function register_post_types() {
        // 1. Jobs CPT
        $job_labels = array(
            'name'               => _x('Jobs', 'post type general name', 'zealancy-careers'),
            'singular_name'      => _x('Job', 'post type singular name', 'zealancy-careers'),
            'menu_name'          => _x('Zealancy Careers', 'admin menu', 'zealancy-careers'),
            'name_admin_bar'     => _x('Job', 'add new on admin bar', 'zealancy-careers'),
            'add_new'            => _x('Add New Job', 'job', 'zealancy-careers'),
            'add_new_item'       => __('Add New Job', 'zealancy-careers'),
            'new_item'           => __('New Job', 'zealancy-careers'),
            'edit_item'          => __('Edit Job', 'zealancy-careers'),
            'view_item'          => __('View Job', 'zealancy-careers'),
            'all_items'          => __('All Jobs', 'zealancy-careers'),
            'search_items'       => __('Search Jobs', 'zealancy-careers'),
            'not_found'          => __('No jobs found.', 'zealancy-careers'),
            'not_found_in_trash' => __('No jobs found in Trash.', 'zealancy-careers'),
        );

        $job_args = array(
            'labels'             => $job_labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => array('slug' => 'careers/roles'),
            'capability_type'    => 'post',
            'has_archive'        => false,
            'hierarchical'       => false,
            'menu_position'      => 6,
            'menu_icon'          => 'dashicons-briefcase',
            'supports'           => array('title', 'editor', 'custom-fields', 'revisions'),
            'show_in_rest'       => true,
        );

        register_post_type('zealancy_job', $job_args);

        // 2. Applications CPT
        $app_labels = array(
            'name'               => _x('Applications', 'post type general name', 'zealancy-careers'),
            'singular_name'      => _x('Application', 'post type singular name', 'zealancy-careers'),
            'menu_name'          => _x('Applications', 'admin menu', 'zealancy-careers'),
            'add_new'            => _x('Add Application', 'application', 'zealancy-careers'),
            'add_new_item'       => __('Add New Application', 'zealancy-careers'),
            'edit_item'          => __('View Application', 'zealancy-careers'),
            'view_item'          => __('View Application', 'zealancy-careers'),
            'all_items'          => __('Applications', 'zealancy-careers'),
            'search_items'       => __('Search Applications', 'zealancy-careers'),
            'not_found'          => __('No applications received yet.', 'zealancy-careers'),
            'not_found_in_trash' => __('No applications in Trash.', 'zealancy-careers'),
        );

        $app_args = array(
            'labels'             => $app_labels,
            'public'             => false,
            'publicly_queryable' => false,
            'show_ui'            => true,
            'show_in_menu'       => 'edit.php?post_type=zealancy_job',
            'capability_type'    => 'post',
            'has_archive'        => false,
            'hierarchical'       => false,
            'menu_icon'          => 'dashicons-id-alt',
            'supports'           => array('title', 'custom-fields'),
            'show_in_rest'       => true,
        );

        register_post_type('zealancy_application', $app_args);
    }
}
