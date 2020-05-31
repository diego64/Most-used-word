module.exports = rows => {
    return new Promise((resolver, reject) => {
        try {
            const words = rows 
            .filter(filterValidRow)
            .map(removePunctuation)
            .map(removeTags)
            .reduce(mergeRows)
            .split(' ')
            .map(word => word.toLowerCase())
            .map(word => word.replace('"', ''))

            resolver(words)
        } catch(e) {
            reject(e)
        }
    })
}

//Filtro de palavras que não serão válidas
function filterValidRow(row) {
    const notNumber = !parseInt(row.trim())
    const notEmpty = !!row.trim()
    const notInterval = !row.includes('-->')
    return notNumber && notEmpty && notInterval
}

//Filtro de pontuação
const removePunctuation = row => row.replace(/[,?!.-]/g, '')

//Filtro para remover as tags 
const removeTags = row => row.replace(/(<[^>]+)>/ig,'').trim()

//Pega todos os arquivos e transforma em um unico texto
const mergeRows = (fullText, row) => `${fullText} ${row}`