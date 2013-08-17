	 _______ _________ _______  _        _______ _________       _________ _______ 
	(  ____ \\__   __/(  ____ \( \      (  ____ \\__   __/       \__    _/(  ____ \
	| (    \/   ) (   | (    \/| (      | (    \/   ) (             )  (  | (    \/
	| (__       | |   | |      | |      | (__       | |    _____    |  |  | (_____ 
	|  __)      | |   | | ____ | |      |  __)      | |   (_____)   |  |  (_____  )
	| (         | |   | | \_  )| |      | (         | |             |  |        ) |
	| )      ___) (___| (___) || (____/\| (____/\   | |          |\_)  )  /\____) |
	|/       \_______/(_______)(_______/(_______/   )_(          (____/   \_______)

[Figlet](http://www.figlet.org/) is a program for making large letters out of ordinary text.

Figlet-JS is a JavaScript implementation of a FIGdriver and is available as a Node module and a jQuery plugin.

For detailed information on fonts for Figlet, check out [the FIGfont documentation](http://www.jave.de/figlet/figfont.html).

Usage
=====

Node
----

	var puts = require("sys").puts;
	var Figlet = require("./lib/figlet-node");
	Figlet.write("node.js", "epic", function(str) {
		puts(str);
	});

jQuery
------

	$("pre").figlet("jQuery", "graffiti");

Written for Marak to support [asciimo](http://github.com/marak/asciimo).

---

Support this project by [donating on Gittip](https://www.gittip.com/scottgonzalez/).
