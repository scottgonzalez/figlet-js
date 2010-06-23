/**
 * Figlet JS node.js module
 * 
 * Copyright (c) 2010 Scott González
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://github.com/scottgonzalez/figlet-js
 */

var Figlet = require("./figlet").Figlet;

Figlet.loadFont = function(name, fn) {
	require("fs").readFile("./fonts/" + name + ".flf", "utf-8", function(err, contents) {
		fn(contents);
	});
};

exports.Figlet = Figlet;

