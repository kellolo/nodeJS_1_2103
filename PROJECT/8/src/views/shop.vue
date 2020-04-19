<template>
    <div>
        <header class="d-flex">
            <div class="logo d-flex flex-column">
                <span class="mb-1">E-shop</span>
                <span v-if="$parent.admin">Админка</span>
            </div>
            <div class="cart">
                <form action="#" class="search-form">
                    <input type="text" class="search-field">
                    <button class="btn-search" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </form>
                <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
                <cart v-show="showCart" ref="cartReference"/>
            </div>
        </header>
        <main>
            <catalog />
            <chat />
        </main>
    </div>
</template>

<script>
import catalog from '../components/catalog.vue'
import cart from '../components/cart.vue'
import chat from '../components/chat.vue'

export default {
    data() {
        return {
            //API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
            showCart: false
        }
    },
    components: {
        catalog, cart, chat
    },
    methods: {
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
        putData(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data) //дельта-изменение товара +1/-1
            }).then(d => d.json())
        },
        deleteData(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(d => d.json())
        }
    }
}
</script>

<style lang="sass">

</style>