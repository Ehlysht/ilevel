<template>
  <div class="search">
    <label for="search" class="search-label">
    <svg class="search-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/></svg>
    <input 
        :class="`search-input ${searchVal ? 'input-active' : ''}`" 
        type="text" name="search" placeholder="Search" autocomplete="off" 
        v-model="searchVal">
    </label>
    <ul class="search-list" @scroll="onScroll" v-show="userSelected" ref="scrollContainer">
        <li 
            ref="options"
            :class="`search-item`" 
            :style="`${selectId == index ? 'background:#666;' : ''}`" 
            @click="this.searchVal = item.name"
            v-for="(item, index) in sortSearch" :key="index">
            {{ item.name }}
        </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    props: ['searchVal'],
    data(){
        return{
            searchVal: '',
            anwerArray: [],
            selectId: 0,
            visibleLimit: 20,
            userSelected: true,
            visibleCheck: false
        }
    },
    computed:{
        sortSearch(){
            if(this.visibleCheck){
                this.visibleLimit = 20
                this.selectId = 0
            }else{
                this.visibleCheck = true
            }
            this.userSelected = true
            var array = this.anwerArray
            if(this.searchVal){
                array =  array.filter(post => {
                    return post.name.toLowerCase().includes(this.searchVal.toLowerCase())
                })
                if(array.length == 1){
                
                }else{
                    return array.slice(0, this.visibleLimit)
                }   
            }
        }
    },
    mounted(){
        axios.get('http://elem.enott.com.ua/API/getItems')
        .then(response => {
            this.anwerArray = response.data
        });
    },
    created() {
        window.addEventListener('keydown', this.onKey)
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.onKey)
    },
    methods: {
        onKey(event) {
            const key = event.key;

            const map = {
                Enter: () => {
                    this.userSelected = false
                    this.searchVal = this.sortSearch[this.selectId].name
                },
                Tab: () => {
                    this.userSelected = false
                    this.searchVal = this.sortSearch[this.selectId].name
                },
                ArrowDown: () => {
                    if(this.sortSearch){
                        if(this.sortSearch.length - 1 > this.selectId){
                            this.selectId ++
                        }
                    }
                    this.fixScrolling()
                },
                ArrowUp: () => {
                    if(this.sortSearch){
                        if(0 < this.selectId){
                            this.selectId --
                        }
                    }
                    this.fixScrolling()
                }
            }
            const func = map[key];
            if(func) {
                func();
            }
        },
        fixScrolling(){
            const liH = this.$refs.options[this.selectId].clientHeight;
            this.$refs.scrollContainer.scrollTop = liH * this.selectId;
            this.visibleCheck = false
        },
        onScroll ({ target: { scrollTop, clientHeight, scrollHeight }}) {
            if (scrollTop + clientHeight >= scrollHeight) {
                this.selectId = this.visibleLimit - 6
                this.visibleLimit = this.visibleLimit + 20
                this.visibleCheck = false
            }
        }
    }
}
</script>

<style>

</style>