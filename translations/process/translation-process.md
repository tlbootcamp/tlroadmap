# Working on translations

This project introduces a simple translations versioning system. We want to have a simple way of finding a diff to be translated. Similar to decisions done with the CAP theorem, we sacrifice consistency (applying eventual consistency) to higher availability (documents in different languages). 

## Creating a new translation

To facilitate the process of finding and translating the diff, we add a commit hash of the doc in Russian, considered as the base language, to the end of the translated page, section "Translation notes. Here is [an example](README-en.md)

## Updating existing translation

If a translation simply improves wording or fixes small errors no additional changes required.

If a translation aims to mirror some changes in the original file, the whole diff between the old and new translations should be translated. 
1. Find the [diff](https://git-scm.com/docs/git-diff) between the already translated version and the version that is going to be translated.
1. Translate the changes, add improvements to existing parts if needed.
1. Update the "Translation notes" section in the updated translation file, changing the commit link to the original file version commit.

## Creating a doc that is not in Russian

We want to achieve a unidirectional flow of translations and chose Russian as a base language of the repo. As a result, we are asking everyone to kindly add Russian version to any document.

1. Find somebody who can help in translation the doc to Russian
1. Commit the Russian version and then use the steps above to add the target doc

### Tranlation notes
Translated doc version: _TBD in this pr_