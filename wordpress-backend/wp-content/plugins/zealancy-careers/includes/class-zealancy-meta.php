<?php
/**
 * Zealancy Meta Box Handler Class
 * Handles registering and saving custom meta boxes for Jobs & Applications
 */

if (!defined('ABSPATH')) {
    exit;
}

class Zealancy_Meta {

    public static function init() {
        add_action('add_meta_boxes', array(__CLASS__, 'add_meta_boxes'));
        add_action('save_post', array(__CLASS__, 'save_post_meta'), 10, 2);
    }

    public static function add_meta_boxes() {
        add_meta_box(
            'zealancy_job_details',
            __('Job Role Details', 'zealancy-careers'),
            array(__CLASS__, 'render_job_meta_box'),
            'zealancy_job',
            'normal',
            'high'
        );

        add_meta_box(
            'zealancy_application_details',
            __('Candidate Application Details', 'zealancy-careers'),
            array(__CLASS__, 'render_application_meta_box'),
            'zealancy_application',
            'normal',
            'high'
        );
    }

    public static function render_job_meta_box($post) {
        wp_nonce_field('zealancy_save_job_meta', 'zealancy_job_meta_nonce');

        $department   = get_post_meta($post->ID, '_zealancy_department', true) ?: 'Video Production';
        $type         = get_post_meta($post->ID, '_zealancy_type', true) ?: 'Full-time';
        $mode         = get_post_meta($post->ID, '_zealancy_mode', true) ?: 'Remote';
        $experience   = get_post_meta($post->ID, '_zealancy_experience', true) ?: '1+ year';
        $status       = get_post_meta($post->ID, '_zealancy_status', true) ?: 'active';
        $is_urgent    = get_post_meta($post->ID, '_zealancy_is_urgent', true);
        $urgent_label = get_post_meta($post->ID, '_zealancy_urgent_label', true) ?: 'Hiring urgently';
        ?>
        <table className="form-table">
            <tr>
                <th><label for="_zealancy_department"><?php _e('Department', 'zealancy-careers'); ?></label></th>
                <td>
                    <select name="_zealancy_department" id="_zealancy_department" className="widefat">
                        <option value="Video Production" <?php selected($department, 'Video Production'); ?>>Video Production</option>
                        <option value="Design" <?php selected($department, 'Design'); ?>>Design</option>
                        <option value="Strategy" <?php selected($department, 'Strategy'); ?>>Strategy</option>
                        <option value="Operations" <?php selected($department, 'Operations'); ?>>Operations</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="_zealancy_type"><?php _e('Employment Type', 'zealancy-careers'); ?></label></th>
                <td>
                    <select name="_zealancy_type" id="_zealancy_type" className="widefat">
                        <option value="Full-time" <?php selected($type, 'Full-time'); ?>>Full-time</option>
                        <option value="Part-time" <?php selected($type, 'Part-time'); ?>>Part-time</option>
                        <option value="Internship" <?php selected($type, 'Internship'); ?>>Internship</option>
                        <option value="Contract" <?php selected($type, 'Contract'); ?>>Contract</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="_zealancy_mode"><?php _e('Work Mode', 'zealancy-careers'); ?></label></th>
                <td>
                    <select name="_zealancy_mode" id="_zealancy_mode" className="widefat">
                        <option value="Remote" <?php selected($mode, 'Remote'); ?>>Remote</option>
                        <option value="Hybrid" <?php selected($mode, 'Hybrid'); ?>>Hybrid</option>
                        <option value="On-site" <?php selected($mode, 'On-site'); ?>>On-site</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="_zealancy_experience"><?php _e('Required Experience', 'zealancy-careers'); ?></label></th>
                <td>
                    <input type="text" name="_zealancy_experience" id="_zealancy_experience" value="<?php echo esc_attr($experience); ?>" className="regular-text">
                </td>
            </tr>
            <tr>
                <th><label for="_zealancy_status"><?php _e('Job Status', 'zealancy-careers'); ?></label></th>
                <td>
                    <select name="_zealancy_status" id="_zealancy_status" className="widefat">
                        <option value="active" <?php selected($status, 'active'); ?>>Active (Visible)</option>
                        <option value="paused" <?php selected($status, 'paused'); ?>>Paused</option>
                        <option value="archived" <?php selected($status, 'archived'); ?>>Archived</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><?php _e('Urgency Badge', 'zealancy-careers'); ?></th>
                <td>
                    <label for="_zealancy_is_urgent">
                        <input type="checkbox" name="_zealancy_is_urgent" id="_zealancy_is_urgent" value="1" <?php checked($is_urgent, '1'); ?>>
                        <?php _e('Mark as urgent vacancy', 'zealancy-careers'); ?>
                    </label>
                    <br><br>
                    <input type="text" name="_zealancy_urgent_label" id="_zealancy_urgent_label" value="<?php echo esc_attr($urgent_label); ?>" placeholder="e.g. Hiring urgently" className="regular-text">
                </td>
            </tr>
        </table>
        <?php
    }

