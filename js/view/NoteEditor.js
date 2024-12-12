
export default class NoteEditor{
    constructor(rootElement)
    {
        this.root = rootElement;
        this.editor = this.root.querySelector(".notes_editor");
        this.template = `   <input class="note_title" placeholder="Enter Title ... " data>
              <textarea class="note_body" placeholder="Start Writing Here..."></textarea>`;
        this.callbacks = {};
    
         //Get inner contents
         this.title = this.editor.querySelector(".note_title");
         this.body = this.editor.querySelector(".note_body");

         //Initial Call
         this.assignToHtml([this.title, this.body])
    }

    assignToHtml(htmlEls){
        htmlEls.forEach((element) =>{
            element.setAttribute("data-isDirty", "false");
            element.addEventListener("blur", () => {
                if (inputField.dataset.isDirty) {
                    this.activeNote.title = noteTitle.value;
                    this.activeNote.body = noteBody.value;
                    this.onNoteEdit(this.activeNote);
                    inputField.dataset.isDirty = false;
            }
            });
            element.addEventListener("change", () => {
                inputField.dataset.isDirty = true;
            });
        })
    }
    setCallBacks()
    {

    }   
    setNoteEditor(title, body)
    {
        this.title.value = title;
        this.body.value = body
    }
    resetNoteEditor(){
        this.title.value= "";
        this.body.value = "";
        console.log(this.editor.innerHTML);
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