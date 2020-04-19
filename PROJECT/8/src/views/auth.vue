<template>
    <div>
        <header>
            <div class="logo">E-shop</div>
        </header>
        <main>
            <div class="container w-100 d-flex justify-content-center py-5">
                <form action="#" class="d-flex w-50 flex-column align-items-center">
                    <label for="" class="w-50 d-flex justify-content-between">
                        <input type="text" v-model="login"> <span>Login</span>
                    </label>
                    <label for="" class="w-50 d-flex justify-content-between">
                        <input type="text" v-model="password"> <span>Password</span>
                    </label>

                    <button @click="_login">Login</button>
                    <a href="#" @click="createAccount">Create account</a>
                </form>
            </div>
        </main>
    </div>
</template>

<script>
import catalog from '../components/catalog.vue'
import cart from '../components/cart.vue'

export default {
    data() {
        return {
            login: '',
            password: ''
        }
    },
    methods: {
        _login() {
            this.postData('/api/auth', {
                login: this.login,
                password: this.password
            })
            .then(d => {
                let u = this.$root.$children[0].User
                console.log(d)
                u._id = d._id
                u.login = d.login
                u.cart = d.cart
                u.name = d.name
                this.$root.$children[0].admin = d.admin

                //this.$root.authorized = true
                this.$router.push('/' + d._id)
            })
        },
        createAccount() {
            this.postData('api/auth/create', {
                login: this.login,
                password: this.password,
                new: true
            })
        },
        getData(url) {
            return fetch(url).then(d => d.json())
        },
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