export default class NotesView {
  //!Will use object deconstruction
  constructor(
    rootElement,{onNoteAdd, onNoteDelete, onNoteSelect, onNoteEdit  } = {}) 
    {
        this.rootElement = rootElement;
        //Events
        this.onNoteAdd = onNoteAdd;
        this.onNoteDelete = onNoteDelete;
        this.onNoteSelect = onNoteSelect;
        this.onNoteEdit = onNoteEdit;

        //! How come double qoutes will work
        this.rootElement.innerHTML = `   
        <div class="notes_sidebar">
            <div class="folder" id="root">
                
            </div>
        </div>
        <div class="notes_editor">
            <input class="note_title" placeholder="Enter Title ... " data>
            <textarea class="note_body" placeholder="Start Writing Here..."></textarea>
        </div>`;

        //Right click event to add a new note (Event Listener)
        const btnAddNote = this.rootElement.querySelector(".folder");
        const noteTitle = this.rootElement.querySelector(".note_title");
        noteTitle.setAttribute("data-isDirty", "false");
        const noteBody = this.rootElement.querySelector(".note_body");
        noteTitle.setAttribute("data-isDirty", "false");  //! We will use this to check if the value of the title or body text has changed

        //! contextMenu will be a substitute for right click
        btnAddNote.addEventListener("contextmenu", () => {
            this.onNoteAdd();
        });
        
        [noteTitle, noteBody].forEach(inputField => {
            //! This event happens when we no longer click on the note or we hit eneter
            inputField.addEventListener("blur", () => {
                if(inputField.dataset.isDirty)
                    this.updateInputField(inputField)
                })
            inputField.addEventListener("change", () => {
                inputField.dataset.isDirty = true
            })
        });

        this.setNotePreviewVisible(false);
    }

    updateInputField(inputField){
        console.log(`called for ${inputField.className}`);
        inputField.dataset.isDirty = false;
        this.onNoteEdit(inputField);
    }
    
    _createListItemHtml(id, title, body, updated) {
        const Max_Body_Length = 40;
        return `<section class="notelist-item" data-note-id="${id}">
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

            noteListItem.addEventListener("dblclick", () => {
                const willDelete = confirm("Do you want to delet this note");

                if (willDelete) 
                    this.onNoteDelete(noteListItem.dataset.noteId);

            })
        });
    }

    getActiveNote(note){
        this.rootElement.querySelector(".note_title").value = note.title;
        this.rootElement.querySelector(".note_body").value = note.body;

        //? if other elements are already selected then we have to remove it
        this.rootElement.querySelectorAll(".notelist-item.selected").forEach(noteItem => {
            noteItem.classList.remove("selected");
        }) //! Activates the Css selector

        this.rootElement.querySelector(`.notelist-item[data-note-id="${note.id}"]`).classList.add("selected");
    }

    setNotePreviewVisible(visible){
        this.rootElement.querySelector(".notes_editor").style.visibility = visible ? "visible" : "hidden";
    }
}
