export default class SideBar {
    constructor(rootElement, callbacks = []) 
    {
        this.root = rootElement;
        this.container = this.root.querySelector(".folder");
        this.button = this.root.querySelector("#myBtn");
        this.callbacks = {};
        if(callbacks.length > 0) 
          callbacks.forEach((f,i) => {
            try {
              if(typeof f === "function")
                this.setCallBacks(f);
              else 
                throw new Error(`The type of element at index ${callbacks} is not a function`);
            } catch(e) {
               console.log(e);
            }
          console.log(this.callbacks);
        });

        this.button.addEventListener("click", () => {
          this.callbacks.onNoteAdd("Untitled","");
        });
    }

    setCallBacks(func){this.callbacks[func.name] = func;}

    updateNoteList(notes) {
        //Empty list
        this.container.innerHTML = "";
        for (const note of notes) {
          const htmlString = this.createItemListHtml(note.id, note.title,
                                                     note.body, new Date(note.last_updated));
          
          const template = document.createElement("template");
          template.innerHTML = htmlString.trim();
          this.container.append(template.content.firstChild);
        }
       this.container
          .querySelectorAll(".notelist-item")
          .forEach((noteListItem) => {
            noteListItem.addEventListener("click", () => {
              this.callbacks?.onNoteSelect(noteListItem.dataset.noteId);
           
            });
            noteListItem.addEventListener("dblclick", () => {
              const willDelete = confirm("Do you want to delet this note");
              if (willDelete) 
                this.callbacks?.onNoteDelete(noteListItem.dataset.noteId);
            });
          });

          
    }
    createItemListHtml(id, title, body, updated) {
        const Max_Body_Length = 40;
        //! I may want to use DOMparser here instead of dealing with literal no time right now though
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


  updateNotesClassList(id){
    this.container.querySelectorAll(".notelist-item.selected")
      .forEach(element => element.classList.remove("selected"));
    this.container.querySelector(`.notelist-item[data-note-id="${id}"]`)
      .classList.add("selected"); 
  }
}


