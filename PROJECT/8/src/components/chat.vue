<template>
    <div>
        <button type="button" class="btn btn-primary btn-open-chat" data-toggle="modal" data-target="#exampleModalCenter">
            Launch demo modal
        </button>
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="chat-wrapper h-100 overflowY-auto">
                        <div 
                            v-for="msg of messages" 
                            :class="msg.sender_id === $route.params.id ? 'user' : 'answer'"
                            class="d-fles flex-column"
                        >
                            <div>
                                <strong>{{ msg.sender_id === $route.params.id ? 'me' : 'Admin' }}</strong>
                            </div>
                            <div>
                                <span>{{msg.text}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                <input type="text" v-model="text">
                    <button type="button" class="btn btn-primary" @click="send">Send</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
let socket = io('http://localhost:8080');

let listen = () => {
    socket.on('receive', (d) => {
        console.log(d)
    })
}

export default {
    data() {
        return {
            messages: [],
            text: '',
            currentReceiver: '5e91985057a9d12690639847'
        }
    },
    props: ['userId'],
    mounted() {
        fetch (`api/messages/` + this.$route.params.id)
            .then(r => r.json())
            .then( mes => {
                console.log(mes)
                this.messages = mes.items
                this.currentReceiver = mes.items[0].sender_id
            })

        socket.on('receive', (d) => {
            console.log(d, ' from socket')
        })
    },
    methods: {
        send() {
            let myId = this.$route.params.id;
            let message = {
                sender_id: myId,
                _id: this.currentReceiver,
                text: this.text
            }
            socket.emit ('send', message)

            this.messages.push(message)
        }
    }
}
</script>

<style>
.btn-open-chat{
    position: fixed;
    right: 50px;
    bottom: 50px;
}

.modal-body {
    height: 400px
}

</style>