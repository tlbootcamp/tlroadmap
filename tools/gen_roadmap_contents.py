#!/usr/bin/env python
"""Update table of content in main `README.md` using data from `roadmap.mm`"""

__author__ = "Pavel Kedrinskiy"
__maintaner__ = "Pavel Kedrinskiy"


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
RELATIVE_ROADMAP_FILEPATH = "../roadmap.mm"
RELATIVE_PUML_FILEPATH = "../roadmap.puml"
RELATIVE_LINKS_FILEPATH = "links.json"
RELATIVE_ALTERNATIVE_NAMES_FILEPATH = "alternative_names.json"

README_FILEPATH = os.path.abspath(RELATIVE_README_FILEPATH)
ROADMAP_FILEPATH = os.path.abspath(RELATIVE_ROADMAP_FILEPATH)
PUML_FILEPATH = os.path.abspath(RELATIVE_PUML_FILEPATH)
LINKS_FILEPATH = os.path.abspath(RELATIVE_LINKS_FILEPATH)
ALTERNATIVE_NAMES_FILEPATH = os.path.abspath(RELATIVE_ALTERNATIVE_NAMES_FILEPATH)

LINKS = json.loads(open(LINKS_FILEPATH, "r").read())
ALTERNATIVE_NAMES = json.loads(open(ALTERNATIVE_NAMES_FILEPATH, "r").read())


def get_tree_text(node, level=-2):
    result = []
    tab = "    "
    text = node.get("TEXT")
    link = LINKS.get(text)
    text = ALTERNATIVE_NAMES.get(text, text)
    if text:
        if level == -2:
            result.append("\n## {}\n".format(text))
        elif level == -1:
            result.append("\n### {}\n".format(text))
        elif link:
            result.append("{}- [{}]({})\n".format(tab * level, text, link))
        else:
            result.append("{}- {}\n".format(tab * level, text))
    for sub_node in node:
        result.append(get_tree_text(sub_node, level=level + 1))
    return "".join(result)

def main():
    with open(README_FILEPATH, "r") as old_readme:
        old_readme_content = old_readme.read()

        # Updating knowledge base
        os.system("plantuml2freemind convert {puml} roadmap.md --no-interaction".format(puml=PUML_FILEPATH))
        with open("test.md", "r") as new_readme:
            new_readme_content = new_readme.read()

        begin, middle = old_readme_content.split(CONTENTS_BEGIN)
        middle, end = middle.split(CONTENTS_END)
        
        print(new_readme_content)
        # Little hack to delete 1st string
        updated_middle = new_readme_content.split("\n\n")[1]
        updated_readme_contents = "{}{}\n{}\n{}{}".format(
            begin, CONTENTS_BEGIN, updated_middle, CONTENTS_END, end
        )

        with open(README_FILEPATH, "w") as updated_readme:
            updated_readme.write(updated_readme_contents)


if __name__ == "__main__":
    main()
