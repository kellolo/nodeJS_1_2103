<template>
    <div class="products">
        <item v-for="item of items" :key="item._id" :prod="item"/>     
        <item :key="'temp'" :template="true"/> 
    </div>
</template>

<script>
import item from './catalogItem.vue'
export default {
    data() {
        return {
            url: 'api/shop',
            items: [],
        }
    },
    components: {
        item
    },
    mounted() {
        this.$parent.getData(this.url)
        .then(data => {this.items = data})
        //console.log(this)
    },
    methods: {
        createProduct(item) {
            return this.$parent.postData(this.url, item)
            .then(d => {
                if(d._id) {
                    let { name, price } = item
                    this.items.push({
                        _id: d._id,
                        img: item.img ? ite.img : 'default',
                        name, price
                    })
                }
                return true
            })
            .then(status => {
                return status ? status : false
            })
        }
    }
}
</script>