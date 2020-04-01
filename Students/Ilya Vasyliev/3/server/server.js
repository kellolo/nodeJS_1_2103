const http = require('http')
const fh = require('../utils/cmmFileHandler') //fh.read(file) fh.write(file, data)
const express = require('express')
const bodyParser = require("body-parser");

const server = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});
/*
*  1-  камень
 * 2 - ножницы
 * 3 - бумага
 */
server.post("/", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);

    let pc = Math.floor(Math.random() * 3) + 1;
    console.log(pc);
    console.log(request.body.user);

    let resultGame = myGame(request.body.user, pc);

    if (resultGame === undefined) {
        response.send("Ошибка!");
    } else {

        let str = '';
        str += "Комьютер выбросил: ";

        if (pc == 1) {
            str += "камень.";
        } else if (pc == 2) {
            str += "ножницы.";
        } else if (pc == 3) {
            str += "бумага.";
        }

        if (resultGame === 1) {
            str += " Победа компьютера!";
        } else if (resultGame === 2) {
            str += " Победа человека!";
        }

        response.send(str);
    }
});

/**
 *
 * @param user  - 1, 2, 3
 * @param pc -  1, 2, 3
 * @returns {number} 0 - ничья, 1 - победа компьютера, 2 - победа человека
 */
function myGame(user, pc) {
    if (user == pc) return 0;

    if (user == 1) {
        if (pc == 2) {
            return 2
        } else if (pc == 3) {
            return 1;
        } else {
            return undefined;
        }
    }

    if (user == 3) {
        if (pc == 1) {
            return 2
        } else if (pc == 2) {
            return 2;
        } else {
            return undefined;
        }
    }


    if (user == 3) {
        if (pc == 1) {
            return 2
        } else if (pc == 2) {
            return 1;
        } else {
            return undefined;
        }
    }

    return undefined;
}

/*
*  1-  камень
 * 2 - ножницы
 * 3 - бумага
 */

server.use(express.json());

server.use('/', express.static('./server/static'));


server.listen(8080);