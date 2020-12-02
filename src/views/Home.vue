<template>
  <div class="home">
    <home-map />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeMap from '@/components/Map.vue'

export default {
  name: 'Home',
  components: {
    HomeMap: HomeMap
  }
}
</script>
<style  >
.home {
  overflow: hidden;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>