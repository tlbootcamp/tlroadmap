<template>
  <object @load="reformatLinks" class="svg-roadmap" :data="img" type="image/svg+xml">
    <img alt="Roadmap file" src="/roadmap-ru.png" />
  </object>
</template>

<!-- TODO: Удалить логику с ModeToggler после миграции на новую версию VuePress https://v2.vuepress.vuejs.org/reference/default-theme/config.html#colormode -->
<script>
  import { MODE_NAME } from '../theme/components/ModeToggler';

  export default {
    methods: {
      reformatLinks(event) {
        const links = event.target.getSVGDocument().getElementsByTagName('a');
        for (const link of links) {
          link.target.baseVal = '_blank';
        }
      }
    },
    computed: {
      roadmap() {
        return this.$roadmap
      },
      img() {
        let isDarkMode = false;

        if (typeof window !== 'undefined') {
          isDarkMode = localStorage.getItem(MODE_NAME);
        }

        return isDarkMode ? '/roadmap-ru-dark-theme.svg' : '/roadmap-ru.svg';
      }
    }
  }
</script>

<style lang="scss" scoped>
  $sidebar-width: 20rem;
  $desktop-breakpoint: 720px;

  object, img {
    max-width: 100%;
    position: relative;

    // make roadmap on desktop wider than page content block
    @media (min-width: $desktop-breakpoint) {
      max-width: calc(100vw - #{$sidebar-width}) !important;
      width: calc(100vw - #{$sidebar-width});
      margin-left: calc(50% - (50vw - #{$sidebar-width} / 2));
      margin-right: calc(50% - (50vw - #{$sidebar-width} / 2));
    }
  }
</style>
