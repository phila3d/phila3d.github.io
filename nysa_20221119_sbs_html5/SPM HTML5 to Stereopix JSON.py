"""
For creating a list of images formated for Stereopix JSON
from a Stereo Photomaker HTML5 file named
    "index_m.html".

The output list is in the file
    "NYSA_sbs_JSON_LIST.txt"
"""

spmfile = open("index_m.html", 'r').read().splitlines()
outlist = []
for line in spmfile:
    line = line.split("?")
    try:
##        line = (line[1].split(('"'))[0])
##        line = '{ "url": "%s" }' % line
##        outlist.append(line)

        outlist.append('{ "url": "%s" }' % (line[1].split(('"'))[0]))

    except IndexError:
        pass

open("NYSA_sbs_JSON_LIST.txt", 'w').write(",\n".join(outlist))
