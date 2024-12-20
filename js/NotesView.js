export default class NotesView {
  //!Will use object deconstruction
  constructor(
    rootElement,
    activeNote,
    { onNoteAdd, onNoteDelete, onNoteSelect, onNoteEdit } = {}
  ) {
    this.rootElement = rootElement;
    //! How come double qoutes will work
    //! Will switch out later for context menuu
    this.rootElement.innerHTML = `   
          <div class="notes_sidebar" id="sideMenu">
              <button id="myBtn">Try it</button> 
              <div class="folder" id="root">
              </div>
          </div>
          <div class="notes_editor">
              <input class="note_title" placeholder="Enter Title ... " data>
              <textarea class="note_body" placeholder="Start Writing Here..."></textarea>
          </div>`;

    this.noteEditor = this.rootElement.querySelector(".notes_editor");
    //console.log(this.noteEditor);
    this.noteSideBar = this.rootElement.querySelector(".notes_sidbar");
    this.activeNote = activeNote;
    this.nullNote = `   <input class="note_title" placeholder="Enter Title ... " data>
              <textarea class="note_body" placeholder="Start Writing Here..."></textarea>`;
    //Events
    this.onNoteAdd = onNoteAdd;
    this.onNoteDelete = onNoteDelete;
    this.onNoteSelect = onNoteSelect;
    this.onNoteEdit = onNoteEdit;
    console.log(this.activeNote);

    this.resetNoteEditor();

    const button = document.getElementById("myBtn");
    button.addEventListener("click", () => {
      this.onNoteAdd("Untitled", "", "");
    });
  }

  resetNoteEditor(){
    this.noteEditor.innerHTML = this.nullNote;
    const noteTitle = this.rootElement.querySelector(".note_title");
    noteTitle.setAttribute("data-isDirty", "false");
    const noteBody = this.rootElement.querySelector(".note_body");
    noteTitle.setAttribute("data-isDirty", "false"); //! We will use this to check if the value of the title or body text has changed

    
    [noteTitle, noteBody].forEach((inputField) => {
      //! This event happens when we no longer click on the note or we hit eneter
      inputField.addEventListener("blur", () => {
        if (inputField.dataset.isDirty) {
          this.activeNote.title = noteTitle.value;
          this.activeNote.body = noteBody.value;
          this.onNoteEdit(this.activeNote);

          inputField.dataset.isDirty = false;
        }
      });
      inputField.addEventListener("change", () => {
        inputField.dataset.isDirty = true;
      });
    });

  }

  _createListItemHtml(id, title, body, updated) {
    const Max_Body_Length = 40;
    return `<section class="notelist-item" data-note-id="${id}">
                        <section id="note_small_title">${title}</section>
                        <section id="note_small_body">
                            ${body.substring(0, Max_Body_Length)}
            
                            ${body.length > Max_Body_Length ? "..." : ""}
                        </section>
                        <section id="note_time">
                        ${updated.toLocaleString(undefined, {
                          dateStyle: "full",
                          timeStyle: "short",
                        })}
                        </section>
                    </section>
        `;
  }
//!if the body property is undefined we can get an odd errorb
  updateNoteList(notes) {
    const notesListContainer = this.rootElement.querySelector(".folder");
    //Empty list
    notesListContainer.innerHTML = "";
    for (const note of notes) {
      const htmlString = this._createListItemHtml(
        note.id,
        note.title,
        note.body,
        new Date(note.last_updated)
      );
      const template = document.createElement("template");
      template.innerHTML = htmlString.trim();
      notesListContainer.append(template.content.firstChild);
    }
    //! Add select/delete events for each list item
    notesListContainer
      .querySelectorAll(".notelist-item")
      .forEach((noteListItem) => {
        noteListItem.addEventListener("click", () => {
          document.getElementById("context-menu");
          this.onNoteSelect(noteListItem.dataset.noteId); //? What does this mean?
        });
        noteListItem.addEventListener("dblclick", () => {
          const willDelete = confirm("Do you want to delet this note");
          if (willDelete) this.onNoteDelete(noteListItem.dataset.noteId);
        });
      });
  }

  setNoteEditor(note) {
    //Modify the text elemenst of the editor
    this.rootElement.querySelector(".note_title").value = note.title;
    this.rootElement.querySelector(".note_body").value = note.body;

    //If a previous object was selected remove it
    this.rootElement
      .querySelectorAll(".notelist-item.selected")
      .forEach((noteItem) => {
        noteItem.classList.remove("selected");
      });

    this.rootElement
      .querySelector(`.notelist-item[data-note-id="${note.id}"]`)
      .classList.add("selected");
    this.activeNote = note;
    console.log(this.activeNote);
  }
}
