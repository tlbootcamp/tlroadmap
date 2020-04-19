let SIDEBAR_DATA = Object.create(null);


function getGroupPage(page, key) {
  return {
    key: key,
    title: page.frontmatter['title'] || page.title,
    children: [],
    collapsable: false,
  }
}

function getPageLeaf(page, key) {
  let leaf = getGroupPage(page, key)
  leaf['path'] = page.path
  return leaf
}

function findParent(tree, keys) {
  let parent = tree
  for (const key of keys.slice(1)) {
    for (const subtree of parent.children) {
      if (subtree.key === key) {
        parent = subtree;
        break;
      }
    }
  }
  return parent
}

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

    const tree = getPageLeaf(rootPage, '')
    for (const page of pages.slice(1)) {
      const keys = page.path.endsWith('/') ? page.path.slice(0, -1).split('/') : page.path.split('/')
      const parent = findParent(tree, keys)
      if (page._strippedContent.trim()) {
        parent.children.push(getPageLeaf(page))
      } else {
        parent.children.push(getGroupPage(page, keys[keys.length - 1]))
      }
    }

    SIDEBAR_DATA = [
      tree,
    ]
  },
  async  enhanceAppFiles() {
    return {
      name: 'auto-sidebar-enhance-app',
      content: `export default ({ siteData }) => { 
        siteData.themeConfig.sidebar = ${JSON.stringify(SIDEBAR_DATA)}
      }`
    }
  },
});