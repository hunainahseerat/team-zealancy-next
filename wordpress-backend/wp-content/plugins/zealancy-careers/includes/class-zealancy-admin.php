<?php
/**
 * Zealancy Admin Management GUI Class
 * Adds Dashboard, Applications, Team, Content, and Settings pages inside WordPress Admin
 */

if (!defined('ABSPATH')) {
    exit;
}

class Zealancy_Admin {

    public static function init() {
        add_action('admin_menu', array(__CLASS__, 'register_admin_menu'));
    }

    public static function register_admin_menu() {
        // Main Dashboard Submenu Page
        add_submenu_page(
            'edit.php?post_type=zealancy_job',
            __('Dashboard', 'zealancy-careers'),
            __('Dashboard', 'zealancy-careers'),
            'manage_options',
            'zealancy-dashboard',
            array(__CLASS__, 'render_dashboard_page')
        );

        // Applications Page
        add_submenu_page(
            'edit.php?post_type=zealancy_job',
            __('Applications', 'zealancy-careers'),
            __('Applications', 'zealancy-careers'),
            'manage_options',
            'zealancy-applications',
            array(__CLASS__, 'render_applications_page')
        );

        // Team Members Page
        add_submenu_page(
            'edit.php?post_type=zealancy_job',
            __('Team Members', 'zealancy-careers'),
            __('Team Members', 'zealancy-careers'),
            'manage_options',
            'zealancy-team',
            array(__CLASS__, 'render_team_page')
        );

        // Website Content Page (FAQ, Steps, Benefits, Hero)
        add_submenu_page(
            'edit.php?post_type=zealancy_job',
            __('Website Content', 'zealancy-careers'),
            __('Website Content', 'zealancy-careers'),
            'manage_options',
            'zealancy-content',
            array(__CLASS__, 'render_content_page')
        );

        // Settings Page
        add_submenu_page(
            'edit.php?post_type=zealancy_job',
            __('Settings', 'zealancy-careers'),
            __('Settings', 'zealancy-careers'),
            'manage_options',
            'zealancy-settings',
            array(__CLASS__, 'render_settings_page')
        );
    }

    /**
     * 1. Render Admin Dashboard Page
     */
    public static function render_dashboard_page() {
        $jobs_count = wp_count_posts('zealancy_job');
        $apps_count = wp_count_posts('zealancy_application');
        $active_jobs = get_posts(array('post_type' => 'zealancy_job', 'posts_per_page' => -1, 'meta_key' => '_zealancy_status', 'meta_value' => 'active'));
        $recent_apps = get_posts(array('post_type' => 'zealancy_application', 'posts_per_page' => 5));
        ?>
        <div class="wrap">
            <h1><?php _e('Team Zealancy Careers — Dashboard', 'zealancy-careers'); ?></h1>
            <p className="description"><?php _e('Overview of job openings, candidate applications, and website settings.', 'zealancy-careers'); ?></p>

            <div style="display: flex; gap: 20px; margin: 20px 0; flex-wrap: wrap;">
                <div style="background: #fff; border: 1px solid #c3c4c7; border-left: 4px solid #5D2DB0; padding: 16px 24px; border-radius: 4px; min-width: 180px;">
                    <div style="font-size: 12px; color: #646970; text-transform: uppercase; font-weight: 600;"><?php _e('Total Jobs', 'zealancy-careers'); ?></div>
                    <div style="font-size: 32px; font-weight: 700; color: #1d2327; margin-top: 4px;"><?php echo (int) $jobs_count->publish; ?></div>
                    <div style="font-size: 12px; color: #5D2DB0; margin-top: 4px;"><?php echo count($active_jobs); ?> <?php _e('active hiring', 'zealancy-careers'); ?></div>
                </div>

                <div style="background: #fff; border: 1px solid #c3c4c7; border-left: 4px solid #2271b1; padding: 16px 24px; border-radius: 4px; min-width: 180px;">
                    <div style="font-size: 12px; color: #646970; text-transform: uppercase; font-weight: 600;"><?php _e('Total Applications', 'zealancy-careers'); ?></div>
                    <div style="font-size: 32px; font-weight: 700; color: #1d2327; margin-top: 4px;"><?php echo (int) $apps_count->publish; ?></div>
                    <div style="font-size: 12px; color: #2271b1; margin-top: 4px;"><?php _e('Received to date', 'zealancy-careers'); ?></div>
                </div>
            </div>

            <h2><?php _e('Recent Applications', 'zealancy-careers'); ?></h2>
            <table className="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th><?php _e('Candidate', 'zealancy-careers'); ?></th>
                        <th><?php _e('Role', 'zealancy-careers'); ?></th>
                        <th><?php _e('Status', 'zealancy-careers'); ?></th>
                        <th><?php _e('Submitted', 'zealancy-careers'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($recent_apps)) : ?>
                        <tr><td colspan="4"><?php _e('No applications received yet.', 'zealancy-careers'); ?></td></tr>
                    <?php else : ?>
                        <?php foreach ($recent_apps as $app) :
                            $name   = get_post_meta($app->ID, '_zealancy_full_name', true);
                            $role   = get_post_meta($app->ID, '_zealancy_job_title', true);
                            $status = get_post_meta($app->ID, '_zealancy_status', true) ?: 'new';
                        ?>
                        <tr>
                            <td><strong><a href="<?php echo esc_url(get_edit_post_link($app->ID)); ?>"><?php echo esc_html($name); ?></a></strong></td>
                            <td><?php echo esc_html($role); ?></td>
                            <td><span style="background: #e0d5f5; color: #5D2DB0; padding: 2px 8px; border-radius: 99px; font-size: 11px; font-weight: 600;"><?php echo esc_html(strtoupper($status)); ?></span></td>
                            <td><?php echo esc_html(get_the_date('M j, Y', $app->ID)); ?></td>
                        </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        <?php
    }

