import NotesAPI from "./NotesAPI.js"; //!Import most used functions
import NoteEditor from "./view/NoteEditor.js";
import SideBar from "./view/NoteSideBar.js";

/**
 * @type {Element} will be the root element for the app
 * Injecting a HTML template literal will make sure the child elements exist before getting them  
 */
const app = document.getElementById("app");
app.innerHTML = `   
<div class="notes_sidebar" id="sideMenu">
    <button id="myBtn">Click Me to Add a Note</button> 
    <div class="folder" id="root">
    
    </div>
</div>
<div class="notes_editor">
    <input class="note_title" placeholder="Enter Title ... " data>
    <textarea class="note_body" placeholder="Start Writing Here..."></textarea>
</div>`;
const editor = new NoteEditor(app,
        [onNoteEdit]);
const sideBar = new SideBar(app,[onNoteAdd, onNoteSelect, onNoteDelete])

if(NotesAPI.getAllNotes().length > 0);
    sideBar.updateNoteList(NotesAPI.getAllNotes());


function onNoteEdit(note) {
    
    console.log(`Note ${note.id}, Title: "${note.title}" has been edited`);
    NotesAPI.saveNote(note);
    sideBar.updateNoteList(NotesAPI.getAllNotes());
}

function onNoteAdd(title, body) {
     NotesAPI.saveNote(new NotesAPI.Note(title, "", body));
     sideBar.updateNoteList( NotesAPI.getAllNotes());
     console.log("A new note has been added");
}

function onNoteSelect(id){
    console.log(`Note selected: ${id}`);
    let note = NotesAPI.getNote(id);
    sideBar.updateNotesClassList(note.id);
    editor.setNoteEditor(note);

    console.log(`The note editor is now showing note: ${note?.id}`);
}

function onNoteDelete(id){
    NotesAPI.deleteNote(id);
    let notes = NotesAPI.getAllNotes();
    sideBar.updateNoteList(notes);
    editor.findNote(notes);
}




