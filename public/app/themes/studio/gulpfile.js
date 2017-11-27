// Include gulp
var gulp = require('gulp')

// Include Our Plugins
var jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	postcss = require('gulp-postcss'),
	sass = require('gulp-sass'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	pxtorem = require('postcss-pxtorem'),
	lost = require('lost'),
	mqpacker = require('css-mqpacker'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
	fs = require('fs'),
	merge = require('merge-stream'),
	// dotenv = require('dotenv').load(),
	notify = require('gulp-notify'),
	svgstore = require('gulp-svgstore'),
	browserSync 	= require('browser-sync').create()

var siteUrl = 'quincy.me';
var path = require('path');
var notifyOptions = {};

// Use path.join() for path generation to avoid cross-platform issues.
var paths = {
	bundles: path.join('assets', 'bundles'),
	dist: path.join('assets', 'dist'),
	images: path.join('assets', 'images'),
	scripts: path.join('assets', 'scripts'),
	styles: path.join('assets', 'styles'),
	vendor: path.join('assets', 'vendor'),
	svg: path.join('assets', 'svg')
}

// Compile Our Styles
gulp.task('styles', function () {
  return gulp.src([
  		paths.styles + '/*.scss'
  	])
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(postcss([lost()]))
	.pipe(postcss([autoprefixer({
		browsers: ['last 5 versions']
	})]))
	.pipe(postcss([pxtorem({
		prop_white_list: [] // Leave Array Blank to transform all px values to rem
	})]))
	.pipe(postcss([mqpacker()]))
	.pipe(sourcemaps.write())
	.pipe(concat('custom.css'))
	.pipe(gulp.dest(paths.bundles))
	.pipe(browserSync.stream())
})

gulp.task('styles-libs', function () {
  return gulp.src([
  		paths.vendor + '/bootstrap/dist/css/bootstrap.min.css',
  		paths.vendor + '/font-awesome/css/font-awesome.min.css',
  		paths.vendor + '/fancyBox/dist/jquery.fancybox.min.css',
  		paths.vendor + '/nouislider/distribute/nouislider.min.css',
  		paths.vendor + '/slick-carousel/slick/slick.css',
  		paths.vendor + '/select2/dist/css/select2.css',
  		paths.vendor + '/datepicker-master/dist/datepicker.css',
  		paths.vendor + '/stacktable.js/stacktable.css',
  	])
  	.pipe(concat('libs.css'))
	.pipe(gulp.dest(paths.bundles))
})

gulp.task('styles-min', function () {
  return gulp.src([
  		paths.bundles + '/libs.css',
  		paths.bundles + '/custom.css'
  	])
  	.pipe(concat('all.css'))
	.pipe(gulp.dest(paths.bundles))
	.pipe(rename('all.min.css'))
	.pipe(postcss([cssnano()]))
	.pipe(gulp.dest(paths.dist))
})

// Concatenate & Minify JS
// gulp.task('scripts', function () {
// 	return gulp.src([
// 			paths.vendor + '/fancyBox/dist/jquery.fancybox.js',
// 			paths.vendor + '/slick-carousel/slick/slick.js',
// 			paths.vendor + '/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
// 			paths.vendor + '/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js',
// 			paths.vendor + '/nouislider/distribute/nouislider.js',
// 			paths.vendor + '/lodash/dist/lodash.js',
// 			paths.scripts + '/main/*.js'
// 		])
// 		.pipe(concat('all.js'))
// 		.pipe(gulp.dest(paths.bundles))
// 		.pipe(rename('all.min.js'))
// 		.pipe(uglify())
// 		.pipe(gulp.dest(paths.dist))
// })

// Lint javascript
gulp.task('jslint', function () {
	return gulp.src(paths.scripts + '/*/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
})

// Concatenate Libs JS
gulp.task('scripts-libs', function () {
	return gulp.src([
			paths.vendor + '/fancyBox/dist/jquery.fancybox.js',
			paths.vendor + '/datepicker-master/dist/datepicker.js',
			paths.vendor + '/slick-carousel/slick/slick.js',
			paths.vendor + '/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
			paths.vendor + '/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js',
			paths.vendor + '/nouislider/distribute/nouislider.js',
			paths.vendor + '/select2/dist/js/select2.js',
			paths.vendor + '/masonry/dist/masonry.pkgd.min.js',
			paths.vendor + '/isotope/dist/isotope.pkgd.min.js',
			paths.vendor + '/stacktable.js/stacktable.js',
			paths.vendor + '/lodash/dist/lodash.js'
		]) 
		.pipe(concat('libs.js'))
		.pipe(gulp.dest(paths.bundles))
})

// Concatenate & Minify JS in folders into one file per folder
gulp.task('scripts_folders', function () {
	var folders = fs.readdirSync(paths.scripts).filter(function (file) {
		return fs.statSync(path.join(paths.scripts, file)).isDirectory()
	})

	var tasks = folders.map(function (folder) {
		return gulp.src(path.join(paths.scripts, folder, '/*.js'))
			.pipe(concat(folder + '.js'))
			.pipe(gulp.dest(paths.bundles))
			.pipe(rename(folder + '.min.js'))
			.pipe(gulp.dest(paths.dist))
	})

	return merge(tasks)
})

// Concatenate & Minify JS deploy
gulp.task('scripts-deploy', function () {
	return gulp.src([
			paths.bundles + '/libs.js',
  			paths.bundles + '/main.js'
		])
		.pipe(concat('all.js'))
		.pipe(gulp.dest(paths.bundles))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist))
})

// jsreload
gulp.task('jsreload', ['jslint', 'scripts_folders'], function (done) {
	browserSync.reload();
	done();
});

// Compress Images
gulp.task('images', function () {
	return gulp.src(paths.images + '/*')
		.pipe(imagemin())
		.pipe(gulp.dest(paths.images))
})

// Sprite SVG
gulp.task('svg', function () {
	notifyOptions.title   = 'SVG Store';
	notifyOptions.message = 'Le fichier <%= file.relative %> a été mis à jour';

	return gulp
		.src(`${paths.svg}/sources/*.svg`)
		.pipe(rename({ prefix: 'svg-' }))
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(rename('sprite.svg'))
		.pipe(gulp.dest(`${paths.svg}/`))
		.pipe(notify(notifyOptions));
});

// Watch Files For Changes
gulp.task('watch', ['styles-libs', 'styles', 'jslint', 'scripts-libs', 'scripts_folders'], function () {

	browserSync.init({
		proxy: siteUrl
	})

	gulp.watch(paths.scripts + '/*/*.js', {cwd: './'}, ['jsreload'])
	gulp.watch([paths.styles + '/*.scss', paths.styles + '/*/*.scss'], ['styles'])

	gulp.watch([
		'./*.php',
		'./*/*.php',
		'./*/*/*.php',
		'./*.twig',
		'./*/*.twig',
		'./*/*/*.twig',
		'./*/*/*/*.twig'
	])
	.on('change', browserSync.reload)

})

// Default Task
gulp.task('default', ['styles-libs', 'styles', 'jslint', 'scripts-libs', 'scripts_folders'])

gulp.task('deploy', ['styles-min', 'scripts-deploy'])