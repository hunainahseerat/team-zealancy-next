<?php
/**
 * Zealancy Resume Upload Handler Class
 * Provides secure file validation, MIME type checks, and Hostinger upload compatibility
 */

if (!defined('ABSPATH')) {
    exit;
}

class Zealancy_Uploader {

    /**
     * Allowed MIME types for candidate resumes
     */
    private static $allowed_mimes = array(
        'pdf'  => 'application/pdf',
        'doc'  => 'application/msword',
        'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    );

    /**
     * Max upload size: 10 MB in bytes
     */
    private static $max_size = 10485760; // 10 * 1024 * 1024

    /**
     * Process resume upload from $_FILES array
     *
     * @param array $file_array Single entry from $_FILES
     * @return array|WP_Error Array with 'url' and 'filename' or WP_Error on failure
     */
    public static function process_resume_upload($file_array) {
        if (empty($file_array) || !isset($file_array['tmp_name']) || empty($file_array['tmp_name'])) {
            return new WP_Error('no_file', __('No resume file uploaded.', 'zealancy-careers'), array('status' => 400));
        }

        if ($file_array['error'] !== UPLOAD_ERR_OK) {
            return new WP_Error('upload_error', __('File upload failed with code: ', 'zealancy-careers') . $file_array['error'], array('status' => 400));
        }

        // Validate File Size
        if ($file_array['size'] > self::$max_size) {
            return new WP_Error('file_too_large', __('Resume file exceeds maximum size limit of 10MB.', 'zealancy-careers'), array('status' => 400));
        }

        // Validate MIME type & Extension
        $file_type = wp_check_filetype($file_array['name'], self::$allowed_mimes);
        if (!$file_type['ext'] || !$file_type['type']) {
            return new WP_Error('invalid_file_type', __('Invalid file type. Only PDF, DOC, and DOCX documents are accepted.', 'zealancy-careers'), array('status' => 400));
        }

        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/media.php');
        require_once(ABSPATH . 'wp-admin/includes/image.php');

        // Custom upload directory hook to route files to wp-content/uploads/zealancy-resumes/
        $upload_dir_filter = function ($dirs) {
            $dirs['subdir'] = '/zealancy-resumes';
            $dirs['path']   = $dirs['basedir'] . '/zealancy-resumes';
            $dirs['url']    = $dirs['baseurl'] . '/zealancy-resumes';
            return $dirs;
        };

        add_filter('upload_dir', $upload_dir_filter);

        $upload_overrides = array(
            'test_form' => false,
            'mimes'     => self::$allowed_mimes,
        );

        $uploaded_file = wp_handle_upload($file_array, $upload_overrides);

        remove_filter('upload_dir', $upload_dir_filter);

        if (isset($uploaded_file['error'])) {
            return new WP_Error('upload_save_failed', $uploaded_file['error'], array('status' => 500));
        }

        return array(
            'url'      => esc_url_raw($uploaded_file['url']),
            'filename' => sanitize_file_name($file_array['name']),
            'file_path' => $uploaded_file['file'],
        );
    }
}
