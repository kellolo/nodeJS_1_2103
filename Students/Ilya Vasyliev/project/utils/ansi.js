const cursor = ansi(process.stdout)

// cursor.white().bg.red().write('Hello ANSI').reset().bg.reset().write('\n')

module.exports = (str, type) => {
    if (type === 'alert') {
        cursor.black().bg.green().write(str).reset().bg.reset().write('\n')
    } else if (type === 'error') {
        cursor.white().bg.red().write(str).reset().bg.reset().write('\n')
    }
}