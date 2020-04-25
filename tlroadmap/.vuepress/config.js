module.exports = {
  title: 'Teamlead Roadmap',
  themeConfig: {
    sidebarDepth: 0,
    lastUpdated: 'В последний раз обновленно',
    nav: [
      { text: 'Как использовать?', link: '/guide/' },
      // TODO: Сейчас базовая тема использует ensureExt, если считает, что ссылка внутренняя
      // как он понимает, что ссылка внешняя или внутренняя:
      // https://github.com/vuejs/vuepress/blob/b105089d4b09c17a2085a2637cf1a7a5553c2c3f/packages/%40vuepress/theme-default/util/index.js#L4
      // после этого он делает вот это
      // https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/theme-default/components/NavLink.vue#L37-L39
      // https://github.com/vuejs/vuepress/blob/b105089d4b09c17a2085a2637cf1a7a5553c2c3f/packages/%40vuepress/theme-default/util/index.js#L31-L43
      //
      // один из вариантов — переписать просто кусочек темы
      // {
      //   text: 'Скачать',
      //   items: [
      //     { text: 'PlantUML (.puml)', link: '/roadmap.puml', target:'_blank' },
      //     { text: 'Mindmap (.mm)', link: '/roadmap.mm', target:'_blank' },
      //     { text: 'png', link: '/roadmap.png', target:'_blank' },
      //     { text: 'svg', link: '/roadmap.svg', target:'_blank' }
      //   ]
      // }
    ]
  },
  plugins: [
    require('./autoSidebar.js')
  ]
}