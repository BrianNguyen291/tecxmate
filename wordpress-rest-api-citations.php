<?php
/**
 * WordPress REST API - Expose Citations Custom Field
 * 
 * This code should be added to your WordPress theme's functions.php file
 * or as a custom plugin to expose the 'citations' custom field via the REST API.
 * 
 * This is required for self-hosted WordPress sites.
 * WordPress.com sites should work without this code.
 */

/**
 * Register the 'citations' custom field in the REST API
 */
function register_citations_rest_field() {
    // Register the field for posts
    register_rest_field(
        'post',
        'citations',
        array(
            'get_callback' => function ($post_object) {
                // Get the custom field value
                $citations = get_post_meta($post_object['id'], 'citations', true);
                
                // Return empty string if not set
                return $citations ? $citations : '';
            },
            'update_callback' => function ($value, $post_object) {
                // Update the custom field value
                return update_post_meta($post_object->ID, 'citations', $value);
            },
            'schema' => array(
                'description' => 'Citations and references for the blog post',
                'type' => 'string',
                'context' => array('view', 'edit'),
            ),
        )
    );
}

// Hook into REST API initialization
add_action('rest_api_init', 'register_citations_rest_field');

/**
 * Alternative: Expose all custom fields (use with caution)
 * 
 * Uncomment this if you want to expose all custom fields via REST API.
 * This is less secure but useful for development.
 */
/*
function expose_all_custom_fields_in_rest($data, $post, $request) {
    $custom_fields = get_post_meta($post->ID);
    $data['meta'] = $custom_fields;
    return $data;
}
add_filter('rest_prepare_post', 'expose_all_custom_fields_in_rest', 10, 3);
*/

/**
 * For ACF (Advanced Custom Fields) users:
 * 
 * If you're using ACF, install the "ACF to REST API" plugin:
 * https://wordpress.org/plugins/acf-to-rest-api/
 * 
 * This plugin automatically exposes ACF fields via REST API.
 * No additional code is needed if you use ACF.
 */


