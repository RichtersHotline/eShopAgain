<template>

  <div class="container-fluid text-center Monials ">
    <div class="row align-items-center g-0 MonialRow mx-auto" v-if="recentProducts">
      <CardComp  v-for="product in recentProducts" :key="product.productID" >
            
            <template #cardHeader>
        
                <img :src="product.ProdURL" class="card-img-top img-fluid" alt="product" loading="lazy">
              
              </template>
            <template #cardBody>
              <div class="hovering">
             <h3 class="name">{{product.prodName}} </h3>
             <p>{{product.amount}} </p>
             <p class="quota">"{{product.Category}}"</p>
              </div>
            </template>
     
    </CardComp>

    </div>
  </div>
</template>

<script>

import CardComp from "@/components/CardComp.vue"



export default {
  name: 'HomeView',
  components: {
    CardComp
  },
  computed: {
    recentProducts() {

      return this.$store.state.recentPro

    }

  },
  mounted() {
    console.log("Mounted");
    // this.$store.dispatch('recentProducts')
    this.$store.dispatch('recentProducts')
  }
}
</script>
<style scoped>

h3.card-title {

    font-weight:lighter;
}
.card-body {

    background-color:#310335;

    color:#9E8BA0;
    height:50%;


}
.card-text {
    background-color:#864386;
}
.card {
    opacity:0.5;
    transition:2s;
    margin-left:10px;
    margin:auto;
    outline:2px solid fuchsia;
    width:18rem;
    margin-bottom:17px;
}
.card:hover {

    transform:scale(1.1,1.1);
opacity:1;


}
@media only screen and (max-width: 720px) {

    .card {
        opacity:1;

        margin:auto;
        outline:2px solid fuchsia;
        box-shadow:5px 5px 10px fuchsia;
        width:100%;
        margin-bottom:30px;
    }

}
</style>