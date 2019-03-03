
const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes ...'
}

const addNotes = (title,body) =>{
    const notes = loadNotes()
    
    const index = findIndex(notes,title)

    if (index === -1) {
        notes.push({
            title: title,
            body: body
        })

        savedNotes(notes)
        console.log(chalk.green('Note successfully added!'))
    }
    
    else{
        console.log(chalk.red(`Note with the title '${title}' already exixts`))
    }

}

const removeNote =  (title) => {
    const notes = loadNotes()
    
    const index = findIndex(notes, title)

    if (index != -1) { 
        notes.splice(index, 1)
        savedNotes(notes)
        console.log(chalk.green("Node removed"))
    }

    else{
        console.log(chalk.red(`Could not find a note with title '${title}'`))
    }
}

const listNotes = () => {
    const notes = loadNotes();
    if(notes.length > 0){
        console.log(chalk.blue.underline("YOur Notes!!"))
        notes.forEach((note) => console.log(chalk.magenta(note.title)))
    }
}

const findIndex = ( notes, title) => {
    return notes.findIndex( (note) => note.title.toLowerCase() === title.toLowerCase())
}

const savedNotes = (notes) =>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =  () => {

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
        
    }

    catch (e) {
        console.log(e)
        return []
    }
}

module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes
}