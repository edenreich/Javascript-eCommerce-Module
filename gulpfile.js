const gulp = require('gulp');
// const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const rollup = require('gulp-rollup');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");

gulp.task('build', () => {
	return gulp.src([
					'src/**/*.js'
				])
				.pipe(plumber())
				.pipe(sourcemaps.init())
			   	.pipe(rollup({
			   		input: './src/eCommerce.js',
					format: 'iife',
					treeshake: false,
					name: 'eCommerce'
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

gulp.task('default', ['build'], () => {
	gulp.watch('src/**/*.js', ['build']);
});
