<template>
    <div class="col-md-6">
          <div class="row g-0 h-100 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col-8 p-4 d-flex flex-column position-static">
              <div>
                   <strong class="d-inline-block mb-2 text-primary mx-2" v-for="category in article.categories">{{ category.nom }} </strong>
                </div>
              <div class="mb-1 text-body-secondary">{{article.createdAt}}</div>
              <p class="card-text mb-auto">{{article.titre}}</p>
              <a :href="`/articles/${article.id}`" class="text-black-50 fw-bold">Continue reading</a>
            </div>
            <div class="col-4 d-none d-lg-block">
                <img :src="article.image" class="w-100 h-100"/>
            </div>
          </div>
        </div>
</template>
<script>
export default {
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    setup(props) {

     
    }
}
</script>