const consolePrint = require ('./assets/ansi')
const readline = require('readline')
const logger = require('./assets/log')

const variables = {
    1: 'КАМЕНЬ',
    2: 'НОЖНИЦЫ',
    3: 'БУМАГА'
}

function getResult(uv, cv) {
    switch (uv) {
        case 'КАМЕНЬ':
            switch (cv){
                case 'НОЖНИЦЫ':
                    return {
                        status: 'Победа',
                        description: 'Ножницы затупились об камень'
                    }
                    break
                case 'БУМАГА':
                    return {
                        status: 'Поражение',
                        description: 'Бумага накрывает камень'
                    }
                    break
                default:
                    return {
                        status: 'Ничья',
                        description: 'В другой раз повезет'
                    }
                    break
            }
        case 'НОЖНИЦЫ':
            switch (cv){
                case 'КАМЕНЬ':
                    return {
                        status: 'Поражение',
                        description: 'Ножницы затупились об камень'
                    }
                    break
                case 'БУМАГА':
                    return {
                        status: 'Победа',
                        description: 'Ножницы разрезали бумагу'
                    }
                    break
                default:
                    return {
                        status: 'Ничья',
                        description: 'В другой раз повезет'
                    }
                    break
            }
        case 'БУМАГА':
            switch (cv){
                case 'КАМЕНЬ':
                    return {
                        status: 'Победа',
                        description: 'Бумага накрывает камень'
                    }
                    break
                case 'НОЖНИЦЫ':
                    return {
                        status: 'Поражение',
                        description: 'Ножницы разрезали бумагу'
                    }
                    break
                default:
                    return {
                        status: 'Ничья',
                        description: 'В другой раз повезет'
                    }
                    break
            }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getDateTimeString() {
    const date = new Date()

    const YYYY = date.getFullYear()
    const MM = ((date.getMonth() + 1) > 9) ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
    const DD = (date.getDate() > 9) ? date.getDate() : '0' + date.getDate()

    const H = date.getHours()
    const i = date.getMinutes()
    const s = date.getSeconds()

    return `${DD}.${MM}.${YYYY} ${H}:${i}:${s}`
}

function initGame(){
    const inp = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    consolePrint('Выбирите Ваш вариант: КАМЕНЬ(1), НОЖНИЦЫ(2), БУМАГА(3)')
    inp.on('line', text => {
        if (!variables[text]) consolePrint('Вы ввели не вурный ключ ответа', 'error')
        else {
            inp.close()
            const uv = variables[text]
            const cv = variables[getRandomInt(1,4)]
            const result = getResult(uv, cv)
            logger(`Игрок выбрал: ${uv}\nКомпьютер выбрал: ${cv}\nСтатус: ${result.status}\n\n`)
            consolePrint(`\nВаш выбор: ${uv}`)
            consolePrint(`Компьютер выбрал: ${cv}`)
            consolePrint(result.status, 'status')
            consolePrint(result.description, 'description')
            restart()
        }
    })
}

function start() {
    console.clear();
    consolePrint('---------------------')
    consolePrint('КАМЕНЬ-НОЖНИЦЫ-БУМАГА')
    consolePrint('---------------------')
    const inp = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    consolePrint('Начать игру(Y)?')
    inp.on('line', text => {
        inp.close()
        if (text === 'Y' || text === 'y') {
            logger('\n--------------------\n'
                + getDateTimeString() + ' Начало новой игры\n'
                + '--------------------\n')
            initGame()
        }
    })
}

function restart(){
    const inp = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    consolePrint('\nЗакончить игру(Y)?')
    inp.on('line', text => {
        inp.close()
        if (text !== 'Y' && text !== 'y') initGame()
        else logger(getDateTimeString() + ` Игра завершена\n`)
    })
}

start()




