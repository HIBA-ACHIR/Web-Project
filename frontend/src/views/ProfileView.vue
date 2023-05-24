<template>
    <div class="container">
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-8 offset-md-2">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">{{ user.nom }} ,Welcome to Your Profile : </h3>
                            <hr>
                            <h4>Your Articles</h4>
                            <AuthorArticles :articles="articles || []"></AuthorArticles>
                            <hr>
                            <WriteArticle />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import AuthorArticles from '../components/AuthorArticles.vue';
import WriteArticle from '../components/WriteArticle.vue';
import { ref } from "vue"
import { onMounted } from 'vue';
export default {
    components: {
        AuthorArticles,
        WriteArticle,
    },

    setup() {
        const articles = ref([])
        const filteredArticles = ref([])
        const user = ref(JSON.parse(localStorage.getItem("user")));
        onMounted(async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const response = await fetch("http://localhost:3000/users/" + user.id, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                });
                articles.value = (await response.json()).articles;
            } catch (error) {
                console.log(error)
            }

        })
        return {
            articles,
            user
        }

    }
}


</script>