<template>
  <div class="wrapper">
    <my-header />
    <router-view />
    <my-footer />
  </div>
</template>

<script>
import myHeader from '@/components/Header.vue'
import myFooter from '@/components/Footer.vue'
export default {
  components:{
    myHeader, myFooter
  },
}
</script>

<style>

</style>