const LOCALES = new Map([
  ['en', '/en/'],
  ['ru', '/'],
])

module.exports = {
  locales: {
    '/': {
      lang: 'ru-RU',
      title: 'Teamlead Roadmap',
      description: 'Teamlead Roadmap'
    },
    // we don't have production version for english version
    '/en/': {
      lang: 'en-US',
      title: 'Teamlead Roadmap',
      description: 'Teamlead Roadmap'
    }
  },
  themeConfig: {
    repo: 'b0g3r/tlroadmap',
    docsDir: 'tlroadmap',
    editLinks: true,
    locales: {
      '/': {
        selectText: 'Русский',
        label: 'Русский',
        ariaLabel: 'Languages',
        repoLabel: 'Contribute!',
        editLinkText: 'Помоги нам улучшить эту страницу',
        // will be injected later
        sidebar: {}
      },
      '/en/': {
        selectText: 'English',
        label: 'English',
        ariaLabel: 'Languages',
        // will be injected later
        sidebar: {}
      }
    },
    sidebarDepth: 0,
    lastUpdated: 'В последний раз обновленно',
  },
  plugins: [
    [
      require('./localeFilesToLocalePrefix.js'),
      {
        locales: LOCALES,
      },
    ],
    [
      require('./autoSidebar.js'),
      {
        locales: LOCALES,
      },
    ],
  ]
}