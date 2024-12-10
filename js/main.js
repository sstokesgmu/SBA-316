import NotesView from "./NotesView.js"
import NotesAPI from "./NotesAPI.js"

const app = document.getElementById("app");
console.log(app);
const view = new NotesView(app, {
    
    onNoteSelect(id){
        console.log(`Note selected: ${id}`);
    },
    onNoteAdd() { 
        console.log("Note has been added!");
    },
    onNoteEdit(newTitle, newBody){
        console.log(newTitle);
        console.log(newBody);
    },
    
});

view.updateNoteList(NotesAPI.getAllNotes());
