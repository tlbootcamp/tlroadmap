#!/usr/bin/env python
"""Update table of content in main `README.md` using data from `roadmap.puml`"""

__author__ = "Pavel Kedrinskiy"
__maintaner__ = "Pavel Kedrinskiy & Egor Tolstoy"

# standard libs
import os
import json
from typing import List, cast
import re

# third party libs
import lxml.etree as et
import plantuml2freemind

# Constants
CONTENTS_BEGIN = "<!--roadmap.mm table of contents begin-->"
CONTENTS_END = "<!--roadmap.mm table of contents end-->"

RELATIVE_README_FILEPATH = "../README.md"
RELATIVE_PUML_FILEPATH = "../roadmap.puml"

README_FILEPATH = os.path.abspath(RELATIVE_README_FILEPATH)
PUML_FILEPATH = os.path.abspath(RELATIVE_PUML_FILEPATH)

def main():
    with open(README_FILEPATH, mode="r", encoding='utf-8') as old_readme:
        old_readme_content = old_readme.read()

        # Updating knowledge base
        os.system("plantuml2freemind convert {puml} roadmap.md --no-interaction".format(puml=PUML_FILEPATH))
        with open("roadmap.md", mode="r", encoding='utf-8') as new_readme:
            new_readme_content = new_readme.read()

        begin, middle = old_readme_content.split(CONTENTS_BEGIN)
        middle, end = middle.split(CONTENTS_END)
        
        # Little hack to delete 1st string
        updated_middle = new_readme_content.split("\n\n")[1]
        updated_readme_contents = "{}{}\n{}\n{}{}".format(
            begin, CONTENTS_BEGIN, updated_middle, CONTENTS_END, end
        )

        os.system("rm -rf roadmap.md")

        with open(README_FILEPATH, mode="w", encoding='utf-8') as updated_readme:
            updated_readme.write(updated_readme_contents)


if __name__ == "__main__":
    main()
