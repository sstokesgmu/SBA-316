This is a basic note taking app insipired by Obsidian: 

The app uses local storage which is a web storage feature that allows me to store key-value pairs in the browser. In this case a key of **notes**.

I use main a bridge between the "front-end" scripts: NoteSideBar.js, NoteEditor to the "back-end" scripts of the NotesAPI.js. There are couple of events that handle: editing, adding, selecting, and deleting notes. Here's how to work the app.

1. Click the button first to add the note, if you type in the editor section nothing will happen sadly 
2. You can click on the note to select it and double click to delete it (add as many notes as you want)
3. When you select a note you can edit the title and body. Those changes will appear in the side bar and are permanant thanks to the local storage.


**Note Added**:  
- Use the parent-child-sibling relationship to navigate between elements at least once (firstChild, lastChild, parentNode, nextElementSibling, etc.).
