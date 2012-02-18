var flatiron = require('flatiron'),
    Figlet   = require("./figlet-js/figlet-node").Figlet,
    fs       = require("fs"),
    path     = require('path'),
    port     = process.env.port || 3000,

    app      = flatiron.app,

    fonts    = fs.readdirSync("./figlet-js/fonts").map(function(f) { 
        return f.split(".flf")[0]; 
    }).sort();

app.use(flatiron.plugins.http);

app.router.get('/', function () {

    var q    = this.req.query,
        self = this;

    // Show welcome screen if no text specified
    if (!q.text) {
        return fs.readFile("help.html", function(err, content) {
            self.res.end(content);
        });
    }

    // Warn user if font does not exist
    if (fonts.indexOf(q.font) === -1) {
        return self.res.end("Figlet Server: I don't know this font, sorry :(");
    }

    // We don't want massive text injections, do we?
    if (q.text.length > 500) {
        return self.res.end("Figlet Server: Woah woah, easy does it. I can only take 500 characters at a time!");
    }

    // Otherwise, write this sucker!
    Figlet.write(q.text, q.font || "standard", function(str) {
        self.res.end(str);
    });
    
});

app.router.get('/browse', function () {

    var self = this,
        text = this.req.query.text,
        output = [];

    // We don't want massive text injections, do we?
    if (text.length > 500) {
        return self.res.end("Figlet Server: Woah woah, easy does it. I can only take 500 characters at a time!");
    }

    fonts.forEach(function(f, index) {

        Figlet.write(text || f, f, function(str) {

            self.res[index !== fonts.length - 1 ? "write" : "end"]("\n--- " 
                                                                   + f 
                                                                   + " " 
                                                                   + Array(80 - f.length).join("-") 
                                                                   + "\n\n" 
                                                                   + str + "\n\n\n");
        });

    });

});

app.start(port, function() {
    console.log("Figlet is listening to port", port);
});