const { Page } = require('vuepress');

/**
 * Create non-clickable sidebar group.
 * @param {Page} page - vuepress.Page
 * @param {string} key - name of group (dir) or leaf
 * @returns {{children: [], collapsable: boolean, title: string, key: string}}
 */
function getGroupData(page, key) {
  return {
    key: key,
    title: page.frontmatter.title || page.title,
    children: [],
    collapsable: false,
  }
}

/**
 * Create sidebar clickable element.
 * @param {Page} page - vuepress.Page
 * @param {string} key - name of group (dir) or leaf
 * @returns {{children: *[], collapsable: boolean, title: string, path: string, key: string}}
 */
function getLeafData(page, key) {
  let leaf = getGroupData(page, key)
  leaf['path'] = page.path
  return leaf
}

/**
 * Find parent in tree structure.
 * Iterates over keys and on every step tries to find next subtree within children.
 * @param {{children: *[], collapsable: boolean, title: string, path: string, key: string}} tree
 * @param {string[]} keys
 * @returns {{children: *[], collapsable: boolean, title: string, path: string, key: string}}
 */
function findParent(tree, keys) {
  let parent = tree
  for (const key of keys) {
    for (const subtree of parent.children) {
      if (subtree.key === key) {
        parent = subtree;
        break;
      }
    }
  }
  return parent
}

let SIDEBAR_DATA = Object.create(null);
module.exports = (options, ctx) => ({
  name: "auto-sidebar-plugin",
  async ready() {
    let { pages } = ctx;

    pages = pages.sort((p1, p2) => {
      if (p1.path < p2.path) return -1;
      if (p1.path > p2.path) return 0;
      return 0;
    });

    const rootPage = pages[0]
    const tree = getLeafData(rootPage)

    for (const page of pages.slice(1)) {
      // split path by `/` and remove empty parts
      // /abc/ -> ["abc"]
      // /abc/d.html -> ["abc", "d.html"]
      const keys = page.path.split('/').filter(pathPart => pathPart)
      const parent = findParent(tree, keys)

      if (page._strippedContent.trim()) {
        // if page has content we should create clickable PageLeaf
        parent.children.push(getLeafData(page, keys[keys.length - 1]))
      } else {
        parent.children.push(getGroupData(page, keys[keys.length - 1]))
      }
    }

    SIDEBAR_DATA = [
      tree,
    ]
  },
  async enhanceAppFiles() {
    return {
      name: 'auto-sidebar-enhance-app',
      content: `export default ({ siteData }) => { 
        siteData.themeConfig.sidebar = ${JSON.stringify(SIDEBAR_DATA)}
      }`
    }
  },
});