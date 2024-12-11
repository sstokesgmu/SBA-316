import NotesView from "./NotesView.js"
import NotesAPI from "./NotesAPI.js"

const app = document.getElementById("app");
const view = new NotesView(app, {
    //?Does the order matter
 
    onNoteAdd() { 
        console.log("Note has been added!");
    },
    onNoteDelete(id){
        console.log(`Note Deleted: ${id}`);
    },
    onNoteSelect(id){
        console.log(`Note selected: ${id}`);
        let notes = NotesAPI.getAllNotes();
        console.log(notes);
        view.getActiveNote(notes[1]);
       // view.getActiveNote();
    },
    onNoteEdit(inputField){
        console.log("Open note has been edited")
        // console.log(newTitle);
        // console.log(newBody);
    },
});

view.updateNoteList(NotesAPI.getAllNotes());

