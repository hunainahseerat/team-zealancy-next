<?php
/**
 * Register Admin Menu Pages for Zealancy Plugin
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('admin_menu', function () {
    // 1. Applications Page under Zealancy Jobs menu
    add_submenu_page(
        'edit.php?post_type=zealancy_job',
        'Applications',
        'Applications',
        'manage_options',
        'zealancy-applications',
        'zealancy_render_admin_applications_page'
    );

    // 2. Settings Page under Zealancy Jobs menu
    add_submenu_page(
        'edit.php?post_type=zealancy_job',
        'Zealancy Settings',
        'Settings',
        'manage_options',
        'zealancy-settings',
        'zealancy_render_admin_settings_page'
    );
});

/**
 * Render Applications list inside WordPress WP-Admin
 */
function zealancy_render_admin_applications_page() {
    $apps = get_posts(array(
        'post_type'      => 'zealancy_application',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    ));
    ?>
    <div class="wrap">
        <h1 class="wp-heading-inline">Candidate Applications</h1>
        <hr class="wp-header-end">

        <table className="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th>Applicant Name</th>
                    <th>Job Title</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th>Resume</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($apps)) : ?>
                    <tr><td colspan="7">No applications received yet.</td></tr>
                <?php else : ?>
                    <?php foreach ($apps as $app) :
                        $full_name = get_post_meta($app->ID, '_zealancy_full_name', true);
                        $job_title = get_post_meta($app->ID, '_zealancy_job_title', true);
                        $email     = get_post_meta($app->ID, '_zealancy_email', true);
                        $phone     = get_post_meta($app->ID, '_zealancy_phone', true);
                        $status    = get_post_meta($app->ID, '_zealancy_status', true) ?: 'new';
                        $resume    = get_post_meta($app->ID, '_zealancy_resume_file_url', true);
                    ?>
                    <tr>
                        <td><strong><?php echo esc_html($full_name); ?></strong></td>
                        <td><?php echo esc_html($job_title); ?></td>
                        <td><a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a></td>
                        <td><?php echo esc_html($phone); ?></td>
                        <td><span className="badge"><?php echo esc_html(strtoupper($status)); ?></span></td>
                        <td><?php echo esc_html(get_the_date('M j, Y g:i a', $app->ID)); ?></td>
                        <td>
                            <?php if (!empty($resume)) : ?>
                                <a href="<?php echo esc_url($resume); ?>" target="_blank" className="button button-small">Download Resume</a>
                            <?php else : ?>
                                —
                            <?php endif; ?>
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
 * Render Settings Page inside WordPress WP-Admin
 */
function zealancy_render_admin_settings_page() {
    if (isset($_POST['zealancy_save_settings']) && check_admin_referer('zealancy_settings_nonce')) {
        update_option('zealancy_contact_email', sanitize_email($_POST['contact_email']));
        update_option('zealancy_whatsapp', sanitize_text_field($_POST['whatsapp']));
        update_option('zealancy_discord_webhook_url', esc_url_raw($_POST['discord_webhook']));
        update_option('zealancy_is_open_to_work', isset($_POST['is_open_to_work']) ? '1' : '0');
        echo '<div className="notice notice-success is-dismissible"><p>Settings saved successfully!</p></div>';
    }

    $contact_email   = get_option('zealancy_contact_email', 'careers@teamzealancy.com');
    $whatsapp        = get_option('zealancy_whatsapp', '+923001234567');
    $discord_webhook = get_option('zealancy_discord_webhook_url', '');
    $is_open_to_work = get_option('zealancy_is_open_to_work', '1');
    ?>
    <div class="wrap">
        <h1>Team Zealancy Settings</h1>
        <form method="post" action="">
            <?php wp_nonce_field('zealancy_settings_nonce'); ?>
            <table className="form-table">
                <tr>
                    <th scope="row"><label for="contact_email">Admin Contact Email</label></th>
                    <td><input name="contact_email" type="email" id="contact_email" value="<?php echo esc_attr($contact_email); ?>" className="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row"><label for="whatsapp">WhatsApp Number</label></th>
                    <td><input name="whatsapp" type="text" id="whatsapp" value="<?php echo esc_attr($whatsapp); ?>" className="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row"><label for="discord_webhook">Discord Webhook URL</label></th>
                    <td>
                        <input name="discord_webhook" type="url" id="discord_webhook" value="<?php echo esc_attr($discord_webhook); ?>" className="large-text" placeholder="https://discord.com/api/webhooks/...">
                        <p className="description">Enter your Discord channel Webhook URL for instant candidate alerts.</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Hiring Indicator</th>
                    <td>
                        <label for="is_open_to_work">
                            <input name="is_open_to_work" type="checkbox" id="is_open_to_work" value="1" <?php checked($is_open_to_work, '1'); ?>>
                            Show "Actively Hiring" indicator across website
                        </label>
                    </td>
                </tr>
            </table>
            <?php submit_button('Save Settings', 'primary', 'zealancy_save_settings'); ?>
        </form>
    </div>
    <?php
}
