const Page = require('@vuepress/core/lib/node/Page');

module.exports = (options, ctx) => ({
  name: "vuepress-plugin-locale-files-to-locale-prefix",
  async ready() {

    const { locales } = options

    // ru|en|<locale>
    const rePart = Array.from(locales.keys()).join('|')
    // \/(eu|en|<locale>)\.html$
    const extRe = new RegExp(`\/(${rePart})\.html$`)

    const pages = ctx.pages;
    for (const page of pages) {
      const match = page.path.match(extRe)
      if (match) {
        const localeKey = match[1]
        const localePrefix = locales.get(localeKey)
        const pathToFolder = page.path.slice(1, -8)
        const newPath = `${localePrefix}${pathToFolder}.html`
        page.path = newPath
        page.regularPath = newPath
      }
    }
  }
});