#!/usr/bin/env python
"""Update MindMap using data from `roadmap.puml`"""

__author__ = "Egor Tolstoy"
__maintaner__ = "Egor Tolstoy"

import os
import plantuml2freemind

# Constants
RELATIVE_PUML_FILEPATH = "../roadmap.puml"
RELATIVE_MM_FILEPATH = "../roadmap.mm"
RELATIVE_PNG_FILEPATH = "../roadmap.png"

PUML_FILEPATH = os.path.abspath(RELATIVE_PUML_FILEPATH)
MM_FILEPATH = os.path.abspath(RELATIVE_MM_FILEPATH)
PNG_FILEPATH = os.path.abspath(RELATIVE_PNG_FILEPATH)

def main():
    # Updating .mm
    os.system("plantuml2freemind convert {puml} {mm} --no-interaction".format(puml=PUML_FILEPATH, mm=MM_FILEPATH))

    # Updating png
    os.system("cat {puml} | java -jar plantuml.jar -charset UTF-8 -pipe > {png}".format(puml=PUML_FILEPATH, png=PNG_FILEPATH))

if __name__ == "__main__":
    main()
