var gulp = require('gulp'),
	bowerFiles = require('main-bower-files'),
	inject = require('gulp-inject'),
	es = require('event-stream'),
	angularFilesort = require('gulp-angular-filesort'),
	less = require('gulp-less'),
	browserSync = require('browser-sync'),
	templateCache = require('gulp-angular-templatecache'),
	minifyHTML = require('gulp-minify-html'),
	ngAnnotate = require('gulp-ng-annotate');


gulp.task('build',['templates'], function(){
	var cssFiles = gulp.src('./src/content/styles/app.less')
		.pipe(less())
		.pipe(gulp.dest('./build'));

	var jsFiles = gulp.src('./src/app/**/*.js')
		.pipe(angularFilesort())
		.pipe(ngAnnotate({
			add: true,
			single_quotes: true
		}));

	return gulp.src('./src/index.html')
		.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', base: 'src/lib'}))
		.pipe(inject(es.merge(
			cssFiles,
			jsFiles
		)))
		.pipe(gulp.dest('./build'));
});


gulp.task('serve', function () {
	browserSync({
		server: {
			baseDir: './',
			index: 'build/index.html'
		},
		browser: ['google chrome','firefox'],
		ghostMode: false
	});
});


gulp.task('templates', function() {
	return gulp.src('./src/app/**/*.html')
		.pipe(minifyHTML({
			empty: true,
			spare: true,
			quotes: true
		}))
		.pipe(templateCache({
			standalone: true
		}))
		.pipe(gulp.dest('tmp'));
});


gulp.task('bs-reload', function(){
	browserSync.reload();
});


gulp.task('default',['build','serve'], function(){
	gulp.watch('src/**/*.js', ['build', 'bs-reload']);
	gulp.watch('src/**/*.html', ['build', 'bs-reload']);
	gulp.watch('src/content/styles/app.less', ['build', 'bs-reload']);
});

