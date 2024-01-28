const moment = require('moment')
const LOCALES = new Map([
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
    ['link', { rel: 'icon', href: '/favicon.png', type: 'image/png' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
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
  },
  themeConfig: {
    repo: 'tlbootcamp/tlroadmap',
    docsDir: 'tlroadmap',
    editLinks: true,
    banner: {
      text: 'Подписывайтесь на Telegram-канал Teamlead Good Reads: ежедневные статьи про управление людьми, командами и процессами!',
      link: 'https://t.me/leadgr',
    },
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
          { text: 'Как использовать', link: '/guide.html' },
          { text: 'Чат в Telegram', link: 'https://tlinks.run/tlbootcamp' },
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
    },
    sidebarDepth: 0,
    lastUpdated: 'В последний раз обновлено',
  },
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          moment.locale(lang)
          return moment(timestamp).format()
        },
      },
    ],
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
        dumpingEnabled: ctx.isProd,
      },
    ],
    [
      'sitemap',
      {
        hostname: HOSTNAME,
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
    [
      'metrika',
      ctx.isProd ? {
        counter: '62722396',
        config: {
          accurateTrackBounce: true,
          clickmap: true,
          trackLinks: true,
          webvisor: true
        },
      } : false,
    ],
  ]
});
