<template>
  <section class="footer" id="footer">
    <div class="container">
        
    </div>
  </section>
</template>

<script>
export default {
    data(){
        return{
            screenWith: 0
        }
    },
    methods:{
        addWidth(){
            this.screenWith = window.screen.width
        },
        openPopApp(){
            this.$store.dispatch('setPopApp', true)
        },
    },
    created(){
        window.addEventListener('resize', this.addWidth);
    },
    mounted(){
        this.screenWith = window.screen.width
    }
}
</script>

<style>

</style>