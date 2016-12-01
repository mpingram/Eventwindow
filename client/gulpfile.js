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
		// send to dist
		.pipe(gulp.dest('../server/dist/app'));
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

gulp.task('moveHtml', function(){
	return gulp.src('./app/**/*.html')
		.pipe(gulp.dest('../server/dist/app'));
});

// minify images
gulp.task('imagemin', function(){
	return gulp.src('app/images/*').
		pipe(imagemin()).
		pipe(gulp.dest('../server/dist/images'));
});


// move bower dependencies over
gulp.task('moveBowerComponents', function(){
	return gulp.src('app/bower_components/**/*.*', {base:'./'}).
		pipe(gulp.dest('../server/dist'));
});

// move the fucking favicon
gulp.task('moveFavicon', function(){
	return gulp.src('./favicon.ico').
		pipe(gulp.dest('../server/dist'));
});

gulp.task('moveAngularCode', function(){
	return gulp.src('./node_modules/@angular/core/bundles/core.umd.min.js')
		.pipe(gulp.dest('../server/dist/node_modules/@angular/core/bundles'));
});

gulp.task('moveRx', function(){
	return gulp.src('./node_modules/rxjs-es/**/*' )
		.pipe(gulp.dest('../server/dist/node_modules/rxjs-es' ));
});

// live reload browser
gulp.task('browserSync', function(){
	browserSync.init({
		startPath: '/index.html',
		open: 'ui',
		server: {
			// development server
			baseDir: '../server/dist',
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
	return del.sync('../server/dist/*', {force:true});
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
	runSequence('clean:dist', ['moveBowerComponents', 'moveHtml', 'moveAngularCode', 'moveRx', 'moveFavicon','sassCompile','imagemin','useref'], callback );
});

// compile sass, launch server, and watch
gulp.task('default', function(callback){
	runSequence( ['moveBowerComponents', 'sassCompile','browserSync','useref','watch'], callback);
});