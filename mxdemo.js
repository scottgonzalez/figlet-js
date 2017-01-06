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
                fontMenu = $('<select>'),
	        mxCheckbox = $('<input type="checkbox">').attr('checked','checked'),
                alphInput = $('<input type="text">').val(alph),
	        alphLabel = $('<label>').append("Background chars:",alphInput)
            fonts.forEach (function (font) {
                var opt = $('<option>').attr('value',font).text(font)
                if (font === $.fn.mxfiglet.defaultFont)
                    opt.attr('selected','selected')
                fontMenu.append (opt)
            })
            function update() {
		if (mxCheckbox.is(':checked')) {
                    outDiv.empty().mxfiglet (textInput.val(),
                                             { alphabet: alphInput.val(),
                                               font: fontMenu.val() })
		    alphLabel.attr('disabled',false).fadeTo(0,1)
		} else {
                    outDiv.empty().append ($('<pre>').figlet (textInput.val(), fontMenu.val()))
		    alphLabel.attr('disabled',true).fadeTo(100,.5)
		}
            }
            var timer
            function change() {
                if (timer) clearTimeout(timer)
                timer = setTimeout (update, 100)
            }
	    textInput.on('input propertychange paste', change)
	    alphInput.on('input propertychange paste', change)
	    mxCheckbox.change(change)
	    fontMenu.change(change)
            parentDiv.append (outDiv,
			      $('<br>'),
			      $('<label>').append("Text:",textInput),
			      $('<label>').append("Font:",fontMenu),
			      $('<label>').append("Cascade:",mxCheckbox),
			      alphLabel)
            update()
        })
    }
})(jQuery);
