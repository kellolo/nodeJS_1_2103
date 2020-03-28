const inputRadio = require('./components/radioInput')
const check = require('./components/checker')

let vars = {
    '1': 'Камень',
    '2': 'Ножницы',
    '3': 'Бумага',
}

game()

function game () {
    let user, pc

    inputRadio()
        .then(d => { user = d })
        .then(() => {
            pc = Math.floor(Math.random() * 3) + 1
        })
        .then(() => {
            check(user, pc, vars)
            //console.log(vars[user], vars[pc])
        })
    //взять вар пользователя >> radioInput
    //взять вар комп
    //чекнуть >> checker
        //записать в лог >> handler
        //выдать результат в консоль >> utils/ansi
}