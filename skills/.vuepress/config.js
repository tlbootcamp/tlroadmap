module.exports = {
  themeConfig: {
    lastUpdated: 'Last Updated',
    sidebar: [
      {
        title: 'Teamlead Roadmap',
        path: '/',
        children: [
          {
            title: 'Роли и обязанности',
            children: [
              {
                title: 'Product Owner',
                children: [
                  {
                    title: 'Принятие продуктовых решений',
                    children: [
                      {
                        title: 'Управление продуктовым бэклогом',
                        children: [
                          {
                            title: 'Генерация элементов беклога',
                            path: '/product-owner/backlog-generation'
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
        ]
      },
    ]
  }
}