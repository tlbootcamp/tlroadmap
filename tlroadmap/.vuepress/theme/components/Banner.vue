<template>
  <a target="_blank" id="optimize-banner" :href="bannerLink" v-if="bannerLink">
    <span class="optimize-banner__inner">
      {{ bannerText }}
    </span>
  </a>
</template>


<script>

export default {
  name: 'Banner',
  computed: {
    bannerText () {
      return this.$site.themeConfig.banner.text || ''
    },

    bannerLink () {
      return this.$site.themeConfig.banner.link || ''
    },

  },
}
</script>

<style lang="stylus">

#optimize-banner
  display block
  margin-top: 3.6rem
  text-decoration none
  color #E8F0FE
  font-size 18px
  font-weight 500
  line-height 24px
  padding 6px 0
  position relative
  text-align center
  background-color #7F52FF
.home
  #optimize-banner
    margin-top 0
    width 100vw
    position:relative
    left calc(-50vw + 50%)

.optimize-banner__inner
  display inline-block
  margin 0 6px

</style>
