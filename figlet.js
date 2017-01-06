/**
 * Figlet JS
 * 
 * Copyright (c) 2010 Scott González
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
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
		        comments = +header[5],
		        firstline = lines[comments+1],
		        finalchar = firstline.charAt(firstline.length - 1);
		
		Figlet.fonts[name] = {
			defn: lines.slice(comments + 1),
		        hardblank: hardblank,
                        finalchar: finalchar,
			height: height,
			char: {}
		};
		fn();
	},
	
	parseChar: function(char, font) {
		var fontDefn = Figlet.fonts[font];
		var height = fontDefn.height
	        if (char < 32 || char > 126)
		    return Array(height).fill('')
		if (char in fontDefn.char) {
			return fontDefn.char[char];
		}
		
	        var start = (char - 32) * height,
			charDefn = [],
			i;
		for (i = 0; i < height; i++) {
			charDefn[i] = fontDefn.defn[start + i]
			.replace(RegExp(fontDefn.finalchar,"g"), "")
			.replace(RegExp("\\" + fontDefn.hardblank, "g"), " ");
		}
		return fontDefn.char[char] = charDefn;
	},

	write: function(str, font, fn) {
		Figlet.parseFont(font, function() {
			var chars = [],
				result = "";
			for (var i = 0, len = str.length; i < len; i++) {
			    var c = Figlet.parseChar(str.charCodeAt(i), font);
			    if (c) chars.push(c)
			}
			for (i = 0, height = chars[0].length; i < height; i++) {
				for (var j = 0; j < len; j++) {
					result += chars[j][i];
				}
				result += "\n";
			}
			fn(result);
		});
	}
};

})();

