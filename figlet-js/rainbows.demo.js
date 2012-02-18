// Rainbows edition by Nate Hunzaker

var Figlet = require("./figlet-node").Figlet,
    puts   = require("sys").puts,
    font   = process.argv[2] || "standard",
    phrase = process.argv.slice(3).join(" ") || "Figlet JS";

// Set the last argument to 'rainbows' to generate a colorful text treatment
Figlet.write(phrase, font, function(str) {
    puts(str);
}, 'rainbows');

