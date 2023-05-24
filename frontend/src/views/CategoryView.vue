<template>
  <div class="home">
    <h1 class="text-center">{{ categorie.nom }} Category</h1>

    <Articles :articles="categorie.articles" v-if="categorie.articles"></Articles>


  </div>
</template>

<script>
// @ is an alias to /src
import { onMounted, ref } from 'vue';
import Header from "../components/Header.vue"
import Articles from "@/components/Articles.vue";
import { useRoute } from 'vue-router';
export default {
  name: 'HomeView',
  components: {
    Header,
    Articles
  },
  setup(props) {


    const categorie = ref({})
 
    const route=useRoute();
    onMounted(async () => {
      try {
        const id=route.params.id
        const  response=await fetch("http://localhost:3000/categories/"+id);
        categorie.value =await  response.json();
      } catch (error) {
          console.log(error)
      }

    })
    return {


      categorie
    }
  }
}
</script>
