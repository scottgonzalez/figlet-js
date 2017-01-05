(function($) {
    $.fn.mxdemo = function (text, alph, fontPath) {
        var parentDiv = $(this)
        fontPath = (fontPath || 'fonts') + '/'
        $.get (fontPath, function (data) {
            var re = new RegExp ('href="(.*?)\.flf"', 'g'), match, fonts = []
            while (match = re.exec(data)) {
                fonts.push (match[1])
            }
            var outDiv = $('<div>'),
                textInput = $('<input type="text">').val(text),
                alphInput = $('<input type="text">').val(alph),
                fontMenu = $('<select>')
            fonts.forEach (function (font) {
                var opt = $('<option>').attr('value',font).text(font)
                if (font === $.fn.mxfiglet.defaultFont)
                    opt.attr('selected','selected')
                fontMenu.append (opt)
            })
            function update() {
                outDiv.mxfiglet (textInput.val(),
                                 { alphabet: alphInput.val(),
                                   font: fontMenu.val() })
            }
            var timer
            function change() {
                if (timer) clearTimeout(timer)
                timer = setTimeout (update, 100)
            }
            [textInput, alphInput, fontMenu].forEach (function (control) { control.change(change) })
            parentDiv.append(outDiv,textInput,alphInput,fontMenu)
            update()
        })
    }
})(jQuery);
