export default class SideBar {
    constructor(rootElement, callbacks = []){
        this.root = rootElement;
        this.container = this.root.querySelector("folder");
        this.button = this.container.getElementById("myBtn");
        
    }

    updateNoteList(notes) {
        //Empty list
        this.container.innerHTML = "";
        for (const note of notes) {
          const htmlString = this._createListItemHtml(
            note.id,
            note.title,
            note.body,
            new Date(note.last_updated)
          );
          const template = document.createElement("template");//?
          template.innerHTML = htmlString.trim();//?
          this.container.append(template.content.firstChild);
        }
        //! Add select/delete events for each list item
       this.container
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
    
    createItemListHtml(id, title, body, updated) {
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
}







// const button = document.getElementById("myBtn");
// button.addEventListener("click", () => {
//   this.onNoteAdd("Untitled", "", "");
// });


