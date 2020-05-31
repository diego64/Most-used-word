const { ipcMain } = require('electron');

const pathsToRows = require('./pathsToRows.js')
const prepareData = require('./prepareData.js')
const groupWords = require('./groupWords.js')

ipcMain.on('process-subtitles', (event, paths) => {

    pathsToRows(paths)
        .then(rows => prepareData(rows))
        .then(words => groupWords(words))
        .then(groupedWords => event.reply('process-subtitles', groupedWords))
})