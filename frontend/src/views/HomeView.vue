<template>
  <div class="home">
    <Header @handleSearch="handleSearch" @handleselectedCategory="handleselectedCategory"></Header>

    <Articles :articles="filteredArticles"></Articles>


  </div>
</template>

<script>
// @ is an alias to /src
import { onMounted, ref } from 'vue';
import Header from "../components/Header.vue"
import Articles from "@/components/Articles.vue";
export default {
  name: 'HomeView',
  components: {
    Header,
    Articles
  },
  setup(props) {

    function handleSearch(searchValue) {
      console.log(searchValue);
      filteredArticles.value = articles.value.filter((article) => {
        return article.titre.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
      })
    }
    function handleselectedCategory(selectedCategory) {
      if(selectedCategory=="all"){
        filteredArticles.value=articles.value
      }else{

        filteredArticles.value = articles.value.filter((article) => {
  
          return article.categories.some((c) => c.nom == selectedCategory);
        })
      }

    }
    const articles = ref([])
    const filteredArticles = ref([])
    onMounted(async () => {
      try {
        const  response=await fetch("http://localhost:3000/articles/?take=10&skip=0");
        filteredArticles.value = articles.value =await  response.json();
      } catch (error) {
          console.log(error)
      }

    })
    return {
      handleSearch,
      handleselectedCategory,
      filteredArticles
    }
  }
}
</script>
