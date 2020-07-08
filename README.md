## Quickstart guide

* Clone or download this Git repo onto your computer.
* Install [Node.js](https://nodejs.org/en/) if you don't have it yet.
* Run `npm install`
* Run `gulp` to run the default Gulp task

In this proejct, Gulp is configured to run the following functions:

* Compile the SCSS files to CSS
* Autoprefix and minify the CSS file
* Concatenate the JS files
* Uglify the JS files
* Move final CSS and JS files to the `/dist` folder
 
 
 #For images 
 * Put images in folder 'app/images'
 * Run `gulp imgTask`
 * Images will optimize and minify and their are used from folder 'dist/images'

#Copy fonts
* Put fonts in folder 'app/fonts'
* Run `gulp fontsTask`