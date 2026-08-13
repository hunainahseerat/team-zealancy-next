<?php
/**
 * Register Custom Fields & Meta for Zealancy Plugin
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', function () {
    // ------------------------------------------------------------------
    // Job Post Meta
    // ------------------------------------------------------------------
    $job_meta_fields = array(
        '_zealancy_department'   => 'string',
        '_zealancy_type'         => 'string',
        '_zealancy_mode'         => 'string',
        '_zealancy_experience'   => 'string',
        '_zealancy_status'       => 'string',
        '_zealancy_is_urgent'    => 'boolean',
        '_zealancy_urgent_label' => 'string',
    );

    foreach ($job_meta_fields as $meta_key => $type) {
        register_post_meta('zealancy_job', $meta_key, array(
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ));
    }

    // ------------------------------------------------------------------
    // Application Post Meta
    // ------------------------------------------------------------------
    $app_meta_fields = array(
        '_zealancy_job_id'           => 'string',
        '_zealancy_job_title'        => 'string',
        '_zealancy_full_name'        => 'string',
        '_zealancy_email'            => 'string',
        '_zealancy_phone'            => 'string',
        '_zealancy_linkedin'         => 'string',
        '_zealancy_portfolio'        => 'string',
        '_zealancy_cover_letter'     => 'string',
        '_zealancy_resume_file_url'  => 'string',
        '_zealancy_resume_file_name' => 'string',
        '_zealancy_status'           => 'string',
        '_zealancy_notes'            => 'string',
    );

    foreach ($app_meta_fields as $meta_key => $type) {
        register_post_meta('zealancy_application', $meta_key, array(
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $type,
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ));
    }
});
