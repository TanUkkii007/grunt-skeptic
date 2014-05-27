/*
 * grunt-skeptic
 * https://github.com/TanUkkii007/grunt
 *
 * Copyright (c) 2014 Yusuke Yasuda
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('skeptic', 'Update CSS and JS link query in your view file.', function() {
    var options = this.options({
      viewfile_path: 'views'
    });
    var query = new Date().getTime();


    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        grunt.log.writeln('File "' + filepath + '" is now with a query ' + query + ' in ');
        grunt.file.expand({noglobstar: false, debug: false, nocase: false}, options.viewfile_path).forEach(function(viewfile) {
          var content = grunt.file.read(viewfile);
          var regexp = new RegExp(filepath + '\\?*\\d*');
          var matched = content.match(regexp);
          if (matched && matched.length) {
            grunt.log.writeln('    "' + viewfile + '" on ' + matched.length + ' lines.');
            grunt.file.write(viewfile, content.replace(regexp, filepath + '?' + query));
          }
        });
      });
    });
  });

};
