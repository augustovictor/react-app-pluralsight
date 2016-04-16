'use strict';

var React = require( 'react' );

var Home = React.createClass( {
	render: () => {
        return(
            <div className='jumbotron'>
                <h1>Pluralsight Admin</h1>
                <p>React, React router and Flux for ultra-responsive web-apps</p>
            </div>
        );
	}
} );

module.exports = Home;
