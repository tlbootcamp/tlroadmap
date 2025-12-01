<template>
  <div>
    <ParentLayout>
      <Banner slot="page-top"/>
    </ParentLayout>
    <ModeToggler />
  </div>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'
import Banner from '@theme/components/Banner.vue'
import ModeToggler from '@theme/components/ModeToggler.vue'
export default {
  name: 'Layout',
  components: {
    ParentLayout,
    Banner,
    ModeToggler
  }
}
</script>
