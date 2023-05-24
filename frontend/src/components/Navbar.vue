<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="https://img.freepik.com/vecteurs-premium/concept-mot-blog-formes-geometriques-couleur_205544-12899.jpg"
          width="150" height="150" alt="" srcset="">
      </a>
      <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </div>
        <ul class="navbar-nav ml-auto">
          <template v-if="!logged">
            <li class="nav-item">
              <a class="nav-link" href="/login">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/signup">Sign-up</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <a class="nav-link" href="/Profile">Profile</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="handleSignOut">Sign Out</a>
            </li>
          </template>
        </ul>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>

  <!-- Create Post -->
</template>
<script>
import { ref } from "vue"
import axios from "axios"
export default {
  setup() {
    const logged = ref(localStorage.getItem("token") ? true : false);
    function handleSignOut() {
      localStorage.clear("token");
      localStorage.clear("user");
      logged.value = false
      window.location.reload()
    }
    return {
      handleSignOut,
      logged,

    }
  }
}
</script>