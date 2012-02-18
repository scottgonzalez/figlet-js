var flatiron = require('flatiron'),
    path     = require('path'),
    Figlet   = require("../figlet-node").Figlet,
    port     = process.env.port || 3000,
    app      = flatiron.app,
    fs       = require("fs"),
    fonts    = fs.readdirSync(__dirname + "/../fonts").map(function(f) { 
        return f.split(".flf")[0]; 
    });

app.use(flatiron.plugins.http);

app.router.get('/', function () {

    var q    = this.req.query,
        self = this;

    Figlet.write(q.text || "Figlet JS", q.font || "standard", function(str) {
        self.res.end(str);
    });
    
});

app.router.get('/browse', function () {

    var self = this,
        text = this.req.query.text,
        output = [];

    fonts.forEach(function(f, index) {

        Figlet.write(text || f, f, function(str) {

            output.push("\n--- " + f + " " + Array(80 - f.length).join("-") + "\n\n" + str);
            
            (index === fonts.length - 1) && self.res.end(output.join("\n\n\n"));

        });

    });

});

app.start(port, function() {
    console.log("Figlet is listening to port", port);
});