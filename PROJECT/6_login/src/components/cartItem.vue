<template>
    <div class="cart-item" :key="item._id">
        <div class="product-bio">
            <img :src="cartImg" :alt="item.name">
            <div class="product-desc">
                <p class="product-title">{{item.name}}</p>
                <p class="product-quantity">Quantity: {{item.quantity}}</p>
                <p class="product-single-price">$ {{item.price}} each</p>
            </div>
        </div>
        <div class="right-block">
            <p class="product-price">{{ item.quantity * item.price }}</p>
            <button class="del-btn" name="del-btn"
            @click="$parent.removeProduct(item)">&times;</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        cartImg: {
            type: String,
            default: 'https://placehold.it/100x80'
        },
        item: {
            type: Object
        }
    },
    methods: {
        removeProduct(prod) {
            // this.$parent.removeProduct(prod)
            this.$parent.$emit('remove', prod)
        }
    },
}
</script>