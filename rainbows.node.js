// Rainbows edition by Nate Hunzaker

var Figlet = require("./figlet-node").Figlet;
var puts = require("sys").puts;

// Set the last argument to 'rainbows' to generate a colorful text treatment
Figlet.write("Figlet JS", "standard", function(str) {
    puts(str);
}, 'rainbows');

