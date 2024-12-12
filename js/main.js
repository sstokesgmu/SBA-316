import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";

const app = document.getElementById("app");

const view = new NotesView(
  app,
  new NotesAPI.Note(undefined, undefined, undefined),
  {
    //?Does the order matter

    onNoteAdd(title, tag, body) {
      let note = new NotesAPI.Note(title, tag, body);
      NotesAPI.saveNote(note);
      view.updateNoteList(NotesAPI.getAllNotes());
      console.log("Note has been added!");
    },
    onNoteDelete(id) {
      NotesAPI.deleteNote(id);
      view.updateNoteList(NotesAPI.getAllNotes());
      console.log(`Note Deleted: ${id}`);

      //? if there are no notes remaining use place holder: return to the inital state of the application
      try {
        //? grab a random note
        let notes = NotesAPI.getAllNotes();
        if (notes.length !== 0) {
          //! The local storage still has elements, find one, send it to the editor
          let i = Math.floor(Math.random() * notes.length);
          console.log(i);
          view.setNoteEditor(notes[i]);
        }
        throw new Error("There are no more notes return to initial state");
      } catch (error) {}
    },
    onNoteSelect(id) {
      console.log(`Note selected: ${id}`);
      let noteObj = NotesAPI.getNote(id);
      //console.log(noteObj);
      //THis is what the note object currently looks like
      //{
      // "id": 152,
      // "title": "Changed this title",
      // "tag": "books",
      // "body": "This is the body of the note, we can write here",
      // "last_updated": "2024-12-04T06:56:35.478Z"
      //}
      view.setNoteEditor(noteObj);
    },
    onNoteEdit(noteObj) {
      console.log(
        `Note ${noteObj.id}, Title: "${noteObj.title}" has been edited`
      );
      NotesAPI.saveNote(noteObj);
      view.updateNoteList(NotesAPI.getAllNotes());
      // console.log(newTitle);
      // console.log(newBody);
    },
  }
);

view.updateNoteList(NotesAPI.getAllNotes());
