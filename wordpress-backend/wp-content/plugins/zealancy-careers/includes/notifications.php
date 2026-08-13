<?php
/**
 * Notifications Module for Zealancy Careers (Email & Discord)
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Trigger Email & Discord notifications upon new application submission
 */
function zealancy_trigger_application_notifications($app_id, $app_data) {
    // 1. Send Email Notification to Admin
    $admin_email = get_option('zealancy_contact_email', get_option('admin_email'));
    $subject = sprintf('[New Job Application] %s for %s', $app_data['full_name'], $app_data['job_title']);

    $message = sprintf(
        "New job application received on Team Zealancy Careers!\n\n" .
        "Name: %s\n" .
        "Email: %s\n" .
        "Phone: %s\n" .
        "Applied For: %s\n" .
        "LinkedIn: %s\n" .
        "Portfolio: %s\n" .
        "Resume: %s\n\n" .
        "Cover Letter:\n%s\n\n" .
        "View in WP Admin: %s\n",
        $app_data['full_name'],
        $app_data['email'],
        $app_data['phone'],
        $app_data['job_title'],
        !empty($app_data['linkedin']) ? $app_data['linkedin'] : 'N/A',
        !empty($app_data['portfolio']) ? $app_data['portfolio'] : 'N/A',
        !empty($app_data['resume_file_url']) ? $app_data['resume_file_url'] : 'Attached',
        $app_data['cover_letter'],
        admin_url('edit.php?post_type=zealancy_job&page=zealancy-applications')
    );

    $headers = array('Content-Type: text/plain; charset=UTF-8', 'From: Team Zealancy Careers <' . $admin_email . '>');
    @wp_mail($admin_email, $subject, $message, $headers);

    // 2. Send Discord Webhook Notification
    $discord_webhook_url = get_option('zealancy_discord_webhook_url', '');
    if (!empty($discord_webhook_url)) {
        $embed = array(
            'title'       => '🎉 New Candidate Application!',
            'description' => sprintf('**%s** has applied for **%s**', $app_data['full_name'], $app_data['job_title']),
            'color'       => 6106544, // #5D2DB0 in decimal
            'fields'      => array(
                array('name' => 'Email', 'value' => $app_data['email'], 'inline' => true),
                array('name' => 'Phone', 'value' => $app_data['phone'], 'inline' => true),
                array('name' => 'Portfolio', 'value' => !empty($app_data['portfolio']) ? $app_data['portfolio'] : 'N/A', 'inline' => false),
                array('name' => 'Resume', 'value' => !empty($app_data['resume_file_url']) ? sprintf('[Download Resume](%s)', $app_data['resume_file_url']) : 'Uploaded', 'inline' => false),
            ),
            'timestamp'   => date('c'),
            'footer'      => array('text' => 'Team Zealancy Careers Bot'),
        );

        $payload = array(
            'username'   => 'Zealancy Careers',
            'avatar_url' => 'https://teamzealancy.com/og-image.png',
            'embeds'     => array($embed),
        );

        wp_remote_post($discord_webhook_url, array(
            'method'      => 'POST',
            'timeout'     => 10,
            'redirection' => 5,
            'headers'     => array('Content-Type' => 'application/json'),
            'body'        => wp_json_encode($payload),
            'data_format' => 'body',
        ));
    }
}
