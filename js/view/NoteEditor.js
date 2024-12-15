
export default class NoteEditor{
    constructor(rootElement,callbacks = [])
    {
        this.root = rootElement;
        this.editor = this.root.querySelector(".notes_editor");
        this.template = `   <input class="note_title" placeholder="Enter Title ... " data>
              <textarea class="note_body" placeholder="Start Writing Here..."></textarea>`;
    
         //Get inner contents
         this.title = this.editor.querySelector(".note_title");
         this.body = this.editor.querySelector(".note_body");
         this.callbacks = {};
         if(callbacks.length > 0)
            callbacks.forEach((f,i)=> {
                try {
                    if(typeof f  === "function")
                        this.setCallBacks(f);
                    else 
                        throw new Error(`The type of element at index ${callbacks[i]} is not a function`); 
                } catch (e) {
                    console.log(e);
                }
            });
            console.log(this.callbacks);
         //Initial Call
         this.assignToHtml([this.title, this.body])
    }

    assignToHtml(htmlEls){
        htmlEls.forEach((element) => {
            element.setAttribute("data-isDirty", "false");
            element.addEventListener("blur", () => {
                if (element.dataset.isDirty) {
                    this.activeNote.title = this.title.value;
                    this.activeNote.body = this.body.value;
                    this.callbacks?.onNoteEdit(this.activeNote);
                    this.setNoteEditor(this.activeNote);
                    element.dataset.isDirty = false;
                }
            });
            element.addEventListener("change", () => {
                element.dataset.isDirty = true;
            });
        })
    }

    getAcitveNote(id){    }
    setCallBacks(func) { this.callbacks[func.name] = func; }    
    setNoteEditor(note)
    {
        console.log(note);
        this.activeNote = note 
        this.title.value = this.activeNote.title;
        this.body.value = this.activeNote.body;   
    }
    resetNoteEditor() {
        this.title.value= "";
        this.body.value = "";
    }

    findNote(notes){
        if (notes.length !== 0) { //! The local storage still has elements, grab one
            let i = Math.floor(Math.random() * notes.length);
            this.setNoteEditor(notes[i]);
        } else {
            this.resetNoteEditor()
        }
    }
}












// setNoteEditor(note) {
//     //Modify the text elemenst of the editor
//     this.rootElement.querySelector(".note_title").value = note.title;
//     this.rootElement.querySelector(".note_body").value = note.body;

//!for class list
//     //If a previous object was selected remove it
//     this.rootElement
//       .querySelectorAll(".notelist-item.selected")
//       .forEach((noteItem) => {
//         noteItem.classList.remove("selected");
//       });

//     this.rootElement
//       .querySelector(`.notelist-item[data-note-id="${note.id}"]`)
//       .classList.add("selected");
//     this.activeNote = note;
//     console.log(this.activeNote);
//   }