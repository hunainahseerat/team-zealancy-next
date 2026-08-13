<?php
/**
 * Custom REST API Endpoints for Zealancy Plugin
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('rest_api_init', function () {
    $namespace = 'zealancy/v1';

    // 1. Jobs Endpoints
    register_rest_route($namespace, '/jobs', array(
        array(
            'methods'             => 'GET',
            'callback'            => 'zealancy_api_get_jobs',
            'permission_callback' => '__return_true',
        ),
        array(
            'methods'             => 'POST',
            'callback'            => 'zealancy_api_create_job',
            'permission_callback' => '__return_true',
        ),
    ));

    register_rest_route($namespace, '/jobs/(?P<id>\d+)', array(
        array(
            'methods'             => 'PUT',
            'callback'            => 'zealancy_api_update_job',
            'permission_callback' => '__return_true',
        ),
        array(
            'methods'             => 'DELETE',
            'callback'            => 'zealancy_api_delete_job',
            'permission_callback' => '__return_true',
        ),
    ));

    // 2. Applications Endpoints
    register_rest_route($namespace, '/applications', array(
        array(
            'methods'             => 'GET',
            'callback'            => 'zealancy_api_get_applications',
            'permission_callback' => '__return_true',
        ),
    ));

    register_rest_route($namespace, '/applications/(?P<id>\d+)', array(
        array(
            'methods'             => 'PUT',
            'callback'            => 'zealancy_api_update_application',
            'permission_callback' => '__return_true',
        ),
        array(
            'methods'             => 'DELETE',
            'callback'            => 'zealancy_api_delete_application',
            'permission_callback' => '__return_true',
        ),
    ));

    // 3. Team Endpoint
    register_rest_route($namespace, '/team', array(
        'methods'             => 'GET',
        'callback'            => 'zealancy_api_get_team',
        'permission_callback' => '__return_true',
    ));

    // 4. Content Endpoint (FAQ, Steps, Benefits, Hero words)
    register_rest_route($namespace, '/content', array(
        'methods'             => 'GET',
        'callback'            => 'zealancy_api_get_content',
        'permission_callback' => '__return_true',
    ));

    // 5. Settings Endpoint
    register_rest_route($namespace, '/settings', array(
        'methods'             => 'GET',
        'callback'            => 'zealancy_api_get_settings',
        'permission_callback' => '__return_true',
    ));

    // 6. Application Submit Endpoint (public POST + file upload)
    register_rest_route($namespace, '/apply', array(
        'methods'             => 'POST',
        'callback'            => 'zealancy_api_submit_application',
        'permission_callback' => '__return_true',
    ));
});

// ------------------------------------------------------------------
// Jobs Callbacks
// ------------------------------------------------------------------
function zealancy_api_get_jobs() {
    $posts = get_posts(array(
        'post_type'      => 'zealancy_job',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    ));

    $data = array();
    foreach ($posts as $p) {
        $data[] = array(
            'id'          => (string) $p->ID,
            'title'       => $p->post_title,
            'department'  => get_post_meta($p->ID, '_zealancy_department', true) ?: 'Video Production',
            'type'        => get_post_meta($p->ID, '_zealancy_type', true) ?: 'Full-time',
            'mode'        => get_post_meta($p->ID, '_zealancy_mode', true) ?: 'Remote',
            'experience'  => get_post_meta($p->ID, '_zealancy_experience', true) ?: '1+ year',
            'description' => $p->post_content,
            'status'      => get_post_meta($p->ID, '_zealancy_status', true) ?: 'active',
            'isUrgent'    => (bool) get_post_meta($p->ID, '_zealancy_is_urgent', true),
            'urgentLabel' => get_post_meta($p->ID, '_zealancy_urgent_label', true) ?: '',
            'postedAt'    => get_the_date('c', $p->ID),
            'updatedAt'   => get_the_modified_date('c', $p->ID),
        );
    }
    return rest_ensure_response($data);
}

function zealancy_api_create_job($request) {
    $params = $request->get_json_params();
    $title  = sanitize_text_field($params['title'] ?? 'New Role');
    $desc   = wp_kses_post($params['description'] ?? '');

    $post_id = wp_insert_post(array(
        'post_title'   => $title,
        'post_content' => $desc,
        'post_type'    => 'zealancy_job',
        'post_status'  => 'publish',
    ));

    if (is_wp_error($post_id)) {
        return new WP_Error('job_create_failed', 'Failed to create job', array('status' => 500));
    }

    update_post_meta($post_id, '_zealancy_department', sanitize_text_field($params['department'] ?? 'Video Production'));
    update_post_meta($post_id, '_zealancy_type', sanitize_text_field($params['type'] ?? 'Full-time'));
    update_post_meta($post_id, '_zealancy_mode', sanitize_text_field($params['mode'] ?? 'Remote'));
    update_post_meta($post_id, '_zealancy_experience', sanitize_text_field($params['experience'] ?? '1+ year'));
    update_post_meta($post_id, '_zealancy_status', sanitize_text_field($params['status'] ?? 'active'));
    update_post_meta($post_id, '_zealancy_is_urgent', !empty($params['isUrgent']) ? 1 : 0);
    update_post_meta($post_id, '_zealancy_urgent_label', sanitize_text_field($params['urgentLabel'] ?? ''));

    return rest_ensure_response(array('id' => (string) $post_id, 'message' => 'Job created successfully'));
}

function zealancy_api_update_job($request) {
    $id     = $request['id'];
    $params = $request->get_json_params();

    if (!get_post($id)) {
        return new WP_Error('job_not_found', 'Job not found', array('status' => 404));
    }

    if (!empty($params['title'])) {
        wp_update_post(array('ID' => $id, 'post_title' => sanitize_text_field($params['title'])));
    }
    if (isset($params['description'])) {
        wp_update_post(array('ID' => $id, 'post_content' => wp_kses_post($params['description'])));
    }

    if (isset($params['department'])) update_post_meta($id, '_zealancy_department', sanitize_text_field($params['department']));
    if (isset($params['type'])) update_post_meta($id, '_zealancy_type', sanitize_text_field($params['type']));
    if (isset($params['mode'])) update_post_meta($id, '_zealancy_mode', sanitize_text_field($params['mode']));
    if (isset($params['experience'])) update_post_meta($id, '_zealancy_experience', sanitize_text_field($params['experience']));
    if (isset($params['status'])) update_post_meta($id, '_zealancy_status', sanitize_text_field($params['status']));
    if (isset($params['isUrgent'])) update_post_meta($id, '_zealancy_is_urgent', $params['isUrgent'] ? 1 : 0);
    if (isset($params['urgentLabel'])) update_post_meta($id, '_zealancy_urgent_label', sanitize_text_field($params['urgentLabel']));

    return rest_ensure_response(array('id' => (string) $id, 'message' => 'Job updated successfully'));
}

function zealancy_api_delete_job($request) {
    $id = $request['id'];
    wp_delete_post($id, true);
    return rest_ensure_response(array('message' => 'Job deleted successfully'));
}

// ------------------------------------------------------------------
// Applications Callbacks
// ------------------------------------------------------------------
function zealancy_api_get_applications() {
    $posts = get_posts(array(
        'post_type'      => 'zealancy_application',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    ));

    $data = array();
    foreach ($posts as $p) {
        $data[] = array(
            'id'             => (string) $p->ID,
            'jobId'          => get_post_meta($p->ID, '_zealancy_job_id', true) ?: '',
            'jobTitle'       => get_post_meta($p->ID, '_zealancy_job_title', true) ?: '',
            'fullName'       => get_post_meta($p->ID, '_zealancy_full_name', true) ?: '',
            'email'          => get_post_meta($p->ID, '_zealancy_email', true) ?: '',
            'phone'          => get_post_meta($p->ID, '_zealancy_phone', true) ?: '',
            'linkedin'       => get_post_meta($p->ID, '_zealancy_linkedin', true) ?: '',
            'portfolio'      => get_post_meta($p->ID, '_zealancy_portfolio', true) ?: '',
            'coverLetter'    => get_post_meta($p->ID, '_zealancy_cover_letter', true) ?: '',
            'resumeFileName' => get_post_meta($p->ID, '_zealancy_resume_file_name', true) ?: 'Resume.pdf',
            'resumeFileUrl'  => get_post_meta($p->ID, '_zealancy_resume_file_url', true) ?: '',
            'status'         => get_post_meta($p->ID, '_zealancy_status', true) ?: 'new',
            'submittedAt'    => get_the_date('c', $p->ID),
            'notes'          => get_post_meta($p->ID, '_zealancy_notes', true) ?: '',
        );
    }
    return rest_ensure_response($data);
}

function zealancy_api_update_application($request) {
    $id     = $request['id'];
    $params = $request->get_json_params();

    if (isset($params['status'])) update_post_meta($id, '_zealancy_status', sanitize_text_field($params['status']));
    if (isset($params['notes'])) update_post_meta($id, '_zealancy_notes', sanitize_textarea_field($params['notes']));

    return rest_ensure_response(array('id' => (string) $id, 'message' => 'Application updated'));
}

function zealancy_api_delete_application($request) {
    $id = $request['id'];
    wp_delete_post($id, true);
    return rest_ensure_response(array('message' => 'Application deleted'));
}

// ------------------------------------------------------------------
// Team Callback
// ------------------------------------------------------------------
function zealancy_api_get_team() {
    $team = get_option('zealancy_team_members', null);
    if ($team === null) {
        $team = array(
            array('id' => 'team-1', 'name' => 'Zain Ul Abideen', 'role' => 'Founder & Creative Director', 'bio' => 'Led creative for channels pulling 3.2B+ views.', 'order' => 1, 'isVisible' => true),
            array('id' => 'team-2', 'name' => 'Mahnoor Siddiqui', 'role' => 'Head of Post-Production', 'bio' => 'Five years of long-form video editing experience.', 'order' => 2, 'isVisible' => true),
            array('id' => 'team-3', 'name' => 'Faisal Rehman', 'role' => 'Senior Graphic Designer', 'bio' => 'Designs high CTR thumbnails for top channels.', 'order' => 3, 'isVisible' => true),
        );
    }
    return rest_ensure_response($team);
}

// ------------------------------------------------------------------
// Content Callback
// ------------------------------------------------------------------
function zealancy_api_get_content() {
    return rest_ensure_response(array(
        'faq'         => get_option('zealancy_faq', array()),
        'hiringSteps' => get_option('zealancy_hiring_steps', array()),
        'benefits'    => get_option('zealancy_benefits', array()),
        'heroWords'   => get_option('zealancy_hero_words', array()),
    ));
}

// ------------------------------------------------------------------
// Settings Callback
// ------------------------------------------------------------------
function zealancy_api_get_settings() {
    return rest_ensure_response(array(
        'siteName'           => get_option('blogname', 'Team Zealancy'),
        'tagline'            => get_option('blogdescription', 'Make content for the top 1% of creators.'),
        'contactEmail'       => get_option('zealancy_contact_email', 'careers@teamzealancy.com'),
        'whatsappNumber'     => get_option('zealancy_whatsapp', '+923001234567'),
        'isOpenToWork'       => get_option('zealancy_is_open_to_work', '1') === '1',
    ));
}

// ------------------------------------------------------------------
// Submit Application Callback (Form Data + File Upload)
// ------------------------------------------------------------------
function zealancy_api_submit_application($request) {
    $params = $request->get_params();

    $full_name    = sanitize_text_field($params['fullName'] ?? '');
    $email        = sanitize_email($params['email'] ?? '');
    $phone        = sanitize_text_field($params['phone'] ?? '');
    $job_title    = sanitize_text_field($params['position'] ?? 'General Application');
    $linkedin     = esc_url_raw($params['linkedin'] ?? '');
    $portfolio    = esc_url_raw($params['portfolio'] ?? '');
    $cover_letter = sanitize_textarea_field($params['coverLetter'] ?? '');

    if (empty($full_name) || empty($email) || empty($phone)) {
        return new WP_Error('missing_fields', 'Required fields missing', array('status' => 400));
    }

    // Process file upload (Resume PDF/DOCX)
    $resume_url  = '';
    $resume_name = '';
    if (!empty($_FILES['resume'])) {
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/media.php');
        require_once(ABSPATH . 'wp-admin/includes/image.php');

        $file         = $_FILES['resume'];
        $uploaded_file = wp_handle_upload($file, array('test_form' => false));

        if (isset($uploaded_file['url'])) {
            $resume_url  = $uploaded_file['url'];
            $resume_name = sanitize_file_name($file['name']);
        }
    }

    // Insert Application CPT post
    $post_id = wp_insert_post(array(
        'post_title'   => sprintf('%s — %s', $full_name, $job_title),
        'post_content' => $cover_letter,
        'post_type'    => 'zealancy_application',
        'post_status'  => 'publish',
    ));

    if (is_wp_error($post_id)) {
        return new WP_Error('app_submit_failed', 'Failed to save application', array('status' => 500));
    }

    // Store meta fields
    update_post_meta($post_id, '_zealancy_full_name', $full_name);
    update_post_meta($post_id, '_zealancy_email', $email);
    update_post_meta($post_id, '_zealancy_phone', $phone);
    update_post_meta($post_id, '_zealancy_job_title', $job_title);
    update_post_meta($post_id, '_zealancy_linkedin', $linkedin);
    update_post_meta($post_id, '_zealancy_portfolio', $portfolio);
    update_post_meta($post_id, '_zealancy_cover_letter', $cover_letter);
    update_post_meta($post_id, '_zealancy_resume_file_url', $resume_url);
    update_post_meta($post_id, '_zealancy_resume_file_name', $resume_name);
    update_post_meta($post_id, '_zealancy_status', 'new');

    // Trigger Email and Discord notifications
    zealancy_trigger_application_notifications($post_id, array(
        'full_name'       => $full_name,
        'email'           => $email,
        'phone'           => $phone,
        'job_title'       => $job_title,
        'linkedin'        => $linkedin,
        'portfolio'       => $portfolio,
        'cover_letter'    => $cover_letter,
        'resume_file_url' => $resume_url,
    ));

    return rest_ensure_response(array(
        'success' => true,
        'message' => 'Application submitted successfully',
        'id'      => (string) $post_id,
    ));
}
