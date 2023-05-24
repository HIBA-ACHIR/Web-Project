<template>
     <div class="container">
      <div class="row">
        <div class="col text-center">
          <p class="small-text red-text">Welcome to our blog, where inspiration meets innovation!</p>
        </div>
      </div>
    </div>
    <div class="container p-4 p-md-5 mb-4 rounded text-bg-dark">
        <div class="col-md-6 px-0">
          <h1 class="display-4 fst-italic">"{{article.titre}}"</h1>
          <p class="lead my-3">{{ article.contenu }}</p>
          <p class="lead mb-0"><router-link :to="`/articles/${article.id}`" class="text-white fw-bold">Continue reading...</router-link></p>
        </div>
      </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  setup(props, { emit }) {

    const article = ref({});
    onMounted(async () => {
      try {
        const response=await fetch("http://localhost:3000/articles?take=1&skip=0");
        article.value = (await response.json())[0];
      } catch (err) {

      }
    })

    return {

      article
    }
  }
}



</script>