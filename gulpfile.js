const gulp = require('gulp');
// const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const rollup = require('gulp-rollup');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");
const uglify = require("gulp-uglify");

gulp.task('build', () => {
	gulp.src([
				'src/**/*.js'
			])
			.pipe(plumber())
			.pipe(sourcemaps.init())
		   	.pipe(rollup({
		   		input: './src/TurboeCommerce.js',
				format: 'iife',
				treeshake: false,
				name: 'TurboeCommerce'
		   	}))
		   	.pipe(babel({
		   		presets: ['es2015']
		   	}))
		   	.pipe(sourcemaps.write())
		   	.pipe(rename('bundle.js'))
		   	.pipe(notify({
	            title: "Javascript Compiled"
	        }))
		   	.pipe(gulp.dest('demo/js/'));
});

gulp.task('build-min', () => {
	gulp.src([
				'src/**/*.js'
			])
			.pipe(plumber())
			.pipe(sourcemaps.init())
		   	.pipe(rollup({
		   		input: './src/TurboeCommerce.js',
				format: 'iife',
				treeshake: false,
				name: 'TurboeCommerce'
		   	}))
		   	.pipe(babel({
		   		presets: ['es2015']
		   	}))
		   	.pipe(sourcemaps.write())
		   	.pipe(rename('bundle.min.js'))
		   	.pipe(notify({
	            title: "Javascript Compiled"
	        }))
	        .pipe(uglify())
		   	.pipe(gulp.dest('demo/js/'));
});

gulp.task('default', ['build', 'build-min'], () => {
	gulp.watch('src/**/*.js', ['build', 'build-min']);
});
