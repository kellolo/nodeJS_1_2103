<template>
    <div class="product-item">
        <template v-if="!template">
            <img :src="calcImg" :alt="prod.name">
            <div class="desc">
                <h3>{{prod.name}}</h3>
                <p>{{prod.price}} $</p>
                <button class="buy-btn" 
                name="buy-btn"
                @click="addProduct(prod)"
                >Купить</button>
            </div>
        </template>
        <template v-if="template && $root.$children[0].Roles.Admin">
            <img :src="'https://placehold.it/200x150'">
            <div class="desc">
                <label >
                    <input type="text" placeholder="Item name" v-model="newProduct.name" class="w-50">
                </label>
                <label >
                    <input type="number" placeholder="Item price" v-model="newProduct.price" class="w-50">
                </label>
                <button class="buy-btn" 
                name="buy-btn"
                @click="createNewItem(newProduct)"
                >Добавить</button>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        // catalogImg: {
        //     type: String,
        //     default: 'https://placehold.it/200x150'
        // },
        prod: {
            type: Object
        },
        template: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            newProduct: {
                name: '',
                price: 0
            }
        }
    },
    methods: {
        addProduct (prod) {
            this.$parent.$parent.$refs.cartReference.addProduct(prod)
        },
        createNewItem(item) {
            if(item.name && item.price) {
                this.$parent.addNewItem(item)
                .then(status => {
                    if(status) {
                        this.newProduct.name = ''
                        this.newProduct.price = 0
                    }
                })
            }
        }
    },
    computed: {
        calcImg () {
            return this.prod.img === 'default' ? 'https://placehold.it/200x150' : this.prod.img
        }
    }
}
</script>