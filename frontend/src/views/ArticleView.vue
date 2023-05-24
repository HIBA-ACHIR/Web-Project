<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card">
        
                      <img :src="article.image" width="560" class="card-img-top" />

          <div class="card-body">
            <h5 class="card-title">{{ article.titre}}</h5>
            <div class="d-flex align-items-center">
              <div>
                <p class="mb-0">{{ article.utilisateur?.nom }}</p>
              </div>
            </div>
            <hr>
            <p class="card-text">{{ article.contenu }}</p>
            <hr>
        <Comments :id="id" :comments="article.commentaires" />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Comments from "../components/Comments.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
export default {
  components: {
    Comments
  },
  setup() {
    const route = useRoute();
    const  id= route.params.id;
    const article = ref({})
    onMounted(async () => {
      try {

        const response = await fetch("http://localhost:3000/articles/"+id);
      

        article.value =  await  response.json()
      } catch (error) {

      }

    })
    return {
      article,
      id
    }
  }
}



</script>