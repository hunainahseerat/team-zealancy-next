<?php
/**
 * Zealancy Notifications Handler Class (Email & Discord)
 * Conforms to WordPress Coding Standards & Hostinger Hosting Requirements
 */

if (!defined('ABSPATH')) {
    exit;
}

class Zealancy_Notifications {

    /**
     * Send email notification via wp_mail()
     */
    public static function send_email_notification($app_data) {
        $admin_email = get_option('zealancy_contact_email', get_option('admin_email'));
        if (!is_email($admin_email)) {
            $admin_email = get_option('admin_email');
        }

        $subject = sprintf('[Zealancy Careers] New Application: %s - %s', $app_data['full_name'], $app_data['job_title']);

        $message = sprintf(
            "Hello,\n\nA new application has been submitted on Team Zealancy Careers!\n\n" .
            "Applicant Name: %s\n" .
            "Email Address: %s\n" .
            "Phone Number: %s\n" .
            "Applied Position: %s\n" .
            "LinkedIn: %s\n" .
            "Portfolio: %s\n" .
            "Resume URL: %s\n\n" .
            "Cover Letter / Note:\n%s\n\n" .
            "---\n" .
            "Manage applications in WP Admin: %s\n",
            $app_data['full_name'],
            $app_data['email'],
            $app_data['phone'],
            $app_data['job_title'],
            !empty($app_data['linkedin']) ? $app_data['linkedin'] : 'N/A',
            !empty($app_data['portfolio']) ? $app_data['portfolio'] : 'N/A',
            !empty($app_data['resume_url']) ? $app_data['resume_url'] : 'Attached',
            $app_data['cover_letter'],
            admin_url('edit.php?post_type=zealancy_job&page=zealancy-applications')
        );

        $headers = array(
            'Content-Type: text/plain; charset=UTF-8',
            'From: Team Zealancy Careers <' . $admin_email . '>',
            'Reply-To: ' . $app_data['full_name'] . ' <' . $app_data['email'] . '>',
        );

        return wp_mail($admin_email, $subject, $message, $headers);
    }

    /**
     * Send Discord Webhook notification via wp_remote_post()
     */
    public static function send_discord_notification($app_data) {
        $webhook_url = get_option('zealancy_discord_webhook_url', '');
        if (empty($webhook_url) || !filter_var($webhook_url, FILTER_VALIDATE_URL)) {
            return false;
        }

        $embed = array(
            'title'       => '🎉 New Candidate Application!',
            'description' => sprintf('**%s** applied for **%s**', $app_data['full_name'], $app_data['job_title']),
            'color'       => 6106544, // #5D2DB0 in decimal
            'fields'      => array(
                array(
                    'name'   => 'Email',
                    'value'  => $app_data['email'],
                    'inline' => true,
                ),
                array(
                    'name'   => 'Phone',
                    'value'  => $app_data['phone'],
                    'inline' => true,
                ),
                array(
                    'name'   => 'Portfolio / Website',
                    'value'  => !empty($app_data['portfolio']) ? $app_data['portfolio'] : 'N/A',
                    'inline' => false,
                ),
                array(
                    'name'   => 'Resume',
                    'value'  => !empty($app_data['resume_url']) ? sprintf('[Download Resume](%s)', $app_data['resume_url']) : 'Uploaded',
                    'inline' => false,
                ),
            ),
            'timestamp'   => date('c'),
            'footer'      => array(
                'text' => 'Team Zealancy Careers Bot',
            ),
        );

        $payload = array(
            'username'   => 'Zealancy Careers',
            'avatar_url' => 'https://teamzealancy.com/og-image.png',
            'embeds'     => array($embed),
        );

        $response = wp_remote_post($webhook_url, array(
            'method'      => 'POST',
            'timeout'     => 15, // Hostinger-safe timeout
            'redirection' => 5,
            'headers'     => array('Content-Type' => 'application/json; charset=utf-8'),
            'body'        => wp_json_encode($payload),
            'data_format' => 'body',
            'sslverify'   => true,
        ));

        if (is_wp_error($response)) {
            error_log('Zealancy Discord Webhook Error: ' . $response->get_error_message());
            return false;
        }

        return true;
    }
}
