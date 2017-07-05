A Gulp build process to prepare a website for deployment.

The build process fulfills the following criteria:

1. Concatenate and minify the JavaScript files
2. Compile SCSS into CSS in a concatenated and minified file
3. Generate JavaScript and CSS source maps
4. Compress any JPEG or PNG files
5. All output for the build process should be in a dist folder for distribution or deployment.

Extra feature: As a developer, when I run the default gulp command, it should continuously watch for changes to any .scss file in my project. When there is a change to one of the .scss files, the gulp styles command is run and the files are compiled, concatenated, and minified to the dist folder. The project should then reload in the browser, displaying the changes.