    public static function render_application_meta_box($post) {
        $full_name    = get_post_meta($post->ID, '_zealancy_full_name', true);
        $email        = get_post_meta($post->ID, '_zealancy_email', true);
        $phone        = get_post_meta($post->ID, '_zealancy_phone', true);
        $job_title    = get_post_meta($post->ID, '_zealancy_job_title', true);
        $linkedin     = get_post_meta($post->ID, '_zealancy_linkedin', true);
        $portfolio    = get_post_meta($post->ID, '_zealancy_portfolio', true);
        $cover_letter = get_post_meta($post->ID, '_zealancy_cover_letter', true);
        $resume_url   = get_post_meta($post->ID, '_zealancy_resume_file_url', true);
        $status       = get_post_meta($post->ID, '_zealancy_status', true) ?: 'new';
        $notes        = get_post_meta($post->ID, '_zealancy_notes', true);

        wp_nonce_field('zealancy_save_app_meta', 'zealancy_app_meta_nonce');
        ?>
        <table className="form-table">
            <tr>
                <th><?php _e('Applicant Name', 'zealancy-careers'); ?></th>
                <td><strong><?php echo esc_html($full_name); ?></strong></td>
            </tr>
            <tr>
                <th><?php _e('Position Applied For', 'zealancy-careers'); ?></th>
                <td><?php echo esc_html($job_title); ?></td>
            </tr>
            <tr>
                <th><?php _e('Email Address', 'zealancy-careers'); ?></th>
                <td><a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a></td>
            </tr>
            <tr>
                <th><?php _e('Phone Number', 'zealancy-careers'); ?></th>
                <td><?php echo esc_html($phone); ?></td>
            </tr>
            <tr>
                <th><?php _e('LinkedIn Profile', 'zealancy-careers'); ?></th>
                <td>
                    <?php if ($linkedin) : ?>
                        <a href="<?php echo esc_url($linkedin); ?>" target="_blank" rel="noopener"><?php echo esc_html($linkedin); ?></a>
                    <?php else : ?>
                        <em><?php _e('Not provided', 'zealancy-careers'); ?></em>
                    <?php endif; ?>
                </td>
            </tr>
            <tr>
                <th><?php _e('Portfolio / Website', 'zealancy-careers'); ?></th>
                <td>
                    <?php if ($portfolio) : ?>
                        <a href="<?php echo esc_url($portfolio); ?>" target="_blank" rel="noopener"><?php echo esc_html($portfolio); ?></a>
                    <?php else : ?>
                        <em><?php _e('Not provided', 'zealancy-careers'); ?></em>
                    <?php endif; ?>
                </td>
            </tr>
            <tr>
                <th><?php _e('Attached Resume File', 'zealancy-careers'); ?></th>
                <td>
                    <?php if ($resume_url) : ?>
                        <a href="<?php echo esc_url($resume_url); ?>" target="_blank" className="button button-primary"><?php _e('Download Resume PDF/DOCX', 'zealancy-careers'); ?></a>
                    <?php else : ?>
                        <em><?php _e('No file attached', 'zealancy-careers'); ?></em>
                    <?php endif; ?>
                </td>
            </tr>
            <tr>
                <th><?php _e('Cover Letter / Note', 'zealancy-careers'); ?></th>
                <td>
                    <div style="background: #f9f9f9; border: 1px solid #ddd; padding: 12px; border-radius: 4px; max-width: 600px;">
                        <?php echo nl2br(esc_html($cover_letter)); ?>
                    </div>
                </td>
            </tr>
            <tr>
                <th><label for="_zealancy_status"><?php _e('Application Status', 'zealancy-careers'); ?></label></th>
                <td>
                    <select name="_zealancy_status" id="_zealancy_status">
                        <option value="new" <?php selected($status, 'new'); ?>>New</option>
                        <option value="reviewing" <?php selected($status, 'reviewing'); ?>>Reviewing</option>
                        <option value="shortlisted" <?php selected($status, 'shortlisted'); ?>>Shortlisted</option>
                        <option value="rejected" <?php selected($status, 'rejected'); ?>>Rejected</option>
                        <option value="hired" <?php selected($status, 'hired'); ?>>Hired</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="_zealancy_notes"><?php _e('Internal Hiring Notes', 'zealancy-careers'); ?></label></th>
                <td>
                    <textarea name="_zealancy_notes" id="_zealancy_notes" rows="4" className="large-text"><?php echo esc_textarea($notes); ?></textarea>
                </td>
            </tr>
        </table>
        <?php
    }

    public static function save_post_meta($post_id, $post) {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
        if (!current_user_can('edit_post', $post_id)) return;

        // Save Job Meta
        if (isset($_POST['zealancy_job_meta_nonce']) && wp_verify_nonce($_POST['zealancy_job_meta_nonce'], 'zealancy_save_job_meta')) {
            if (isset($_POST['_zealancy_department'])) update_post_meta($post_id, '_zealancy_department', sanitize_text_field($_POST['_zealancy_department']));
            if (isset($_POST['_zealancy_type'])) update_post_meta($post_id, '_zealancy_type', sanitize_text_field($_POST['_zealancy_type']));
            if (isset($_POST['_zealancy_mode'])) update_post_meta($post_id, '_zealancy_mode', sanitize_text_field($_POST['_zealancy_mode']));
            if (isset($_POST['_zealancy_experience'])) update_post_meta($post_id, '_zealancy_experience', sanitize_text_field($_POST['_zealancy_experience']));
            if (isset($_POST['_zealancy_status'])) update_post_meta($post_id, '_zealancy_status', sanitize_text_field($_POST['_zealancy_status']));
            update_post_meta($post_id, '_zealancy_is_urgent', isset($_POST['_zealancy_is_urgent']) ? '1' : '0');
            if (isset($_POST['_zealancy_urgent_label'])) update_post_meta($post_id, '_zealancy_urgent_label', sanitize_text_field($_POST['_zealancy_urgent_label']));
        }

        // Save Application Meta
        if (isset($_POST['zealancy_app_meta_nonce']) && wp_verify_nonce($_POST['zealancy_app_meta_nonce'], 'zealancy_save_app_meta')) {
            if (isset($_POST['_zealancy_status'])) update_post_meta($post_id, '_zealancy_status', sanitize_text_field($_POST['_zealancy_status']));
            if (isset($_POST['_zealancy_notes'])) update_post_meta($post_id, '_zealancy_notes', sanitize_textarea_field($_POST['_zealancy_notes']));
        }
    }
}
