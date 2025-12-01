<!-- TODO: Удалить этот файл после миграции на новую версию VuePress https://v2.vuepress.vuejs.org/reference/default-theme/config.html#colormode -->
<template>
  <div class="mode-toggler">
    <button id="mode-toggler-btn" class="mode-toggler-bnt" @click="toggleMode">
      <svg
        class="mode-toggler-btn-icon day"
        focusable="false"
        viewBox="0 0 32 32"
      >
        <path
          d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z"
          fill="currentColor"
        ></path>
        <path
          d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z"
          fill="currentColor"
        ></path>
        <path d="M2 15.005h5v2H2z" fill="currentColor"></path>
        <path
          d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z"
          fill="currentColor"
        ></path>
        <path d="M15 25.005h2v5h-2z" fill="currentColor"></path>
        <path
          d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z"
          fill="currentColor"
        ></path>
        <path d="M25 15.005h5v2h-5z" fill="currentColor"></path>
        <path
          d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z"
          fill="currentColor"
        ></path>
        <path d="M15 2.005h2v5h-2z" fill="currentColor"></path>
      </svg>
      <svg
        class="mode-toggler-btn-icon night"
        focusable="false"
        viewBox="0 0 32 32"
      >
        <path
          d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z"
          fill="currentColor"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script>
export const MODE_NAME = "dark-mode";

export default {
  mounted() {
    this.checkMode();
  },
  methods: {
    toggleMode() {
      const html = document.documentElement;
      const classList = html.classList;
      classList.toggle(MODE_NAME);

      if (classList.contains(MODE_NAME)) {
        localStorage.setItem(MODE_NAME, "true");
      } else {
        classList.remove(MODE_NAME);
        localStorage.removeItem(MODE_NAME);
      }

      location.reload();
    },
    checkMode() {
      if (localStorage.getItem(MODE_NAME)) {
        document.documentElement.classList.add(MODE_NAME);
      }
    }
  }
};
</script>

<style>
.mode-toggler {
  bottom: 8px;
  position: fixed;
  right: 8px;
}

.mode-toggler-bnt {
  background: none;
  border: 0;
}

.mode-toggler-btn-icon {
  cursor: pointer;
  height: 32px;
  width: 32px;
}

html.dark-mode .mode-toggler-btn-icon.day,
:not(html.dark-mode) .mode-toggler-btn-icon.night {
  display: none;
}

.mode-toggler-btn-icon.day,
html.dark-mode .mode-toggler-btn-icon.night {
  color: #2c3e50;
  display: block;
}

/* Цвет фона поля ввода */
html.dark-mode .search-box input {
  background-color: #262c34;
}

/* Цвет фона выпадающего списка */
html.dark-mode .suggestions,
html.dark-mode .custom-block.tip {
  background-color: #2b313a;
}

/* Цвет фона всех темных секций */
html.dark-mode,
html.dark-mode body,
html.dark-mode .sidebar,
html.dark-mode .navbar,
html.dark-mode .navbar .links,
html.dark-mode .search-box .suggestion.focused {
  background-color: #22272e;
}

/* Цвет бордюра выпадающего списка */
html.dark-mode .search-box .suggestions {
  border-color: transparent;
}

/* Цвет разделительных линий */
html.dark-mode h1,
html.dark-mode h2,
html.dark-mode h3,
html.dark-mode h4,
html.dark-mode .navbar,
html.dark-mode .home .footer,
html.dark-mode .home .features,
html.dark-mode .page-nav .inner,
html.dark-mode .search-box input {
  border-color: #3e4c5a;
}

/* Цвет параграфов, заголовков, ссылок без наведения */
html.dark-mode,
html.dark-mode body,
html.dark-mode h1,
html.dark-mode h2,
html.dark-mode h3,
html.dark-mode h4,
html.dark-mode p,
html.dark-mode a.sidebar-link,
html.dark-mode .home .feature h1,
html.dark-mode .home .feature h2,
html.dark-mode .home .feature h3,
html.dark-mode .home .feature h4,
html.dark-mode .home .feature p,
html.dark-mode .home .footer,
html.dark-mode .navbar,
html.dark-mode .navbar .site-name,
html.dark-mode .navbar .links,
html.dark-mode .search-box input,
html.dark-mode .home .hero .description,
html.dark-mode .mode-toggler-btn-icon.night {
  color: #adbac7;
}

/* Темизация вставок с кодом */
html.dark-mode code {
  background-color: #2b313a;
  border-radius: 3px;
  color: #8b9eb0;
  overflow-wrap: break-word;
}

/* Цвет ссылок при наведении */
html.dark-mode a.sidebar-link:hover,
html.dark-mode .nav-links a:hover,
html.dark-mode .nav-item > a:hover,
html.dark-mode .nav-item > a.router-link-active {
  color: #00c2d2;
}
</style>
