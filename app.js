const fs = require('fs');
const chalk = require("chalk");
const validator = require("validator");
const {getNote,addNotes,removeNote, printNotes} = require("./notes");
const log = console.log;
const success = chalk.bold.green;
const yargs = require('yargs')


yargs.command({
    command: 'add',
    describe: 'adding a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: String
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: String
        }
    },
    handler: (argv) => {addNotes(argv.title,argv.body)}
});

yargs.command({
    command:'remove',
    describe:'removing the note',
    builder: {
        title: {
            describe:'title of the note to be removed',
            demandOption: true,
            type: String
        }
    },
    handler: (argv)=>{removeNote(argv.title)}
});

yargs.command({
    command: 'List',
    describe:'list all the notes',
    handler:()=> printNotes()
});

yargs.command({
    command:"read",
    describe:"read a note",
    builder:{
        title:{
            describe:"read a note",
            demandOption:true,
            type: String
        }
    },
    handler:(argv)=>{getNote(argv.title)}
})

yargs.parse();