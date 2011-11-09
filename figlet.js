/**
 * Figlet JS
 * 
 * Copyright (c) 2010 Scott González
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * Rainbows by Nate Hunzaker
 *
 * http://github.com/scottgonzalez/figlet-js
 */

(function() {

  var Figlet = (typeof exports !== "undefined" ? exports : window).Figlet = {
	  fonts: {},
	  
	  parseFont: function(name, fn) {
		  if (name in Figlet.fonts) {
			  fn();
			  return;
		  }
		  
		  Figlet.loadFont(name, function(defn) {
			  Figlet._parseFont(name, defn, fn);
		  });
	  },
	  
	  _parseFont: function(name, defn, fn) {
		  var lines = defn.split("\n"),
			header = lines[0].split(" "),
			hardblank = header[0].charAt(header[0].length - 1),
			height = +header[1],
			comments = +header[5];
		  
		  Figlet.fonts[name] = {
			  defn: lines.slice(comments + 1),
			  hardblank: hardblank,
			  height: height,
			  char: {}
		  };
		  fn();
	  },
	  
	  parseChar: function(char, font) {
		  var fontDefn = Figlet.fonts[font];
		  if (char in fontDefn.char) {
			  return fontDefn.char[char];
		  }
		  
		  var height = fontDefn.height,
			start = (char - 32) * height,
			charDefn = [],
			i;
		  for (i = 0; i < height; i++) {
			  charDefn[i] = fontDefn.defn[start + i]
				  .replace(/@/g, "")
				  .replace(RegExp("\\" + fontDefn.hardblank, "g"), " ");
		  }
		  return fontDefn.char[char] = charDefn;
	  },

	  write: function(str, font, fn, treatment) {
      
		  Figlet.parseFont(font, function() {
			  var chars = [],
				result = "";
			  for (var i = 0, len = str.length; i < len; i++) {
				  chars[i] = Figlet.parseChar(str.charCodeAt(i), font);
			  }
			  for (i = 0, height = chars[0].length; i < height; i++) {
				  for (var j = 0; j < len; j++) {
					  result += chars[j][i];
				  }
				  result += "\n";
			  }
        

        // If the treatment is set to 'rainbows', let's throw in the colors
        if (treatment === 'rainbows') {
          
          // Grab colors NPM package
          require('colors');

          var spectrum = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'],
              phrase   = result.split("\n"),
              slot     = 0;
          
          // Reset text
          result = "";
          
          // Add rainbow post-processing to each line
          phrase.forEach(function(i, d) {
            slot = (d > spectrum.length) ? d : d % spectrum.length;
            result += i[spectrum[slot]] + "\n";
          });

        }

        fn(result);
        
		  });
	  }
  };

})();

