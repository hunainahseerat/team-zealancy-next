<?php
/**
 * Register Custom Post Types for Zealancy Careers
 */

if (!defined('ABSPATH')) {
    exit;
}

function zealancy_register_post_types() {
    // 1. Jobs CPT
    $job_labels = array(
        'name'               => 'Jobs',
        'singular_name'      => 'Job',
        'add_new'            => 'Add New Job',
        'add_new_item'       => 'Add New Job',
        'edit_item'          => 'Edit Job',
        'new_item'           => 'New Job',
        'all_items'          => 'All Jobs',
        'view_item'          => 'View Job',
        'search_items'       => 'Search Jobs',
        'not_found'          => 'No jobs found',
        'menu_name'          => 'Zealancy Jobs',
    );

    $job_args = array(
        'labels'             => $job_labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'jobs'),
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-portfolio',
        'supports'           => array('title', 'editor', 'custom-fields'),
        'show_in_rest'       => true,
    );

    register_post_type('zealancy_job', $job_args);

    // 2. Applications CPT
    $app_labels = array(
        'name'               => 'Applications',
        'singular_name'      => 'Application',
        'add_new'            => 'Add New Application',
        'add_new_item'       => 'Add Application',
        'edit_item'          => 'View Application',
        'new_item'           => 'New Application',
        'all_items'          => 'Applications',
        'view_item'          => 'View Application',
        'search_items'       => 'Search Applications',
        'not_found'          => 'No applications found',
        'menu_name'          => 'Applications',
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
        'menu_icon'          => 'dashicons-id',
        'supports'           => array('title', 'custom-fields'),
        'show_in_rest'       => true,
    );

    register_post_type('zealancy_application', $app_args);
}

add_action('init', 'zealancy_register_post_types');
