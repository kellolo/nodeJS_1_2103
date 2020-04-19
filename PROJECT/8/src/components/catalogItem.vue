<template>
    <div>
        <div class="product-item" v-if="!template">
            <img :src="catalogImg" :alt="prod.name">
            <div class="desc">
                <h3>{{prod.name}}</h3>
                <p>{{prod.price}} $</p>
                <button class="buy-btn" 
                name="buy-btn"
                @click="addProduct(prod)"
                >Купить</button>
            </div>
        </div>
        <div class="product-item template" v-else>
            <img :src="catalogImg" alt="Добавить изображение">
            <div class="desc">
                <label for="">
                    <input type="text" placeholder="Название товара" v-model="newProduct.name">
                    
                </label>
                <label for="">
                    <input type="number" placeholder="Цена товара" v-model.number="newProduct.price">
                    
                </label>
                <button class="buy-btn" 
                name="buy-btn" 
                @click="createProduct(newProduct)"
                >Добавить</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        catalogImg: {
            type: String,
            default: 'https://placehold.it/200x150'
        },
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
        createProduct (prod) {
            if(this.newProduct.name != '' && this.newProduct.price != 0) {
                this.$parent.createProduct(prod)
                .then (status => {
                    if (status) {
                        this.newProduct.name = ''
                        this.newProduct.price = 0
                    }
                })
                
            }
        }
    },
}
</script>

<style>
    .template input{
        width: 80%;
        margin-bottom: 15px;
    }

    .template img {
        cursor: pointer;
    }
</style>