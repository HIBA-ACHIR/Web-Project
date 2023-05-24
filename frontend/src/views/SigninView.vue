<template>
    <div class="container">
        <form class="row g-3"   @submit.prevent="handleSignIn()">
            <div class="col-12">
                <div class="">
                    <label for="input" class="form-label"><b>Username</b></label>
                    <input type="text" class="form-control"  v-model="signInName" placeholder="Username" aria-label="Username" />
                </div>
            </div>
            <div class="col-12">
                <label for="inputEmail4" class="form-label"><b>Email</b></label>
                <input type="email" class="form-control" v-model="signInEmail" id="inputEmail4" />
            </div>

            <div class="col-12">
                <label for="inputPassword4" class="form-label"><b>Password</b></label>
                <input type="password" class="form-control"  v-model="signInPassword" id="inputPassword4" />
            </div>
            <div class="col-12"></div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">Sign in</button>
            </div>
        </form>
    </div>
</template>

<script>
import {ref} from 'vue'
import axios  from 'axios';
export default {
    setup() {
        const signInEmail = ref(null);
    const signInName = ref(null);
    const signInPassword = ref(null);
        async function handleSignIn() {
            try {
                console.log({


                    email: signInName.value,
                    nom: signInEmail.value,
                    password: signInPassword.value,

                })
                const response = await axios.post("http://localhost:3000/signup", {


                    email: signInEmail.value,
                    nom: signInName.value,
                    password: signInPassword.value,

                })
                const data = response.data;
                console.log(response.data);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                // logged.value = true;
                window.location.href="/profile"
            } catch (error) {
                console.log(error)
            }

        }
        return{
            handleSignIn,
            signInEmail,
            signInName,
            signInPassword
        }
    }
}

</script>