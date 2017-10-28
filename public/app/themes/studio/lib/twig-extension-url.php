<?php

/**
 * The Url Twig Extension class.
 *
 * @author Patrick Douglas <pdouglas@engrain.com>
 * @author Patrik Vormittag <pvormittag@engrain.com>
 */
class Studio_Twig_Extension_Url extends Twig_Extension
{
    /**
     * {@inheritDoc}
     */
    public function getName()
    {
        return 'Studio_Twig_Extension_Url';
    }

    /**
     * {@inheritDoc}
     */
    public function getFunctions()
    {
        return [
            new Twig_SimpleFunction('script_url', [$this, 'scriptUrl'], ['is_safe' => ['html']]),
            new Twig_SimpleFunction('style_url', [$this, 'styleUrl'], ['is_safe' => ['html']]),
        ];
    }

    /**
     * Creates a script URL with either a minified or non-minified version
     * depending on whether or not your are debugging.
     *
     * @param string $name The name of the file you'd like to load
     *
     * @return string A script URL with the appropiate file
     */
    public function scriptUrl($name)
    {
        $path = 'assets/dist/'.$name.'.min.js';

        if (WP_DEBUG === true) {
            $path = 'assets/bundles/'.$name.'.js';
        }

        // Use `get_stylesheet_directory_uri` as this function resolves the URI
        // for child themes in addition to the root theme.
        // https://developer.wordpress.org/reference/functions/get_stylesheet_directory_uri/#comment-1798

        return get_stylesheet_directory_uri().'/'.$path;
    }

    /**
     * Creates a style URL with either a minified or non-minified version
     * depending on whether or not your are debugging.
     *
     * @param string $name The name of the file you'd like to load
     *
     * @return string A style URL with the appropiate file
     */
    public function styleUrl($name)
    {
        $path = 'assets/dist/'.$name.'.min.css';

        if (WP_DEBUG === true) {
            $path = 'assets/bundles/'.$name.'.css';
        }

        // Use `get_stylesheet_directory_uri` as this function resolves the URI
        // for child themes in addition to the root theme.
        // https://developer.wordpress.org/reference/functions/get_stylesheet_directory_uri/#comment-1798

        return get_stylesheet_directory_uri().'/'.$path;
    }
}
