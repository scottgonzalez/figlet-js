var flatiron = require('flatiron'),
    Figlet   = require("./figlet-node").Figlet,
    fs       = require("fs"),
    path     = require('path'),
    port     = process.env.port || 3000,

    app      = flatiron.app,

    fonts    = fs.readdirSync("fonts").map(function(f) { 
        return f.split(".flf")[0]; 
    }).sort();

function lineify(str) {
    return 
}

app.use(flatiron.plugins.http);

app.router.get('/', function () {

    var q    = this.req.query,
        self = this;

    Figlet.write(q.text || "Hello World", q.font || "standard", function(str) {
        self.res.end(str);
    });
    
});

app.router.get('/browse', function () {

    var self = this,
        text = this.req.query.text,
        output = [];

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