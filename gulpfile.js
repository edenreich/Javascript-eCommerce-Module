const gulp = require('gulp');
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
		   		input: "./src/TurboEcommerce.js",
				format: "iife",
				treeshake: false,
				name: "TurboEcommerce"
		   	}))
		   	.pipe(babel())
		   	.pipe(sourcemaps.write())
		   	.pipe(rename('bundle.js'))
		   	.pipe(notify({
	            title: "bundle.js has been Compiled"
	        }))
		   	.pipe(gulp.dest('demo/client/js/'));
});

gulp.task('build-min', () => {
	gulp.src([
				'src/**/*.js'
			])
			.pipe(plumber())
			.pipe(sourcemaps.init())
		   	.pipe(rollup({
		   		input: "./src/TurboEcommerce.js",
				format: "iife",
				treeshake: false,
				name: "TurboEcommerce"
		   	}))
		   	.pipe(babel({
		   		presets: ['es2015']
		   	}))
		   	.pipe(sourcemaps.write())
		   	.pipe(rename('bundle.min.js'))
		   	.pipe(notify({
	            title: "bundle.min.js has been Compiled"
	        }))
	        .pipe(uglify())
		   	.pipe(gulp.dest('demo/client/js/'));
});

gulp.task('build-node-module', () => {
	gulp.src([
				'src/**/*.js'
			])
			.pipe(plumber())
		   	.pipe(rollup({
		   		input: "./src/TurboEcommerce.js",
				format: 'cjs',
				treeshake: false,
				name: "TurboEcommerce"
		   	}))
		   	.pipe(babel({
		   		presets: ['es2015']
		   	}))
		   	.pipe(rename('node-module.js'))
		   	.pipe(notify({
	            title: "node-module.js has been Compiled"
	        }))
		   	.pipe(gulp.dest('demo/client/js/'));
});

gulp.task('build-node-module-min', () => {
	gulp.src([
				'src/**/*.js'
			])
			.pipe(plumber())
			.pipe(sourcemaps.init())
		   	.pipe(rollup({
		   		input: "./src/TurboEcommerce.js",
				format: 'cjs',
				treeshake: false,
				name: "TurboEcommerce"
		   	}))
		   	.pipe(babel({
		   		presets: ['es2015']
		   	}))
		   	.pipe(sourcemaps.write())
		   	.pipe(rename('node-module.min.js'))
		   	.pipe(notify({
	            title: "node-module.min.js has been Compiled"
	        }))
	        .pipe(uglify())
		   	.pipe(gulp.dest('demo/client/js/'));
});

gulp.task('default', ['build', 'build-min', 'build-node-module', 'build-node-module-min'], () => {
	gulp.watch('src/**/*.js', ['build', 'build-min', 'build-node-module', 'build-node-module-min']);
});
