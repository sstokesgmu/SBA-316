
export default class NotesAPI {
  static Note = class {
    constructor(title, tag, body) {
      (this.title = title), (this.tag = tag), (this.body = body);
    }
  };

  //SON.parse() static method parses a JSON string, constructing the JavaScript value or object described by the string.
  static getAllNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    //Sort notes based on time stamp
    //A negative value indicates that a should come before b.
    //A positive value indicates that a should come after b.
    notes.sort(function (a, b) {
      return new Date(a.last_updated) > new Date(b.last_updated) ? -1 : 1;
    });
    return notes;
  }

  static getNote(id) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    return notes.find((element) => element.id == id)
  }

  static saveNote(note) {
    const notes = NotesAPI.getAllNotes();
    const existing = notes.find((element) => element.id == note.id);
    if (existing) {
      existing.title = note.title; //*Did we change the title
      existing.body = note.body; //*Updates to the note body
      existing.last_updated = new Date().toISOString();
    } else {
      //Returns a random integer from 0 to 200:
      note.id = Math.floor(Math.random() * 201);
      note.last_updated = new Date().toISOString(); //simplifies format based on ISO 8601
      notes.push(note);
    }
    //converts a JavaScript value to a JSON string, and initializes a notes array if it doesn't exist
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  static deleteNote(id) {
    //! There is no actual way to delete the element of id because localstorage.remove(key = typeof(string))
    const notes = NotesAPI.getAllNotes();
    const updatedList = notes.filter((element) => element.id != id);
    localStorage.setItem("notes", JSON.stringify(updatedList));
  }
}



