<template>
    <div>
        <header>
            <div class="logo">E-shop</div>
        </header>
        <main>
            <div class="container w-100 d-flex justify-content-center py-5">
                <form action="#" class="d-flex flex-column w-50 align-items-center">
                    <label class="w-50 d-flex justify-content-between">
                        <input type="text" v-model="login"> <span>Login</span>
                    </label>
                    <label class="w-50 d-flex justify-content-between">
                        <input type="text" v-model="pass"> <span>Password</span>
                    </label>

                    <button class="my-2" @click.prevent="signIn">Sign In</button>
                    <a href="#" @click="signUp">Sign Up</a>
                </form>
            </div>
        </main>
    </div>
</template>

<script>


export default {
    data() {
        return {
            login: '',
            pass: ''
        }
    },

    methods: {
        signIn() {
            this.$root.$children[0].Roles.Admin = false
            this.postData('/api/auth', {
                login: this.login,
                password: this.pass
            })
            .then(answer => {
                // console.log(answer)
                let user = this.$root.$children[0].User

                user._id = answer._id
                user.login = answer.login
                user.cart = answer.cart

                if (answer.admin) {
                    this.$root.$children[0].Roles.Admin = true
                }

                this.$router.push('/' + answer._id)
            })
        },
        signUp() {
            this.$root.$children[0].Roles.Admin = false
            this.postData('/api/auth/create', {
                login: this.login,
                password: this.pass
            })
        },
        // getData(url) {
        //     return fetch(url).then(d => d.json())
        // },
        postData(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data) //новый объект с товаром, который нужно добавить
            }).then(d => d.json())
        },
        // putData(url, data) {
        //     return fetch(url, {
        //         method: 'PUT',
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(data) //дельта-изменение товара +1/-1
        //     }).then(d => d.json())
        // },
        // deleteData(url) {
        //     return fetch(url, {
        //         method: 'DELETE',
        //         headers: {
        //             "Content-Type": "application/json"
        //         }
        //     }).then(d => d.json())
        // }
    }
}
</script>

<style lang="sass">

</style>