    /**
     * 2. Render Applications Management Page
     */
    public static function render_applications_page() {
        if (isset($_POST['zealancy_update_app_status']) && check_admin_referer('zealancy_app_status_action')) {
            $app_id     = (int) $_POST['app_id'];
            $new_status = sanitize_text_field($_POST['app_status']);
            $notes      = sanitize_textarea_field($_POST['app_notes'] ?? '');

            update_post_meta($app_id, '_zealancy_status', $new_status);
            update_post_meta($app_id, '_zealancy_notes', $notes);
            echo '<div className="notice notice-success is-dismissible"><p>' . __('Application status updated.', 'zealancy-careers') . '</p></div>';
        }

        $apps = get_posts(array(
            'post_type'      => 'zealancy_application',
            'posts_per_page' => -1,
            'post_status'    => 'publish',
        ));
        ?>
        <div class="wrap">
            <h1 className="wp-heading-inline"><?php _e('Applications Management', 'zealancy-careers'); ?></h1>
            <hr className="wp-header-end">

            <table className="wp-list-table widefat fixed striped" style="margin-top: 15px;">
                <thead>
                    <tr>
                        <th><?php _e('Candidate', 'zealancy-careers'); ?></th>
                        <th><?php _e('Applied For', 'zealancy-careers'); ?></th>
                        <th><?php _e('Contact', 'zealancy-careers'); ?></th>
                        <th><?php _e('Links', 'zealancy-careers'); ?></th>
                        <th><?php _e('Status', 'zealancy-careers'); ?></th>
                        <th><?php _e('Resume File', 'zealancy-careers'); ?></th>
                        <th><?php _e('Action', 'zealancy-careers'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($apps)) : ?>
                        <tr><td colspan="7"><?php _e('No applications found.', 'zealancy-careers'); ?></td></tr>
                    <?php else : ?>
                        <?php foreach ($apps as $app) :
                            $name      = get_post_meta($app->ID, '_zealancy_full_name', true);
                            $job_title = get_post_meta($app->ID, '_zealancy_job_title', true);
                            $email     = get_post_meta($app->ID, '_zealancy_email', true);
                            $phone     = get_post_meta($app->ID, '_zealancy_phone', true);
                            $linkedin  = get_post_meta($app->ID, '_zealancy_linkedin', true);
                            $portfolio = get_post_meta($app->ID, '_zealancy_portfolio', true);
                            $status    = get_post_meta($app->ID, '_zealancy_status', true) ?: 'new';
                            $resume    = get_post_meta($app->ID, '_zealancy_resume_file_url', true);
                        ?>
                        <tr>
                            <td><strong><?php echo esc_html($name); ?></strong><br><small><?php echo esc_html(get_the_date('M j, Y g:i a', $app->ID)); ?></small></td>
                            <td><?php echo esc_html($job_title); ?></td>
                            <td><a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a><br><?php echo esc_html($phone); ?></td>
                            <td>
                                <?php if ($linkedin) : ?><a href="<?php echo esc_url($linkedin); ?>" target="_blank">LinkedIn</a> <?php endif; ?>
                                <?php if ($portfolio) : ?><a href="<?php echo esc_url($portfolio); ?>" target="_blank">Portfolio</a><?php endif; ?>
                            </td>
                            <td><span style="background: #e0d5f5; color: #5D2DB0; padding: 2px 8px; border-radius: 99px; font-size: 11px; font-weight: 600;"><?php echo esc_html(strtoupper($status)); ?></span></td>
                            <td>
                                <?php if ($resume) : ?>
                                    <a href="<?php echo esc_url($resume); ?>" target="_blank" className="button button-small button-secondary"><?php _e('View Resume', 'zealancy-careers'); ?></a>
                                <?php else : ?>
                                    —
                                <?php endif; ?>
                            </td>
                            <td>
                                <a href="<?php echo esc_url(get_edit_post_link($app->ID)); ?>" className="button button-small"><?php _e('Details', 'zealancy-careers'); ?></a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        <?php
    }

