<template>

</template>


<script setup>
import CardComp from "./CardComp.vue"
import {computed, onMounted} from "vue"
import {useStore} from "vuex"
const store = useStore()
const prods = computed(() => store.state.prods)


onMounted(() => {
   
    store.dispatch("recentProducts")
    // repeat()

})
</script>

<style>

</style>