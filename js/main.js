import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";

const app = document.getElementById("app");
const view = new NotesView(app, {
  //?Does the order matter

  onNoteAdd() {
    console.log("Note has been added!");
  },
  onNoteDelete(id) {
    console.log(`Note Deleted: ${id}`);
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
    view.setEditorWithActiveNote(noteObj);
  },
  onNoteEdit(noteObj) {
    console.log(`Note ${noteObj.id}, Title: "${noteObj.title}" has been edited`);
    NotesAPI.saveNote(noteObj);
    // console.log(newTitle);
    // console.log(newBody);
  },
});

view.updateNoteList(NotesAPI.getAllNotes());