    /**
     * 3. Render Team Members Page
     */
    public static function render_team_page() {
        if (isset($_POST['zealancy_save_team']) && check_admin_referer('zealancy_team_action')) {
            $team_json = sanitize_textarea_field($_POST['team_json']);
            $decoded   = json_decode(stripslashes($team_json), true);
            if (is_array($decoded)) {
                update_option('zealancy_team_members', $decoded);
                echo '<div className="notice notice-success is-dismissible"><p>' . __('Team members saved.', 'zealancy-careers') . '</p></div>';
            }
        }

        $team = get_option('zealancy_team_members', array());
        ?>
        <div class="wrap">
            <h1><?php _e('Team Members Management', 'zealancy-careers'); ?></h1>
            <p className="description"><?php _e('Manage team members displayed in the Core Leadership section.', 'zealancy-careers'); ?></p>

            <form method="post" action="">
                <?php wp_nonce_field('zealancy_team_action'); ?>
                <table className="form-table">
                    <tr>
                        <th><label for="team_json"><?php _e('Team Members (JSON Data)', 'zealancy-careers'); ?></label></th>
                        <td>
                            <textarea name="team_json" id="team_json" rows="12" className="large-text code"><?php echo esc_textarea(wp_json_encode($team, JSON_PRETTY_PRINT)); ?></textarea>
                            <p className="description"><?php _e('Edit JSON array of team members. Also editable via REST API endpoint.', 'zealancy-careers'); ?></p>
                        </td>
                    </tr>
                </table>
                <?php submit_button(__('Save Team Members', 'zealancy-careers')); ?>
            </form>
        </div>
        <?php
    }

    /**
     * 4. Render Website Content Page (FAQ, Steps, Benefits, Hero)
     */
    public static function render_content_page() {
        if (isset($_POST['zealancy_save_content']) && check_admin_referer('zealancy_content_action')) {
            if (isset($_POST['faq_json'])) update_option('zealancy_faq', json_decode(stripslashes($_POST['faq_json']), true));
            if (isset($_POST['steps_json'])) update_option('zealancy_hiring_steps', json_decode(stripslashes($_POST['steps_json']), true));
            if (isset($_POST['benefits_json'])) update_option('zealancy_benefits', json_decode(stripslashes($_POST['benefits_json']), true));
            if (isset($_POST['hero_json'])) update_option('zealancy_hero_words', json_decode(stripslashes($_POST['hero_json']), true));

            echo '<div className="notice notice-success is-dismissible"><p>' . __('Website content updated successfully!', 'zealancy-careers') . '</p></div>';
        }

        $faq      = get_option('zealancy_faq', array());
        $steps    = get_option('zealancy_hiring_steps', array());
        $benefits = get_option('zealancy_benefits', array());
        $hero     = get_option('zealancy_hero_words', array());
        ?>
        <div class="wrap">
            <h1><?php _e('Website Copy & Content', 'zealancy-careers'); ?></h1>
            <form method="post" action="">
                <?php wp_nonce_field('zealancy_content_action'); ?>
                <h2><?php _e('FAQ Items', 'zealancy-careers'); ?></h2>
                <textarea name="faq_json" rows="8" className="large-text code"><?php echo esc_textarea(wp_json_encode($faq, JSON_PRETTY_PRINT)); ?></textarea>

                <h2><?php _e('Hiring Timeline Steps', 'zealancy-careers'); ?></h2>
                <textarea name="steps_json" rows="8" className="large-text code"><?php echo esc_textarea(wp_json_encode($steps, JSON_PRETTY_PRINT)); ?></textarea>

                <h2><?php _e('Perks & Benefits', 'zealancy-careers'); ?></h2>
                <textarea name="benefits_json" rows="8" className="large-text code"><?php echo esc_textarea(wp_json_encode($benefits, JSON_PRETTY_PRINT)); ?></textarea>

                <h2><?php _e('Hero Rotator Words', 'zealancy-careers'); ?></h2>
                <textarea name="hero_json" rows="5" className="large-text code"><?php echo esc_textarea(wp_json_encode($hero, JSON_PRETTY_PRINT)); ?></textarea>

                <?php submit_button(__('Save All Website Content', 'zealancy-careers')); ?>
            </form>
        </div>
        <?php
    }

