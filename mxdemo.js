(function($) {
    $.fn.mxdemo = function (text, alph, fontPath) {
        fontPath = (fontPath || 'fonts') + '/'
        $.get (fontPath, function (data) {
            var re = new RegExp ('href="(.*?)"', 'g'), match, fonts = []
            while (match = re.exec(data)) {
                fonts.push (match[1])
            }
            var outDiv = $('<div>'),
                textInput = $('<input type="text">').text(text),
                alphInput = $('<input type="text">').text(alph),
                fontMenu = $('<select>').append (fonts.map (function (font) { return $('<option>').attr('value',font).text('font') }))
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
            $(this).append(outDiv,textInput,alphInput,fontMenu)
            update()
        })
    }
})(jQuery);
