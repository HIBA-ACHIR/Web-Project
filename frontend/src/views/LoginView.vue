<template>
    <form class="container" @submit.prevent="handleLogin()">
        <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
                <input type="email" v-model="loginEmail" class="form-control" id="inputEmail3">
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" v-model="loginPassword" id="inputPassword3">
            </div>
        </div>

        <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
</template>
<script>
import axios from 'axios';
import {ref} from 'vue'
export default {
    setup() {
        const loginEmail = ref(null);
        const loginPassword = ref(null);
        async function handleLogin() {
            console.log(loginEmail.value);
            console.log(loginPassword.value)
            try {
                const response = await axios.post("http://localhost:3000/signin", {


                    email: loginEmail.value,
                    password: loginPassword.value,

                })  
                const data = response.data;
                console.log(response.data);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                window.location.href="/profile"
            } catch (error) {
                console.log(error)
            }

        }
        return {
            handleLogin,
            loginEmail,
            loginPassword
        }
    }
}
</script>