    /**
     * 5. Render Settings Page
     */
    public static function render_settings_page() {
        if (isset($_POST['zealancy_save_settings']) && check_admin_referer('zealancy_settings_action')) {
            update_option('zealancy_contact_email', sanitize_email($_POST['contact_email']));
            update_option('zealancy_whatsapp', sanitize_text_field($_POST['whatsapp']));
            update_option('zealancy_discord_webhook_url', esc_url_raw($_POST['discord_webhook']));
            update_option('zealancy_is_open_to_work', isset($_POST['is_open_to_work']) ? '1' : '0');

            echo '<div className="notice notice-success is-dismissible"><p>' . __('Settings saved successfully!', 'zealancy-careers') . '</p></div>';
        }

        $contact_email   = get_option('zealancy_contact_email', 'careers@teamzealancy.com');
        $whatsapp        = get_option('zealancy_whatsapp', '+923001234567');
        $discord_webhook = get_option('zealancy_discord_webhook_url', '');
        $is_open_to_work = get_option('zealancy_is_open_to_work', '1');
        ?>
        <div class="wrap">
            <h1><?php _e('Zealancy Settings', 'zealancy-careers'); ?></h1>
            <form method="post" action="">
                <?php wp_nonce_field('zealancy_settings_action'); ?>
                <table className="form-table">
                    <tr>
                        <th><label for="contact_email"><?php _e('Admin Email for Notifications', 'zealancy-careers'); ?></label></th>
                        <td><input name="contact_email" type="email" id="contact_email" value="<?php echo esc_attr($contact_email); ?>" className="regular-text"></td>
                    </tr>
                    <tr>
                        <th><label for="whatsapp"><?php _e('WhatsApp Contact Number', 'zealancy-careers'); ?></label></th>
                        <td><input name="whatsapp" type="text" id="whatsapp" value="<?php echo esc_attr($whatsapp); ?>" className="regular-text"></td>
                    </tr>
                    <tr>
                        <th><label for="discord_webhook"><?php _e('Discord Webhook URL', 'zealancy-careers'); ?></label></th>
                        <td>
                            <input name="discord_webhook" type="url" id="discord_webhook" value="<?php echo esc_attr($discord_webhook); ?>" className="large-text" placeholder="https://discord.com/api/webhooks/...">
                            <p className="description"><?php _e('Instant candidate notifications will be posted to this Discord channel.', 'zealancy-careers'); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th><?php _e('Hiring Indicator', 'zealancy-careers'); ?></th>
                        <td>
                            <label for="is_open_to_work">
                                <input name="is_open_to_work" type="checkbox" id="is_open_to_work" value="1" <?php checked($is_open_to_work, '1'); ?>>
                                <?php _e('Show "Actively Hiring" indicator across website', 'zealancy-careers'); ?>
                            </label>
                        </td>
                    </tr>
                </table>
                <?php submit_button(__('Save Settings', 'zealancy-careers')); ?>
            </form>
        </div>
        <?php
    }
}
