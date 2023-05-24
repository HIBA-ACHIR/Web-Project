<template>
 <AuthorArticleCard v-for="(article, index) in articles" :article="article"  v-if="articles.length>0" :key="article.id" />

</template>
<script>
import {ref} from "vue"
import AuthorArticleCard from './AuthorArticleCard.vue';
export default {
  components: {
    AuthorArticleCard
  },
  props:{
    articles:{
      type:Array
    }
  },
  setup() {



  
  }
}


</script>