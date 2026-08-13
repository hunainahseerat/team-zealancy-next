<?php
/**
 * Zealancy REST API Engine Class
 * Registers endpoints with sanitization, validation, & permission callbacks
 */

if (!defined('ABSPATH')) {
    exit;
}

class Zealancy_REST_API {

    private static $namespace = 'zealancy/v1';

    public static function init() {
        add_action('rest_api_init', array(__CLASS__, 'register_routes'));
    }

    public static function register_routes() {
        // 1. Jobs Endpoints
        register_rest_route(self::$namespace, '/jobs', array(
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array(__CLASS__, 'get_jobs'),
                'permission_callback' => '__return_true',
            ),
            array(
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => array(__CLASS__, 'create_job'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
            ),
        ));

        register_rest_route(self::$namespace, '/jobs/(?P<id>\d+)', array(
            array(
                'methods'             => WP_REST_Server::EDITABLE,
                'callback'            => array(__CLASS__, 'update_job'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
            ),
            array(
                'methods'             => WP_REST_Server::DELETABLE,
                'callback'            => array(__CLASS__, 'delete_job'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
            ),
        ));

        // 2. Applications Endpoints
        register_rest_route(self::$namespace, '/applications', array(
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array(__CLASS__, 'get_applications'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
            ),
        ));

        register_rest_route(self::$namespace, '/applications/(?P<id>\d+)', array(
            array(
                'methods'             => WP_REST_Server::EDITABLE,
                'callback'            => array(__CLASS__, 'update_application'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
            ),
            array(
                'methods'             => WP_REST_Server::DELETABLE,
                'callback'            => array(__CLASS__, 'delete_application'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
            ),
        ));

        // 3. Team Endpoints
        register_rest_route(self::$namespace, '/team', array(
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array(__CLASS__, 'get_team'),
                'permission_callback' => '__return_true',
            ),
            array(
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => array(__CLASS__, 'update_team'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
            ),
        ));

        // 4. Website Content Endpoint (FAQ, Steps, Benefits, Hero words)
        register_rest_route(self::$namespace, '/content', array(
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array(__CLASS__, 'get_content'),
                'permission_callback' => '__return_true',
            ),
            array(
                'methods'             => WP_REST_Server::EDITABLE,
                'callback'            => array(__CLASS__, 'update_content'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
            ),
        ));

        // 5. Settings Endpoint
        register_rest_route(self::$namespace, '/settings', array(
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array(__CLASS__, 'get_settings'),
                'permission_callback' => '__return_true',
            ),
            array(
                'methods'             => WP_REST_Server::EDITABLE,
                'callback'            => array(__CLASS__, 'update_settings'),
                'permission_callback' => array(__CLASS__, 'check_admin_permission'),
            ),
        ));

        // 6. Public Submit Application Endpoint (POST + Multipart Resume Upload)
        register_rest_route(self::$namespace, '/apply', array(
            array(
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => array(__CLASS__, 'submit_application'),
                'permission_callback' => '__return_true',
            ),
        ));
    }

    /**
     * Permission check callback for protected admin actions
     */
    public static function check_admin_permission() {
        return current_user_can('edit_posts') || current_user_can('manage_options');
    }

    // ------------------------------------------------------------------
    // Jobs Callbacks
    // ------------------------------------------------------------------
    public static function get_jobs() {
        $posts = get_posts(array(
            'post_type'      => 'zealancy_job',
            'posts_per_page' => -1,
            'post_status'    => 'publish',
        ));

        $data = array();
        foreach ($posts as $p) {
            $data[] = array(
                'id'          => (string) $p->ID,
                'title'       => get_the_title($p->ID),
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

    public static function create_job(WP_REST_Request $request) {
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
            return new WP_Error('job_create_failed', __('Failed to create job post.', 'zealancy-careers'), array('status' => 500));
        }

        update_post_meta($post_id, '_zealancy_department', sanitize_text_field($params['department'] ?? 'Video Production'));
        update_post_meta($post_id, '_zealancy_type', sanitize_text_field($params['type'] ?? 'Full-time'));
        update_post_meta($post_id, '_zealancy_mode', sanitize_text_field($params['mode'] ?? 'Remote'));
        update_post_meta($post_id, '_zealancy_experience', sanitize_text_field($params['experience'] ?? '1+ year'));
        update_post_meta($post_id, '_zealancy_status', sanitize_text_field($params['status'] ?? 'active'));
        update_post_meta($post_id, '_zealancy_is_urgent', !empty($params['isUrgent']) ? '1' : '0');
        update_post_meta($post_id, '_zealancy_urgent_label', sanitize_text_field($params['urgentLabel'] ?? ''));

        return rest_ensure_response(array('id' => (string) $post_id, 'message' => 'Job created successfully'));
    }

    public static function update_job(WP_REST_Request $request) {
        $id     = (int) $request['id'];
        $params = $request->get_json_params();

        if (!get_post($id)) {
            return new WP_Error('job_not_found', __('Job not found.', 'zealancy-careers'), array('status' => 404));
        }

        if (!empty($params['title'])) wp_update_post(array('ID' => $id, 'post_title' => sanitize_text_field($params['title'])));
        if (isset($params['description'])) wp_update_post(array('ID' => $id, 'post_content' => wp_kses_post($params['description'])));

        if (isset($params['department'])) update_post_meta($id, '_zealancy_department', sanitize_text_field($params['department']));
        if (isset($params['type'])) update_post_meta($id, '_zealancy_type', sanitize_text_field($params['type']));
        if (isset($params['mode'])) update_post_meta($id, '_zealancy_mode', sanitize_text_field($params['mode']));
        if (isset($params['experience'])) update_post_meta($id, '_zealancy_experience', sanitize_text_field($params['experience']));
        if (isset($params['status'])) update_post_meta($id, '_zealancy_status', sanitize_text_field($params['status']));
        if (isset($params['isUrgent'])) update_post_meta($id, '_zealancy_is_urgent', $params['isUrgent'] ? '1' : '0');
        if (isset($params['urgentLabel'])) update_post_meta($id, '_zealancy_urgent_label', sanitize_text_field($params['urgentLabel']));

        return rest_ensure_response(array('id' => (string) $id, 'message' => 'Job updated successfully'));
    }

    public static function delete_job(WP_REST_Request $request) {
        $id = (int) $request['id'];
        wp_delete_post($id, true);
        return rest_ensure_response(array('message' => 'Job deleted successfully'));
    }

    // ------------------------------------------------------------------
    // Applications Callbacks
    // ------------------------------------------------------------------
    public static function get_applications() {
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

    public static function update_application(WP_REST_Request $request) {
        $id     = (int) $request['id'];
        $params = $request->get_json_params();

        if (isset($params['status'])) update_post_meta($id, '_zealancy_status', sanitize_text_field($params['status']));
        if (isset($params['notes'])) update_post_meta($id, '_zealancy_notes', sanitize_textarea_field($params['notes']));

        return rest_ensure_response(array('id' => (string) $id, 'message' => 'Application updated'));
    }

    public static function delete_application(WP_REST_Request $request) {
        $id = (int) $request['id'];
        wp_delete_post($id, true);
        return rest_ensure_response(array('message' => 'Application deleted'));
    }

    // ------------------------------------------------------------------
    // Team Callbacks
    // ------------------------------------------------------------------
    public static function get_team() {
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

    public static function update_team(WP_REST_Request $request) {
        $team = $request->get_json_params();
        update_option('zealancy_team_members', $team);
        return rest_ensure_response(array('message' => 'Team updated successfully'));
    }

    // ------------------------------------------------------------------
    // Content Callbacks
    // ------------------------------------------------------------------
    public static function get_content() {
        return rest_ensure_response(array(
            'faq'         => get_option('zealancy_faq', array()),
            'hiringSteps' => get_option('zealancy_hiring_steps', array()),
            'benefits'    => get_option('zealancy_benefits', array()),
            'heroWords'   => get_option('zealancy_hero_words', array()),
        ));
    }

    public static function update_content(WP_REST_Request $request) {
        $params = $request->get_json_params();
        if (isset($params['faq'])) update_option('zealancy_faq', $params['faq']);
        if (isset($params['hiringSteps'])) update_option('zealancy_hiring_steps', $params['hiringSteps']);
        if (isset($params['benefits'])) update_option('zealancy_benefits', $params['benefits']);
        if (isset($params['heroWords'])) update_option('zealancy_hero_words', $params['heroWords']);

        return rest_ensure_response(array('message' => 'Website content saved successfully'));
    }

    // ------------------------------------------------------------------
    // Settings Callbacks
    // ------------------------------------------------------------------
    public static function get_settings() {
        return rest_ensure_response(array(
            'siteName'           => get_option('blogname', 'Team Zealancy'),
            'tagline'            => get_option('blogdescription', 'Make content for the top 1% of creators.'),
            'contactEmail'       => get_option('zealancy_contact_email', 'careers@teamzealancy.com'),
            'whatsappNumber'     => get_option('zealancy_whatsapp', '+923001234567'),
            'isOpenToWork'       => get_option('zealancy_is_open_to_work', '1') === '1',
            'discordWebhook'     => get_option('zealancy_discord_webhook_url', ''),
        ));
    }

    public static function update_settings(WP_REST_Request $request) {
        $params = $request->get_json_params();
        if (isset($params['siteName'])) update_option('blogname', sanitize_text_field($params['siteName']));
        if (isset($params['tagline'])) update_option('blogdescription', sanitize_text_field($params['tagline']));
        if (isset($params['contactEmail'])) update_option('zealancy_contact_email', sanitize_email($params['contactEmail']));
        if (isset($params['whatsappNumber'])) update_option('zealancy_whatsapp', sanitize_text_field($params['whatsappNumber']));
        if (isset($params['isOpenToWork'])) update_option('zealancy_is_open_to_work', $params['isOpenToWork'] ? '1' : '0');
        if (isset($params['discordWebhook'])) update_option('zealancy_discord_webhook_url', esc_url_raw($params['discordWebhook']));

        return rest_ensure_response(array('message' => 'Settings saved successfully'));
    }

    // ------------------------------------------------------------------
    // Submit Candidate Application Callback (Public POST + Resume Upload)
    // ------------------------------------------------------------------
    public static function submit_application(WP_REST_Request $request) {
        $params = $request->get_params();

        $full_name    = sanitize_text_field($params['fullName'] ?? '');
        $email        = sanitize_email($params['email'] ?? '');
        $phone        = sanitize_text_field($params['phone'] ?? '');
        $job_title    = sanitize_text_field($params['position'] ?? 'General Application');
        $linkedin     = !empty($params['linkedin']) ? esc_url_raw($params['linkedin']) : '';
        $portfolio    = !empty($params['portfolio']) ? esc_url_raw($params['portfolio']) : '';
        $cover_letter = sanitize_textarea_field($params['coverLetter'] ?? '');

        if (empty($full_name) || empty($email) || empty($phone)) {
            return new WP_Error('missing_fields', __('Required application fields are missing.', 'zealancy-careers'), array('status' => 400));
        }

        // Process Resume Upload
        $upload_result = array('url' => '', 'filename' => '');
        if (!empty($_FILES['resume'])) {
            $upload_result = Zealancy_Uploader::process_resume_upload($_FILES['resume']);
            if (is_wp_error($upload_result)) {
                return $upload_result; // Return WP_Error response to client
            }
        }

        // Create Application CPT Post
        $post_id = wp_insert_post(array(
            'post_title'   => sprintf('%s — %s', $full_name, $job_title),
            'post_content' => $cover_letter,
            'post_type'    => 'zealancy_application',
            'post_status'  => 'publish',
        ));

        if (is_wp_error($post_id)) {
            return new WP_Error('app_submit_failed', __('Failed to create application post.', 'zealancy-careers'), array('status' => 500));
        }

        // Save Meta Fields
        update_post_meta($post_id, '_zealancy_full_name', $full_name);
        update_post_meta($post_id, '_zealancy_email', $email);
        update_post_meta($post_id, '_zealancy_phone', $phone);
        update_post_meta($post_id, '_zealancy_job_title', $job_title);
        update_post_meta($post_id, '_zealancy_linkedin', $linkedin);
        update_post_meta($post_id, '_zealancy_portfolio', $portfolio);
        update_post_meta($post_id, '_zealancy_cover_letter', $cover_letter);
        update_post_meta($post_id, '_zealancy_resume_file_url', $upload_result['url']);
        update_post_meta($post_id, '_zealancy_resume_file_name', $upload_result['filename']);
        update_post_meta($post_id, '_zealancy_status', 'new');

        // Dispatch Email & Discord Webhook Notifications
        $app_data = array(
            'full_name'    => $full_name,
            'email'        => $email,
            'phone'        => $phone,
            'job_title'    => $job_title,
            'linkedin'     => $linkedin,
            'portfolio'    => $portfolio,
            'cover_letter' => $cover_letter,
            'resume_url'   => $upload_result['url'],
        );

        Zealancy_Notifications::send_email_notification($app_data);
        Zealancy_Notifications::send_discord_notification($app_data);

        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Application submitted successfully',
            'id'      => (string) $post_id,
        ));
    }
}
