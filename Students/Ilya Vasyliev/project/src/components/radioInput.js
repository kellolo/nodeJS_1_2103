const Radio = require('prompt-radio')

module.exports = function() {
    const prompt = new Radio({
        name: 'Камень, ножницы, буиага',
        message: '1 - Камень, 2 - Ножницы, 3 - Бумага \n',
        default: '1',
        choices: ['1', '2', '3']
    })
    return prompt.run()
                .then(ans => ans)
}

