const _PROJECTNAME = 'require';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync').create();

var tinypngToken = 'hHrU0V0DGG3tNna6R1sqNNOqqU-x1S4u';

// Content structure

var source = {
	content: '*',
	location: './'
};

source.js = {
	content: '*.js',
	location: 'js/'
};

source.index = {
	content: '*.html',
	location: './'
};

var dist = {
	content: '*',
	location: 'dist/'
};

dist.js = source.js;
dist.js.location = dist.location + dist.js.location;

// JS

gulp.task('js', function() {
	gulp.src(source.js.location + source.js.content)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(gulp.dest(dist.js.location + _PROJECTNAME + '.js'));
	gulp.src([dist.js.location + _PROJECTNAME + '.js'])
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(gulp.dest(dist.js.location));
});

gulp.task('watch', function () {
	gulp.watch(source.css.location + source.css.content, ['css']);
});

gulp.task('watch', ['css'], function () {
	browserSync.reload();
});

// Watch scss AND html files, doing different things with each.
gulp.task('serve', ['oai'], function () {

	// Serve files from the root of this project
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch(source.css.location + source.css.content, ['oai-watch']);
	gulp.watch(source.index.content).on("change", browserSync.reload);

});

gulp.task('default', ['serve']);