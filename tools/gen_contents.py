#!/usr/bin/env python
"""Update contents using data from `roadmap.puml`"""

__author__ = "Egor Tolstoy"
__maintaner__ = "Egor Tolstoy"

# standard libs
import os

def main():
    os.system("python3 gen_readme.py")
    os.system("python3 gen_mindmap.py")

if __name__ == "__main__":
    main()
