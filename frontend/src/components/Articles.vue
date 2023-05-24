<template>
  <div class="album py-5 bg-body-tertiary">
    <div class="container">
      <h3 class="mb-2">Featured post</h3>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

        <ArticleCard v-for="(article, index) in articles" :article="article" :key="article.id" />


      </div>
   
    </div>
  </div>
</template>
<script>

import ArticleCard from './ArticleCard.vue';
export default {
  components: {
    ArticleCard
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