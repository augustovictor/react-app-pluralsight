'use strict';

var gulp       = require( 'gulp' );
var connect    = require( 'gulp-connect' ); // Run local dev server
var open       = require( 'gulp-open' ); // Open a url in browser
var browserify = require( 'browserify' ); // Bundle js
var reactify   = require( 'reactify' ); // Transform React JSX to JS
var source     = require( 'vinyl-source-stream' ); // Use conventional text streams with Gulp
var concat     = require( 'gulp-concat' ); // Concatenates files
var lint = require( 'gulp-eslint' ); // Lint our js files and JSX

var config = {
	port: 3000,
	devBaseUrl: 'http://localhost',
	paths: {
		html   : './src/*.html',
		js     : './src/**/*.js',
		mainJs : './src/main.js',
		css    : [
    		'node_modules/bootstrap/dist/css/bootstrap.min.css',
    		'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
		],
		dist   : './dist'
	}
};

// Start local dev server
gulp.task( 'connect', () => {

	connect.server( {
		root       : [ 'dist' ],
		port       : config.port,
		base       : config.devBaseUrl,
		livereload : true
	} );

} );

// This will execute connect first
gulp.task( 'open', [ 'connect' ], () => {

	gulp.src( 'dist/index.html' )
        .pipe( open( '', { url: config.devBaseUrl + ':' + config.port + '/' } ) );

} );

// Get all html files and put them in dist folder then reload using connect
gulp.task( 'html', () => {

	gulp.src( config.paths.html )
	   .pipe( gulp.dest( config.paths.dist ) ) // Destination
       .pipe( connect.reload() );

} );

gulp.task( 'js', () => {

	browserify( config.paths.mainJs )
    	.transform( reactify )
        .bundle()
        .on( 'error', console.error.bind( console ) )
        .pipe( source( 'bundle.js' ) )
        .pipe( gulp.dest( config.paths.dist + '/scripts' ) )
        .pipe( connect.reload() );

} );

gulp.task( 'css', () => {

	gulp.src( config.paths.css )
	.pipe( concat( 'bundle.css' ) )
    .pipe( gulp.dest( config.paths.dist + '/css' ) )
    .pipe( connect.reload() );

} );

gulp.task( 'lint', () => {

	return gulp.src( config.paths.js )
	.pipe( lint( { config: 'eslint.config.json' } ) )
    .pipe( lint.format() );

} );

gulp.task( 'watch', () => {

	gulp.watch( config.paths.html, [ 'html' ] );
	gulp.watch( config.paths.js, [ 'js' ] );
	gulp.watch( config.paths.js, [ 'js', 'lint' ] )

} );

gulp.task( 'default', [ 'html', 'js', 'css', 'lint', 'open', 'watch' ] );
