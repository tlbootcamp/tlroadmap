const LOCALES = new Map([
  ['en', '/en/'],
  ['ru', '/'],
])

const uslug = require('uslug')
const uslugify = s => uslug(s)

const HOSTNAME = process.env.HOSTNAME || 'https://tlroadmap.io'

function extractDescription($page) {
  if ($page.frontmatter.description) return $page.frontmatter.description;
  if (!$page._strippedContent) return null;
  const lines = $page._strippedContent.split('\n').filter(line => line);
  const descriptionTitleIndex = lines.indexOf('## Описание');
  if (descriptionTitleIndex === -1) {
    return null;
  } else {
    return lines[descriptionTitleIndex + 1];
  }
}

module.exports = (ctx) => ({
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],
  markdown: {
    slugify: uslugify,
  },
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
        sidebar: {},
        nav: [
          { text: 'Как использовать?', link: '/guide.html' },
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
      'git-log',
      {
        additionalArgs: '--follow',
        formatTime: (timestamp, _) => timestamp,
      },
    ],
    [
      '@b0g3r/locale-prefix',
      {
        locales: LOCALES,
      },
    ],
    [
      '@b0g3r/generate-tree',
      {
        locales: LOCALES,
      },
    ],
    [
      'sitemap',
      {
        hostname: HOSTNAME,
        dateFormatter: (lastUpdated) => lastUpdated,
      },
    ],
    [
      'seo',
      {
        title: ($page) => $page.frontmatter.title || ('Teamlead Roadmap: ' + $page.title),
        description: extractDescription,
        modifiedAt: ($page) => $page.git && $page.git.updated && new Date($page.git.updated * 1000).toISOString(),
        publishedAt: ($page) => $page.git && $page.git.created && new Date($page.git.created * 1000).toISOString(),
        author: ($page) => $page.frontmatter.author || $page.git && $page.git.contributors.slice(-1)[0],
        type: ($page) => $page.frontmatter.home ? 'website' : 'article',
      },
    ],
  ]
});