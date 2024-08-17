<template>
  <div class="wrapper">
    <NavbarComp/>
<main class="container-fluid">

  <router-view/>


</main>
<footerComp/>
  </div>
</template>
<script>
import footerComp from "@/components/footerComp.vue";
import NavbarComp from "@/components/NavbarComp.vue";
export default {
components: {

  NavbarComp,
  footerComp
}
}


</script>
<style src="@/assets/Styles/style.css"> 

</style>
