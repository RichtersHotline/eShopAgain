<template>
    
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <router-link to="landing" class="navbar-brand"><img src="https://richtershotline.github.io/Pimages/Images/Logo.png" class="img-fluid" alt="logo" loading="lazy"></router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link  class="nav-link" to="about">About</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>  
</template>
<script>


export default {
    name:"NavbarComp"

}

</script>


<style scoped>
.navbar {

    position: -webkit-sticky;
    position:sticky;
    top:0;
    z-index:9999;
    }
</style>