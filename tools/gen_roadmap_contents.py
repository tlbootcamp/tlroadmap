#!/usr/bin/env python
"""Update table of content in main `README.md` using data from `roadmap.mm`"""

__author__ = "Pavel Kedrinskiy"
__maintaner__ = "Pavel Kedrinskiy"


# standard libs
import os
import json

# third party libs
import lxml.etree as et

# Constants
CONTENTS_BEGIN = "<!--roadmap.mm table of contents begin-->"
CONTENTS_END = "<!--roadmap.mm table of contents end-->"

RELATIVE_README_FILEPATH = "../README.md"
RELATIVE_ROADMAP_FILEPATH = "../roadmap.mm"
RELATIVE_LINKS_FILEPATH = "links.json"
RELATIVE_ALTERNATIVE_NAMES_FILEPATH = "alternative_names.json"

README_FILEPATH = os.path.abspath(RELATIVE_README_FILEPATH)
ROADMAP_FILEPATH = os.path.abspath(RELATIVE_ROADMAP_FILEPATH)
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
    with open(ROADMAP_FILEPATH, "r") as f:
        xml = f.read()
        parser = et.XMLParser(strip_cdata=False)
        tree = et.fromstring(xml, parser)
        readme_contents = []
        for node in tree.xpath("/map/node/node"):
            readme_contents.append(get_tree_text(node))

        readme_contents_txt = "".join(readme_contents)

        with open(README_FILEPATH, "r") as old_readme:
            old_readme_content = old_readme.read()

        begin, middle = old_readme_content.split(CONTENTS_BEGIN)
        middle, end = middle.split(CONTENTS_END)
        updated_middle = readme_contents_txt
        updated_readme_contents = "{}{}{}{}{}".format(
            begin, CONTENTS_BEGIN, updated_middle, CONTENTS_END, end
        )
        with open(README_FILEPATH, "w") as updated_readme:
            updated_readme.write(updated_readme_contents)


if __name__ == "__main__":
    main()
