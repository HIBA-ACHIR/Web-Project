<template>

        <h4>Comments:</h4>
  <div class="ms-4">

    <div v-for="(comment, index) in comments" :key="index" :comment="comment">
  <h6 class="mb-0 ">{{ comment.email }}</h6>
        <p class="ms-2">{{comment.contenu}}</p>

    </div>
    <div v-for="(comment, index) in newComments" :key="index" :comment="comment">
      <h6 class="mb-0 ">{{ comment.email }}</h6>
        <p class="ms-2">{{comment.contenu}}</p>

    </div>

    <div class="border-bottom" v-if="logged">
     
        <h5>Post Your Comment:</h5>
        <form>
          <input class="form-control mb-2" v-model="comment" type="text" placeholder="Type Here.." required />
          <button class="btn btn-primary" @click.prevent="submitComment">Submit</button>
        </form>
    

    </div>
    <div v-else>
    
        <a href="/login" class="h5 nav-link text-primary "
          >Write a comment</a>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {

  props: {
    comments: Array,
    id: String
  },

  setup(prop) {
    const comment = ref(null);
    const newComments=ref([]);
    const logged=ref(localStorage.getItem("token")?true:false)
    async function submitComment() {

      try {
        if (comment.value) {
          console.log(prop.id)
          const user = JSON.parse(localStorage.getItem("user"));

          const response = await fetch("http://localhost:3000/commentaires/", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              "Authorization":localStorage.getItem("token")
            },
            body: JSON.stringify({
              "email": user.email,
              "contenu": comment.value,
              "articleId": parseInt(prop.id)
            }
            )
          })
          newComments.value.push({email:user.email,contenu:comment.value})
          console.log("cemt",newComments.value)
          comment.value=null;
        }
      } catch (error) {

      }
    }
    return {
      comment,
      submitComment,
      newComments,
      logged
    }
  }

}
</script>