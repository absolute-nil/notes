//jshint esversion:6
const fs = require("fs");
const chalk =  require('chalk');
const getNote =(title) => {
  const notes = listNotes();
  const note = notes.find((note)=>{return note.title===title;});
  if(note){
      console.log("body :",note.body);
  }else{console.log("not found")}
  
};

const addNotes = (title, body) => {
  const data = listNotes();
  const filterData = data.filter(note => note.title === title);
  if (filterData.length === 0) {
    const newNote = {
      title,
      body
    };
    data.push(newNote);
    saveNotes(data);
  } else {
    console.log("title already exists");
  }
};

const saveNotes = data => {
  const saveData = JSON.stringify(data);
  fs.writeFileSync("notes.json", saveData);
};

const listNotes = () => {
  try {
    const rawData = fs.readFileSync("notes.json");
    return JSON.parse(rawData.toString());
  } catch {
    return [];
  }
};

const printNotes = () => {
    const notes = listNotes();
    notes.forEach(note => {
        console.log("title :", note.title);
        console.log("----------------------")        
    });
}
const removeNote = title => {
    let flag =false;
  let data = listNotes();
  data = data.filter(note => {
    if(note.title===title){
        flag  = true;
    }
    return note.title !== title;
  });
  if(flag){
    saveNotes(data);
    console.log(chalk.green.inverse("note deleted !"));
  }else{
      console.log(chalk.red.inverse("not found"));
  }
  
};

module.exports = {
  getNote,
  addNotes,
  removeNote,
  printNotes
};
