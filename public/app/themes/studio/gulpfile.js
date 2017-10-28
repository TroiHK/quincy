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
	dotenv = require('dotenv').load()

var path = require('path')

// Use path.join() for path generation to avoid cross-platform issues.
var paths = {
	bundles: path.join('assets', 'bundles'),
	dist: path.join('assets', 'dist'),
	images: path.join('assets', 'images'),
	scripts: path.join('assets', 'scripts'),
	styles: path.join('assets', 'styles')
}

// Compile Our Styles
gulp.task('styles', function () {
  return gulp.src([paths.styles + '/*.scss', paths.styles + '/*.css'])
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
	.pipe(concat('master.css'))
	.pipe(gulp.dest(paths.bundles))
	.pipe(rename('master.min.css'))
	.pipe(postcss([cssnano()]))
	.pipe(gulp.dest(paths.dist))
})

// Concatenate & Minify JS
gulp.task('scripts', function () {
	return gulp.src(paths.scripts + '/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest(paths.bundles))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist))
})

// Lint javascript
gulp.task('jslint', function () {
	return gulp.src(paths.scripts + '/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
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
			.pipe(uglify())
			.pipe(gulp.dest(paths.dist))
	})

	return merge(tasks)
})

// Lint javascript
gulp.task('jslint_folders', function () {
	return gulp.src(paths.scripts + '/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
})

// Compress Images
gulp.task('images', function () {
	return gulp.src(paths.images + '/*')
		.pipe(imagemin())
		.pipe(gulp.dest(paths.images))
})

// Watch Files For Changes
gulp.task('watch', ['jslint', 'jslint_folders', 'styles'], function () {
	gulp.watch(paths.scripts + '/*.js', ['jslint', 'scripts'])
	gulp.watch(paths.scripts + '/*/*.js', ['jslint_folders', 'scripts_folders'])
	gulp.watch([paths.styles + '/*.scss', paths.styles + '/*.css'], ['styles'])
})

// Default Task
gulp.task('default', ['styles', 'scripts', 'scripts_folders'])
