let Messages = require('../models/messages.js')

module.exports = {
    async _find(id, sender_id) {
        try {
            let userMsgs = await Messages.find({ user_id: id });
            if (!userMsgs.length) {
                userMsgs = []
                userMsgs.push(await Messages.create({
                    user_id: id,
                    items: []
                }))
            }
            let reqMsgArray = userMsgs[0].items.filter(msg => msg.sender_id == sender_id);
            return reqMsgArray
        }
        catch(err) {
            return
        }
    },
    //async _findUserChats
    async send(msg) {
        try{ 
            let arr = await this._find(msg._id, msg.sender_id);
            if(arr.length) {
                arr.push(msg)
            } else {
                let userMsgs = await Messages.find({ user_id: msg._id });
                let items = userMsgs[0].items
                items.push(msg)

                await userMsgs[0].updateOne({items: items})
            }
            console.log(await this._find(msg._id))
        }
        catch(err) {
            console.log(err)
            return false
        }
        finally {
            return ({status: true, message: msg})
        }
    },
    async receive(msg) {
        console.log(msg)
        try {
            let receiver = await Messages.find({user_id: msg.sender_id})
            let items = receiver[0].items
            items.push(msg)
            await receiver[0].updateOne({items})
        }
        catch(err) {
            console.log(err)
            return false
        }
        finally {
            return true
        }
    },
    async load(req, res) {
        let userMsgs = await Messages.find({ user_id: req.params.id });
        console.log('here', userMsgs)
        res.json(userMsgs[0])
    }
}