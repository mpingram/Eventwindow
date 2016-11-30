'use strict';

const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const del = require('del');
const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const runSequence = require('run-sequence');
const modRewrite = require('connect-modRewrite');




// low-level tasks
// =================

// compile sass
gulp.task('sassCompile', function(){
	return gulp.src('app/**/*.scss')
		.pipe(sass())
		.on('error', function(err){
			console.log(err.toString());
			browserSync.notify(err.message, 3000);
			this.emit('end');
		})
		// autoprefix css
		.pipe( postcss ([ autoprefixer ({ browsers: ['> 0.5% in US'] }) ]) )
		// send back to dev env for now
		.pipe(gulp.dest('app/'));
});


// concatenate and minify scripts
gulp.task('useref', function(){
	return gulp.src('./index.html').
		pipe(useref()).
		// if javascript, minify it
		pipe(gulpIf('*.js', uglify())).
		// if css, minify it
		pipe(gulpIf('*.css', cssmin())).
		// send to production dist dir
		pipe(gulp.dest('../server/dist'));
});

// minify images
gulp.task('imagemin', function(){
	return gulp.src('app/images/*').
		pipe(imagemin()).
		pipe(gulp.dest('../server/dist/images'));
});


// move bower dependencies over
gulp.task('moveBowerComponents', function(){
	return gulp.src('app/bower_components/**/*.*', {base:'./app'}).
		pipe(gulp.dest('../server/dist'));
});

// move the fucking favicon
gulp.task('moveFavicon', function(){
	return gulp.src('app/favicon.ico').
		pipe(gulp.dest('../server/dist'));
});

// live reload browser
gulp.task('browserSync', function(){
	browserSync.init({
		startPath: '/index.html',
		open: 'ui',
		server: {
			// development server
			baseDir: './',
			middleware: [
				modRewrite([
					'^[^\\.]*$ /index.html [L]'
				])
			]
			// allows use of html5 history api urls
		}
	});
});

gulp.task('clean:dist', function(){
	return del.sync('../server/dist', {force:true});
});




// high-level tasks
// ==================

gulp.task('watch', ['browserSync','sassCompile'], function(){
	gulp.watch('app/**/*.scss', ['sassCompile']);
	gulp.watch('app/**/*.css', browserSync.reload);
	gulp.watch('app/**/*.js', browserSync.reload);
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('app/**/*.html', browserSync.reload);
});


// build production dist dir
gulp.task('build', function(callback){
	runSequence('clean:dist', ['moveBowerComponents','moveFavicon','sassCompile','imagemin','useref'], callback );
});

// compile sass, launch server, and watch
gulp.task('default', function(callback){
	runSequence( ['sassCompile','browserSync','watch'], callback);
});