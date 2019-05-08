//== ref: https://github.com/cferdinandi/gulp-boilerplate

//== Packages
var {gulp, src, dest, watch, series, parallel} = require('gulp'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    flatmap = require('gulp-flatmap'),
    header = require('gulp-header'),
    jshint = require('gulp-jshint'),
    lazypipe = require('lazypipe'),
    minify = require('gulp-cssnano'),
    optimizejs = require('gulp-optimize-js'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    stylish = require('jshint-stylish'),
    terser = require('gulp-terser');

var config = require('./config.json'),
    package = require('./package.json');

var banner = {
	full:
		'/*!\n' +
		' * <%= package.name %>\n' +
		' * <%= package.description %>\n' +
		' * (c) ' + new Date().getFullYear() + ' <%= package.author %>\n' +
		' * <%= package.license %> License\n' +
		' */\n\n',
	min:
		'/*!' +
		' <%= package.name %>' +
		' | (c) ' + new Date().getFullYear() + ' <%= package.author %>' +
		' | <%= package.license %> License' +
		' */\n',
};

//== Repeated JavaScript tasks
var jsTasks = lazypipe()
    .pipe(sourcemaps.init)
    .pipe(babel, {presets: ['@babel/env']})
	.pipe(header, banner.full, {package: package})
	.pipe(optimizejs)
	.pipe(dest, config.paths.scripts.output.full)
    .pipe(terser)
	.pipe(rename, {prefix: 'rp.', suffix: '.min'})
	.pipe(optimizejs)
	.pipe(header, banner.min, {package: package})
    .pipe(sourcemaps.write)
	.pipe(dest, config.paths.scripts.output.min);

var jsVendorTasks = lazypipe()
    .pipe(sourcemaps.init)
	.pipe(dest, config.paths.scripts.output.full)
	.pipe(rename, {prefix: 'rp.', suffix: '.min'})
	.pipe(dest, config.paths.scripts.output.min);

//== Check if resource should be built
var checkActive = function(name, type) {
    if (config.active[type].all) {
        return true;
    }

    if (config.active[type].hasOwnProperty(name)) {
        return (config.active[type][name]) ? true : false;
    }

    return false;
};

//== Lint, minify, and concatenate scripts
var buildScripts = function(done) {
	return src(config.paths.scripts.input)
		.pipe(flatmap(function(stream, file) {
            if (checkActive(file.relative.replace('.js', ''), 'scripts')) {
                console.log('Build script: ' + config.paths.scripts.output.min + file.relative);

                if (file.isDirectory()) {
                    var sources = file.path + '/*.js';

                    if (config.orders.hasOwnProperty(file.relative)) {
                        sources = [];

                        config.orders[file.relative].forEach(function(name) {
                            sources.push(file.path + '/' + name + '.js');
                        });
                    }

                    if (file.relative !== 'vendor') {
                        src(sources)
                            .pipe(jshint())
                            .pipe(jshint.reporter('jshint-stylish'));
                    } else {
                        return src(sources)
                            .pipe(concat(file.relative + '.js'))
                            .pipe(jsVendorTasks());
                    }

                    return src(sources)
                        .pipe(concat(file.relative + '.js'))
                        .pipe(jsTasks());
                } else {
                    return stream.pipe(jsTasks());
                }
            }

            return stream;
		}));
};

//== Process, lint, and minify Sass files
var buildStyles = function(done) {
	return src(config.paths.styles.input)
        .pipe(flatmap(function(stream, file) {
            if (!file.isDirectory() && checkActive(file.relative.replace('.scss', ''), 'styles')) {
                console.log('Build style: ' + config.paths.styles.output.min + file.relative);

                stream.pipe(sourcemaps.init())
                    .pipe(sass({
                        outputStyle: 'expanded',
                        sourceComments: true
                    }).on('error', sass.logError))
                    .pipe(prefix({
                        browsers: ['last 2 version', '> 0.25%'],
                        cascade: true,
                        remove: true
                    }))
                    .pipe(header(banner.full, { package : package }))
                    .pipe(dest(config.paths.styles.output.full))
                    .pipe(rename({prefix: 'rp.', suffix: '.min'}))
                    .pipe(minify({
                        discardComments: {
                            removeAll: true
                        }
                    }))
                    .pipe(header(banner.min, { package : package }))
                    .pipe(sourcemaps.write(''))
                    .pipe(dest(config.paths.styles.output.min));
            }

            return stream;
        }));
};

//== Watch for changes to the src directory
var startServer = function(done) {
	browserSync.init({
        proxy: 'https://' + config.localhost,
        host: config.localhost,
        open: 'external',
        stream: true,
        https: {
            key: config.ssl + '.key',
            cert: config.ssl + '.crt'
        }
	});

	done();
};

//== Reload the browser when files change
var reloadBrowser = function(done) {
	browserSync.reload();
	done();
};

//== Watch for changes
var watchScripts = function(done) {
	watch(config.paths.input.scripts, series(
        buildScripts,
        reloadBrowser
    ));
	done();
};

var watchStyles = function(done) {
	watch(config.paths.input.styles, series(
        buildStyles,
        reloadBrowser
    ));
	done();
};

//== Default: Watch and reload
exports.default = series(
	startServer,
	parallel(
        watchScripts,
        watchStyles
    )
);

//== Build task: build only
exports.build = series(
	parallel(
		buildScripts,
		buildStyles
	)
);
