
Changelog
=========

<!-- Place project specific changes here. Example: -->
<!--
## 1.0.0-1 (2016-03-30)

INTEGRATION:

  - Add Engrain plugin.
    [<pvormittag@engrain.com>]
-->

********************************************************************************


##1.2.5 (2017-05-23)

IMPORTANT NOTICES:
  -jquery git ignore has been updated to include the /dist folder so that when pulled it has all files.


##1.2.5 (2017-05-11)

IMPROVEMENTS

  -jQuery now comes pre loaded with this theme. And is Enqueued properly.
  -Enqueueing functionality is now ready to use. Instead of linking scripts in the footer, and styles in the header, Enqueue them in the file 'functionality/enqueue.php'. Please refer to README or the file on proper way to handle this functionality.

##1.2.4 (2017-05-09)

IMPROVEMENTS

  -Correct typo in twig-extensions-url
  -Add no paging functionality to floor plans and location pages

##1.2.3 (2017-05-09)

IMPROVEMENTS

  -Add Breakpoints to CSS Mixins. Instead of writing: 
    '@media only screen 
      and (min-device-width : 768px) 
      and (max-device-width : 1024px) { /* styles here */ }'
    you can now write:
    '@include breakpoint(tablet) {/* styles here */}'
    see _mixinin.scss for all sizes.
  -Change _helper.scss to reflect breakpoint styles

## v1.2.2 (2017-05-04)

IMPROVEMENTS:

  - Add '<footer>' tags.
  - Move 'wp_footer' hook to right above '</body>' tag.
  - Create Header partial & move menu.twig call into this file.
  - Add google analytics and tracking codes into head.
  - fix instructions in google analytics field in ACF
    [<casey@wearestudio.com>]

## v1.2.1 (2017-05-04)

MAINTENANCE:

  - Update to WordPress 4.7.4.
    [<casey@wearestudio.com>]
  - Add `.gitignore` back to `public/app/plugins`.
    [<casey@wearestudio.com>]

## 1.2.0 (2017-03-28)

IMPORTANT NOTICES:

  - `.gitignore` files have been removed from the `public/app/themes`,
    `public/app/plugins` and `public/app/mu-plugins` directories. This
    simplifies the developer worker-flow with the trade-off being plugins and
    themes installed via Composer will be tracked by the repository.
    [<pvormittag@engrain.com>]

MAINTENANCE:

  - Update to WordPress 4.7.3.
    [<pvormittag@engrain.com>]
  - Update Composer dependencies.
    [<pvormittag@engrain.com>]

BUG FIXES:

  - Invalid name in `themes/studio/package.json` causes `npm install` to fail.
    [<pvormittag@engrain.com>]

## 1.1.0 (2017-01-10)

IMPROVEMENTS:

  - Pass Google Maps API Key from theme options to ACF Pro plugin to avoid
    hard-coding.
    [<cmcallister@engrain.com>]

MAINTENANCE:

  - Upgrade Composer dependencies.
    [<pvormittag@engrain.com>]

## 1.0.0 (2016-12-20)

  - Initial release based on `studio/wordpress` v1.1.0.
    [<pvormittag@engrain.com>]

