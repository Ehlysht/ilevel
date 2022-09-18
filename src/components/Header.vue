<template>
  <header class="header" id="header">
    <div class="container">
      <nav class="nav" id="nav">
        <search :searchVal="this.searchText"/>
      </nav>
    </div>
  </header>
</template>

<script>
import search from '@/components/Search.vue'
export default {
  components:{
    search
  },
  data(){
    return{
      searchText: ''
    }
  },
  computed:{

  },
  methods:{

  },
  created(){
      
  },
  mounted(){
    
  }
}
</script>

<style>

</style>