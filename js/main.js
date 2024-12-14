import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js"; //!Import most used functions
import NoteEditor from "./view/NoteEditor.js";
import NoteSideBar from "./view/NoteSideBar.js";

/**
 * @type {Element} will be the root element for the app
 * Injecting a HTML template literal will make sure the child elements exist before getting them  
 */
const app = document.getElementById("app");
app.innerHTML = `   
<div class="notes_sidebar" id="sideMenu">
    <div class="folder" id="root">
        <button id="myBtn">Try it</button> 
    </div>
</div>
<div class="notes_editor">
    <input class="note_title" placeholder="Enter Title ... " data>
    <textarea class="note_body" placeholder="Start Writing Here..."></textarea>
</div>`;
const editor = new NoteEditor(app,
        [onNoteEdit]);
//const sidebar = new 



function onNoteEdit(id) {
    noteObj = NotesAPI.getNote(id);
    console.log(`Note ${noteObj.id}, Title: "${noteObj.title}" has been edited`);
    NotesAPI.saveNote(noteobj);
}


//     onNoteEdit(noteObj) {
    //       console.log(
    //         `Note ${noteObj.id}, Title: "${noteObj.title}" has been edited`
    //       );
    //       NotesAPI.saveNote(noteObj);
    //       view.updateNoteList(NotesAPI.getAllNotes());
    //       // console.log(newTitle);
    //       // console.log(newBody);
    //     }




// const view = new NotesView(
//   app,
//   new NotesAPI.Note(undefined, undefined, undefined),
//   {
//     //?Does the order matter

//     onNoteAdd(title, tag, body) {
//       let note = new NotesAPI.Note(title, tag, body);
//       NotesAPI.saveNote(note);
//       view.updateNoteList(NotesAPI.getAllNotes());
//       console.log("Note has been added!");
//     },
//     onNoteDelete(id) {
//       NotesAPI.deleteNote(id);
//       view.updateNoteList(NotesAPI.getAllNotes());
//       console.log(`Note Deleted: ${id}`);

      
//         //? grab a random note
//         let notes = NotesAPI.getAllNotes();
//         if (notes.length !== 0) {
//           //! The local storage still has elements, find one, send it to the editor
//           let i = Math.floor(Math.random() * notes.length);
//           console.log(i);
//           view.setNoteEditor(notes[i]);
//         } 
//         //? if there are no notes remaining use place holder: return to the inital state of the application
//         else 
//           view.resetNoteEditor()
//     },
//     onNoteSelect(id) {
//       console.log(`Note selected: ${id}`);
//       let noteObj = NotesAPI.getNote(id);
//       //console.log(noteObj);
//       //THis is what the note object currently looks like
//       //{
//       // "id": 152,
//       // "title": "Changed this title",
//       // "tag": "books",
//       // "body": "This is the body of the note, we can write here",
//       // "last_updated": "2024-12-04T06:56:35.478Z"
//       //}
//       view.setNoteEditor(noteObj);
//     },
//     onNoteEdit(noteObj) {
//       console.log(
//         `Note ${noteObj.id}, Title: "${noteObj.title}" has been edited`
//       );
//       NotesAPI.saveNote(noteObj);
//       view.updateNoteList(NotesAPI.getAllNotes());
//       // console.log(newTitle);
//       // console.log(newBody);
//     },
//   }
// );


