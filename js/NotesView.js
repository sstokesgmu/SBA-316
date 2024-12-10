export default class NotesView {
  //!Will use object deconstruction
  constructor(
    rootElement, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) 
    {
        this.rootElement = rootElement;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;

        //! How come double qoutes will work
        this.rootElement.innerHTML = `   
        <div class="notes_sidebar">
            <div class="folder" id="root">
                
            </div>
        </div>
        <div class="notes_editor">
            <input class="note_title" placeholder="Enter Title ... ">
            <textarea class="note_body">Write Here ...</textarea>
        </div>`;

        //Right click event to add a new note (Event Listener)
        const btnAddNote = this.rootElement.querySelector(".folder");
        const noteTitle = this.rootElement.querySelector(".note_title");
        const noteBody = this.rootElement.querySelector(".note_body");

        //! contextMenu will be a substitute for right click
        btnAddNote.addEventListener("contextmenu", () => {
            this.onNoteAdd();
        });
        
        [noteTitle, noteBody].forEach(inputField => {
            //! This event happens when we no longer click on the note 
            inputField.addEventListener("blur", () => {
                const updatedTitle = noteTitle.value.trim();
                const updatedBody = noteBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });
    }
    
    _createListItemHtml(id, title, body, updated) {
        const Max_Body_Length = 40;
        return `    <section class="notelist-item" data-note-id="${id}">
                        <section id="note_small_title">${title}</section>
                        <section id="note_small_body">
                            ${body.substring(0,Max_Body_Length)}
                            ${body.length > Max_Body_Length ? "..." : ""}
                        </section>
                        <section id="note_time">
                        ${updated.toLocaleString(undefined, {dateStyle: "full", timeStyle: "short"})}
                        </section>
                    </section>
        `;
    }


    updateNoteList(notes) {
        const notesListContainer = this.rootElement.querySelector(".folder");

        //Empty list
        notesListContainer.innerHTML = ""
    
        for(const note of notes){
            const htmlNode = this._createListItemHtml(note.id, note.title, note.body, new Date(note.last_updated));
            
            notesListContainer.insertAdjacentHTML("beforeend", htmlNode);
        }

        //! Add select/delete events for each list item

        notesListContainer.querySelectorAll(".notelist-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId); //? What does this mean?
            });
        });
    }
}
