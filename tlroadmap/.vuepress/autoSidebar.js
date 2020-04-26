const Page = require('@vuepress/core/lib/node/Page');

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

const SIDEBARS = new Map();

module.exports = (options, ctx) => ({
  name: "auto-sidebar-plugin",
  async ready() {
    /** @type Page[] */
    let pages = ctx.pages;
    /** @type Map<string, string> */
    const locales = options.locales
    const prefixes = Array.from(locales.values())

    pages = pages.sort((p1, p2) => {
      if (p1.path < p2.path) return -1;
      if (p1.path > p2.path) return 0;
      return 0;
    });

    for (const prefix of prefixes) {
      const rootPage = pages.find(page => page.path === prefix)
      const tree = getLeafData(rootPage, '')
      let prefixPages = pages.filter(
        page => page.path !== prefix // exclude root page
          && page.path.startsWith(prefix)  // include only pages with prefix
      )
      // special case for default prefix `/`
      if (prefix === '/') {
        const otherPrefixes = prefixes.filter(prefix => prefix !== '/')
        prefixPages = prefixPages.filter(page => {
          for (const otherPrefix of otherPrefixes) {
            if (page.path.startsWith(otherPrefix)) return false
          }
          return true
        })
      }
      for (const page of prefixPages) {
        // split path by `/` and remove empty parts
        // /abc/ -> ["abc"]
        // /abc/d.html -> ["abc", "d.html"]
        const keys = page.path.split('/').filter(pathPart => pathPart).filter(pathPart => pathPart !== prefix)
        const parent = findParent(tree, keys)

        if (page._strippedContent.trim()) {
          // if page has content we should create clickable PageLeaf
          parent.children.push(getLeafData(page, keys[keys.length - 1]))
        } else {
          parent.children.push(getGroupData(page, keys[keys.length - 1].slice(0, -5)))
        }
      }
      SIDEBARS.set(prefix, tree)
    }
  },
  async enhanceAppFiles() {
    let content = ''
    SIDEBARS.forEach((sidebar, prefix) => {
      content += `siteData.themeConfig.locales['${prefix}'].sidebar = ${JSON.stringify([sidebar])};\n`
    })

    return {
      name: 'auto-sidebar-enhance-app',
      content: `export default ({ siteData }) => {
        ${content}
      }`
    }
  },
});