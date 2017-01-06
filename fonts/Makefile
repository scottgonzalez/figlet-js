index.html:
	echo "<html><head></head><body><h1>Fonts</h1><ul>" >$@
	ls *.flf | sed 's/\(.*\)/<li><a href="\1">\1<\/a><\/li>/' >>$@
	echo "</ul></body></html>" >>$@
