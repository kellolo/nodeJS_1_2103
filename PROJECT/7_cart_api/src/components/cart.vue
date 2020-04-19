<template>
    <div class="cart-block">
        <item v-for="item of items" :key="item._id" :item="item" @remove="removeProduct"/>     
    </div>
</template>

<script>
import item from './cartItem.vue'
export default {
    data() {
        return {
            url: '/api/cart',
            items: [],
        }
    },
    components: {
        item
    },
    mounted() {
        this.$parent.getData(this.url + this.$route.path)
        .then(data => {this.items = data.items})
    },
    methods: {
        addProduct(prod) {
            
            let id = prod._id
            let find = this.items.find(item => item._id == id)

            if (find) {
                this.$parent.putData(`/api/cart/${this.$route.path}`, {delta: 1, _id: id})
                .then(d => {
                    d.result ? find.quantity++ : console.log('error')
                })
            } else {
                let newProd = Object.assign({}, prod, {quantity: 1})
                this.$parent.postData(`/api/cart/${this.$route.path}`, newProd)
                .then(d => {
                    d.result ? this.items.push(newProd) : console.log('error')
                })
            }
        },
        removeProduct(val) {
            let id = val._id
            let find = this.items.find (element => element._id == id);
            if (find.quantity > 1) {
                this.$parent.putData(`/api/cart/${this.$route.path}`, {delta: -1, _id: id})
                .then(d => {
                    d.result ? find.quantity-- : console.log('error')
                })
            }  else {
                this.$parent.deleteData(`/api/cart/${id}`)
                .then(d => {
                    d.result ? this.items.splice (this.items.indexOf(find), 1) : console.log('error')
                })
            }
        }
    }
}
</script>