const fs = require('fs')
const yargs = require('yargs')

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()

        return JSON.parse(dataJSON)
    }
    catch (e) {
        console.log(e);
        return []
    }
}

const isFound = (notes, title) => {
    let index, found = false;
    if (notes.length === 0) {
        console.log('note is empty');
        return
    }
    notes.forEach((note, i) => {
        if (note.title === title) {
            found = true;
            index = i;
        }
    });

    return found ? index : -1;
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const showNotes = () => {
    const notes = loadNotes();
    if (notes.length === 0) {
        console.log('no notes found');
        return false;
    }
    notes.forEach((note, index) => {
        console.log(`${index + 1}. ${(note.title)}`);
        console.log(note.body);
        console.log('----------------------------------------------------------------');
    })
}

const addNote = (title, body) => {
    const notes = loadNotes();
    let duplicated = false;
    notes.forEach(note => {
        if (note.title === title) {
            duplicated = true;
        }
    })
    if (duplicated) {
        console.log('duplicated note');
        return;
    }

    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)
    console.log('A new note added');
    console.log(notes);
}

const removeNote = (title) => {
    const notes = loadNotes();
    if (notes.length === 0) {
        console.log('note is empty');
        return false;
    }
    const index = isFound(notes, title);
    if (index === -1) {
        console.log('note is not found');
        return false;
    }
    notes.splice(index, 1)
    saveNotes(notes)
    console.log('The note is deleted');
}

const updateNote = (title, newBody, newTitle) => {
    const notes = loadNotes();
    if (notes.length === 0) {
        console.log('note is empty');
        return false;
    }
    const index = isFound(notes, title);
    if (index === -1) {
        console.log('note is not found');
        return false;
    }
    const note = notes[index];
    note.body = newBody;
    note.title = newTitle || note.title;
    saveNotes(notes)
    console.log('note is updated');
}



yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'no-description',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'no description',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'no-description',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        removeNote(argv.title)
    }
})

yargs.command({
    command: 'update',
    describe: 'updating an existing note by title',
    builder: {
        title: {
            describe: 'no-description',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'no description',
            demandOption: true,
            type: 'string'
        },
        newTitle: {
            describe: 'no description',
            typeof: 'string'
        }
    },
    handler(argv) {
        updateNote(argv.title, argv.body, argv.newTitle)
    }
})

yargs.command({
    command: 'show',
    describe: 'showing all saved notes',
    handler() {
        showNotes();
    }
})

console.log(yargs.argv);
//fs.writeFileSync('json.json',JSON.stringify(book));


