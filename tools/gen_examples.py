#!/usr/bin/env python
"""Update MindMap using data from `roadmap.puml`"""

__author__ = "Egor Tolstoy"
__maintaner__ = "Egor Tolstoy"

import os
import plantuml2freemind

# Constants
RELATIVE_EXAMPLES_FILEPATH = "../examples"

EXAMPLES_FILEPATH = os.path.abspath(RELATIVE_EXAMPLES_FILEPATH)

def main():
    for file in os.listdir(EXAMPLES_FILEPATH):
        if file.endswith(".puml"):
            name = file.split(".")[0]
            os.system("plantuml2freemind convert {path}/{puml} {path}/{filename}.mm --no-interaction".format(path=EXAMPLES_FILEPATH, puml=file, filename=name))


if __name__ == "__main__":
    main()
