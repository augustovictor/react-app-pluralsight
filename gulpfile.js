'use strict';

var gulp = require( 'gulp' );
var connect = require( 'gulp-connect' ); // Run local dev server
var open = require( 'gulp-open' ); // Open a url in browser

var config = {
	port: 3000,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		dist: './dist'
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

gulp.task( 'watch', () => {

	gulp.watch( config.paths.html, [ 'html' ] );

} );

gulp.task( 'default', [ 'html', 'open', 'watch' ] );