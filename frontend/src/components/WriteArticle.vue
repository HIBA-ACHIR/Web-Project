<template>
    <h4>Share a New Article</h4>
    <form @submit.prevent="submitPost">
        <div class="form-group">
            <label for="articleTitle">Title</label>
            <input type="text" v-model="titre" class="form-control" id="articleTitle"
                placeholder="Enter the title of your article">
        </div>
        <div class="form-group">
            <label for="articleContent">Content</label>
            <textarea class="form-control" v-model="contenu" id="articleContent" rows="5"
                placeholder="Enter the content of your article"></textarea>
        </div>
        <div class="mb-3">
            <label for="formFile" class="form-label">Add file here</label>
            <input class="form-control" @change="handleFileUpload" type="file" id="formFile">
        </div>
        <div class="p-2">

            <p class="form-label  fs-5">Categories :</p>
            <div class="d-flex fs-5 flex-wrap gap-2">
                <div class="form-check  " v-for="category in categories" :key="categories.id">
                    <input class="form-check-input" type="checkbox" :value="category.id" v-model="checkedCategories" checked
                        >
                    <label class="form-check-label" for="flexCheckChecked">
                        {{ category.nom }}
                    </label>
                </div>

            </div>
        </div>

        <div class="d-flex mx-2  mb-3 gap-2 fs-5">
            <div class="form-check ">
                <input class="form-check-input" type="checkbox" :value="true" v-model="published" checked="checked">
                <label class="form-check-label" for="flexCheckChecked">
                    published
                </label>
            </div>

        </div>
        <button type="submit" class="btn btn-primary">Share Article</button>
    </form>
</template>
<script>
import { ref, onMounted } from 'vue';
import axios from "axios"
export default {

    setup() {
        const titre = ref('');
        const contenu = ref('');
        const published = ref(false);
        const image = ref('');
        const utilisateurId = 2;
        const categories = ref([]);
        const checkedCategories = ref([]);

        onMounted(async () => {
            try {
                const response = await fetch("http://localhost:3000/categories");
                categories.value = await response.json();

            } catch (err) {

            }
        })
        function handleFileUpload(event) {
            image.value = event.target.files[0]
            console.log(image.value)
        }
        async function submitPost() {
            console.log("checked Categories");
            console.log(checkedCategories.value)
            // const formData = {
            //     titre: titre.value,
            //     contenu: contenu.value,
            //     image: image.value,
            //     published: published.value,
            //     utilisateurId: utilisateurId,
            //     categorieIds: checkedCategories.value
            // }

            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const formData = new FormData();
                formData.append('titre', titre.value);
                formData.append('contenu', contenu.value);
                formData.append('image', image.value);
                formData.append('published', published.value);
                formData.append('utilisateurId', user.id);

                for (const categoryId of checkedCategories.value) {
                    formData.append('categorieIds[]', categoryId);
                }
                const respone = await axios.post("http://localhost:3000/articles", formData)
                console.log(respone.data)

                window.location.href = "/profile";

            } catch (error) {
                console.log(error.message)
            }

        }
        return {
            submitPost,
            titre,
            contenu,
            image,
            checkedCategories,
            categories,
            published,
            handleFileUpload
        }
    }
}





</script>