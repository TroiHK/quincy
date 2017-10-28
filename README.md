
Studio by Engrain Wordpress
===========================

A modern WordPress stack that helps you get started with the best development
tools and project structure.

This project began as a fork of [Bedrock](https://roots.io/bedrock/) v1.7.2 and
modified to support Engrain tooling and best practices.

## Table Of Contents

[TOC]

## Features

* Better folder structure.
* Dependency management with [Composer](http://getcomposer.org).
* Managable WordPress configuration through Environment variables with
  [Dotenv](https://github.com/vlucas/phpdotenv).
* Autoloader for mu-plugins (use regular plugins as mu-plugins).
* Enhanced security (separated document root and secure passwords with
  [wp-password-bcrypt](https://github.com/roots/wp-password-bcrypt)).

## Requirements

* PHP >= 5.6
* Composer - [Install](https://getcomposer.org/doc/00-intro.md)

## Installation

1. Create a new project in a new folder:

```bash
composer create-project studio/wordpress-property your-project-folder-name --repository-url=https://composer.registry.engrain.io --prefer-dist
```

2. Copy `.env.dist` to `.env` and update environment variables:
  * `DB_DATABASE` - Database name
  * `DB_USERNAME` - Database user
  * `DB_PASSWORD` - Database password
  * `DB_HOST` - Database host
  * `WP_ENV` - Set to environment (`development`, `production`)
  * `WP_HOME` - Full URL to WordPress home (http://example.com)

3. Access WP admin at `http://example.com/wp/wp-admin`

## Studio Theme

### Features

* Better folder structure.
* JS Plugin management with [Bower](https://bower.io/).
* Separation of logic and views using [Timber](http://timber.github.io/timber/)
  based off the [Twig](http://twig.sensiolabs.org/) template engine.
* Gulp Task for concatenating Sass and JS files 

### Requirements

* Node.js (LTS) - [nodejs.org](http://nodejs.org)
* Bower - [bower.io](http://bower.io)
* Wordpress Installation - [wordpress.org](https://wordpress.org/)

### Plugin Requirements

> _IMPORTANT:_ All plugins must be installed through Composer

* Advanced Custom Fields - [advancedcustomfields.com](https://www.advancedcustomfields.com/)
`composer require wp-plugin/advanced-custom-fields-pro`
* Timber - [timber.github.io/timber/](http://timber.github.io/timber/)
`composer require wpackagist-plugin/timber-library`

### Installation

1. Make sure you have installed the plugins for the Timber Library and Advanced
   Custom Fields.

2. Move this theme into your themes directory in your WordPress installation.

3. Rename the folder to something that makes sense for the website. It should be
   a short name hyphens for spaces - and all lowercase.

4. Activate the theme in Appearance > Themes.
  `Appearance > Themes > Activate`

5. You should see a notice that Timber needs to be activated; go to
   `Plugins > All` and activate both Timber and Advanced Custom Fields
   (ACF for short.)

6. Sync Advanced Custom Field Options `Custom Fields > Field Groups > Sync`

* `Global Content` - Overall Theme Options
* `Floorplans` - Default Items for Floorplan Post Type
* `SEO` - SEO fields needed for all pages

### Installing and Running Gulp

> _IMPORTANT:_ Must be in the top level of the theme.

* `npm install` - Installs all Node Packages needed for the gulp task.
* `npm start` - Watches the `assets/styles` and `assets/js` folders for changes.

### Installing Javascript Plugins using Bower

> _IMPORTANT:_ Must be in the top level of the theme.

* Install packages with `bower install`. Bower installs packages to
  `assets/vendor`.

## Changelog

For a list of changes, see `CHANGELOG.md`.

If you are contributing to the project, please remember, it is *your*
responsibility to to keep the Changelog update-to-date and relevant.

# Contributing

The following is a set of expected guidelines for contributing to the project.
If these guidelines do not cover a particular situation or topic, use your best
judgment and feel free to propose changes to this document during code reviews.

## ENQUEUING SYLES AND SCRIPTS

As of update v1.2.5 any added styles and scripts that need to be added to the theme for plugin use, need to be enqueued. Please enqueue in the document functions/enqueue.php.
Can reference the document for examples on how to handle this properyly. Can also reference - https://developer.wordpress.org/reference/functions/wp_enqueue_script/
and 
https://developer.wordpress.org/reference/functions/wp_enqueue_style/
master.css is still linked through header.

## Project Maintenance

This section should provide detailed information regarding project-specific
deviations and maintenance. If the project has not changed in a meaningful way
from the base, then it's acceptable to leave this section _as is_.

## Style Guides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature").
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
* Reference issues liberally.
* Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code.
    * :racehorse: `:racehorse:` when improving performance.
    * :non-potable_water: `:non-potable_water:` when plugging memory leaks.
    * :memo: `:memo:` when writing docs.
    * :cop: `:cop:` when enforcing standards and best practices.
    * :bug: `:bug:` when fixing a bug.
    * :fire: `:fire:` when removing code or files.
    * :white_check_mark: `:white_check_mark:` when adding tests.
    * :lock: `:lock:` when dealing with security.
    * :arrow_up: `:arrow_up:` when upgrading dependencies.
    * :arrow_down: `:arrow_down:` when downgrading dependencies.

### PHP Style Guide

* In general, we follow [PSR-2](http://www.php-fig.org/psr/psr-2) guidelines.
* For code documentation, use thoughtfully-worded, well-structured
 [PHPDoc](http://www.phpdoc.org) syntax.

### JavaScript Style Guide

* In general, we follow [JavaScript Standard Style](http://standardjs.com)
  guidelines.
* For code documentation, use thoughtfully-worded, well-structured
 [JSDoc](http://usejsdoc.org) syntax.

### Changelog Style Guide

* Use [Markdown](https://daringfireball.net/projects/markdown).
* Limit lines to 80 characters or less.
* Add related messages under groups, for example: `IMPROVEMENTS:`,
  `NEW FEATURES:`, `BUG FIXES:`, etc. Use all-caps casing for group names.
* Add messages to the `## Unreleased` heading during an unreleased development
  cycle. Note you'll need to create this heading before each stable release.

Example:

```markdown

Changelog
=========

## Unreleased

BREAKING CHANGES:

  - Remove Activation API (`/activations`).
    [<pvormittag@engrain.com>]
  - Upgrade `darkstar/foundation` package to `~2.0`.
    [<pdouglas@engrain.com>]

IMPROVEMENTS:

  - Update documentation in `README.md`.
    [<pvormittag@engrain.com>]

## 1.5.3 (2015-10-21)

DEPRECATION NOTICES:

  - The Activation API (`/activations`) is deprecated and will be removed in
    the next major release.
    [<pvormittag@engrain.com>]

BUG FIXES:

  - CLI install process fails (#101).
    [<pvormittag@engrain.com>]

```

### Documentation Style Guide

* Use [Markdown](https://daringfireball.net/projects/markdown).
* Limit lines to 80 characters or less.
