<template>
    <div class="products">
        <item v-for="item of items" :key="item._id" :prod="item"/>  
        <item :template="true"/>   
    </div>
</template>

<script>
import item from './catalogItem.vue'
export default {
    data() {
        return {
            url: 'api/catalog',
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
        addNewItem(item) {
            return this.$parent.postData(this.url, item)
                    .then(answer => {
                        if(answer._id) {
                            let { name, price, img } = item
                            this.items.push({
                                _id: answer._id,
                                name, price,
                                img: img ? img : 'default'
                            })
                            return true
                        }
                    })
                    .then(st => {
                        return st ? st : false
                    })
        }
    }
}
</script>