// import node modules
const util = require("util");
const fs = require("fs");
// gives us unique ids
const uuidv1 = require("uuid/v1");

// promises
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// create 'Store' class
class Store {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }
  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }
  getNotes() {
    return this.read().then((notes) => {
      let parsed;

      // return empty array if there are no notes
      try {
        parsed = [].concat(JSON.parse(notes));
        console.log(parsed);
      } catch (err) {
        parsed = [];
      }
      return parsed;
    });
  }
  addNote(note) {
    // create note with title and text
    const { title, text } = note;

    // check for empty input
    if (!title || !text) {
      throw new Error("'Title' and 'Text' cannot be empty");
    }

    // generate unique id for note
    const newNote = { title, text, id: uuidv1() };

    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updated) => this.write(updated))
      .then(() => newNote);
  }

  // deleteNote by ID
  deleteNote(id) {
    // iterate through notes and delete the matching id
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filtered) => this.write(filtered));
  }
}

module.exports = new Store();
