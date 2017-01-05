/**
 * Matrix-figlet JS jQuery Plugin
 * 
 * Copyright (c) 2010 Scott González, Ian Holmes
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://github.com/ihh/figlet-js
 * 
 * Requires figlet.js
 */
(function($) {

    // figlet    
    Figlet.loadFont = function(name, fn) {
        var prefix = name.charAt(0) === '/' ? name : ("fonts/" + name)
        $.ajax({
	    url: prefix + ".flf",
	    dataType: "text",
	    success: fn
	});
    };

    $.fn.figlet = function(text, font) {
	var elems = this;
	Figlet.write(text, font || $.fn.figlet.defaultFont, function(str) {
	    elems.text(str);
	});
	return this;
    };

    $.fn.figlet.defaultFont = "standard";

    // mxfiglet
    var maxMutations = 8
    var inCascadeDelay = 50
    var betweenCascadeDelay = 100
    var cascadeSpillProb = .1
    
    function randomChar(alphabet) {
        return alphabet.charAt (Math.floor (Math.random() * alphabet.length))
    }

    function spaces(n) {
        return new Array(n+1).join(" ")
    }

    $.fn.mxfiglet = function(text, opts) {
	var elems = this;
        opts = opts || {}
        var alphabet = opts.alphabet || $.fn.mxfiglet.defaultAlphabet
        var font = opts.font || $.fn.mxfiglet.defaultFont
        var padding = opts.padding || [ opts.paddingTop || $.fn.mxfiglet.defaultPadding.top,
                                        opts.paddingRight || $.fn.mxfiglet.defaultPadding.right,
                                        opts.paddingBottom || $.fn.mxfiglet.defaultPadding.bottom,
                                        opts.paddingLeft || $.fn.mxfiglet.defaultPadding.left ]
        Figlet.write(text, font, function(str) {
            var strLines = str.split("\n")
            strLines.pop()
            var strRows = strLines.length, strCols = strLines[0].length
            var lpad = spaces(padding[3]), rpad = spaces(padding[1]), pad = spaces(padding[3] + strCols + padding[1])
            var tpad = new Array(padding[0]).fill(pad), bpad = new Array(padding[2]).fill(pad)
            var lines = tpad.concat (strLines.map (function (line) { return lpad + line + rpad }), bpad)
            var rows = padding[0] + strRows + padding[2]
            var cols = padding[1] + strCols + padding[3]
            var grid = []
            for (var y = 0; y < rows; ++y) {
                var div = $('<div>')
                var row = []
                for (var x = 0; x < cols; ++x) {
                    var c = lines[y].charAt(x)
                    var spc = c === ' '
                    var span = $('<span>')
                    span
                        .text(spc ? randomChar(alphabet) : c)
                        .addClass(spc ? 'bg' : 'fg')
                    div.append(span)
                    row.push ({ spc: spc, span: span })
                }
                grid.push (row)
                elems.append (div)
            }
            elems.addClass('matrix-figlet')

            function randomLen() { return Math.floor (Math.random() * rows) }
            
            function startCascade() {
                var x = Math.floor (Math.random() * cols),
                    y = Math.floor ((Math.random() * 2 - 1) * rows),
                    len = randomLen()
                startMutating(x,y,len)
                setTimeout (startCascade, Math.random() * betweenCascadeDelay)
            }

            function startMutating(x,y,len) {
                if (x >= 0 && x < cols && y >= 0 && y < rows) {
                    var cell = grid[y][x]
                    cell.span.removeClass('pulse')
                    var nMutations = Math.ceil (Math.random() * maxMutations)
                    if (cell.spc)
                        setTimeout (mutate.bind(this,cell.span,nMutations), inCascadeDelay)
                }
                if (len > 0)
                    setTimeout (startMutating.bind(this,x,y+1,len-1), inCascadeDelay)
                if (Math.random() < cascadeSpillProb)
                    setTimeout (startMutating.bind(this,Math.random() < .5 ? x-1 : x+1,y,randomLen()), inCascadeDelay)
            }

            function mutate(span,n) {
                span.addClass('pulse')
                span.text (randomChar(alphabet))
                if (n > 0)
                    setTimeout (mutate.bind(this,span,n-1), inCascadeDelay)
            }
            
            startCascade()
        });
	return this;
    };

    $.fn.mxfiglet.defaultAlphabet = "0123456789abcdef";
    $.fn.mxfiglet.defaultFont = "roman";
    $.fn.mxfiglet.defaultPadding = { top: 3, right: 5, bottom: 1, left: 5 };

})(jQuery);
