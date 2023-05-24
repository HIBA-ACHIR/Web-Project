<template>
    <div class="article-card" v-if="show">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ titre }}</h5>
                <div class="text-center">

                    <img :src="image" class="w-100" />
                </div>
                <p class="card-text">{{ contenu }}</p>
                <a :href="`/articles/${id}`" class="btn btn-primary">Read More</a>
                <button class="ms-5 btn btn-danger " @click.prevent="deleteArticle(id)">delete</button>

            </div>
        </div>
    </div>
</template>
<script>
import { toRefs, ref } from "vue";
import axios from 'axios';
export default {

    props: {
        article: {
            type: Object,
            required: true
        }
    },
    setup(props) {

        const { id, titre, contenu, image, published } = toRefs(props.article);
        const show = ref(true);
        async function deleteArticle(id) {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                await axios.delete("http://localhost:3000/articles/" + id)
                show.value = false
            } catch (error) {

            }
        }

        return {
            id,
            titre,
            contenu,
            image,
            deleteArticle,
            show,
            published
        }
    }
}
</script>