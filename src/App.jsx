import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


export default function Glossary() {

  const [entries, setEntries] = useState([]);
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");

  function handleEntryInput(e) {
    if (e.target.name == "sourceText") {
      setSourceText(e.target.value);
    } else {
      setTargetText(e.target.value);
    }
  }

  function handleAddEntry(e) {
    e.preventDefault();
    const newID = uuidv4();
    const newEntry = {
      id: newID,
      sourceText: e.target.sourceText.value,
      targetText: e.target.targetText.value,
    };
    const updatedEntries = entries.slice();
    updatedEntries.push(newEntry);
    setEntries(updatedEntries);
    setSourceText("");
    setTargetText("");
  }

  function handleChangeEntry(e, updatedEntry) {
    e.preventDefault();
    let updatedEntries = entries.map(
      entry => {
        if (entry.id === updatedEntry.id) {
          return updatedEntry;
        } else {
          return entry;
        }
      }
    );
    setEntries(updatedEntries);
  }

  function handleDeleteEntry(entryID) {
    let updatedEntries = entries.filter(entry => entry.id !== entryID);
    setEntries(updatedEntries);
  }

  return (
    <>
      <AddEntry
        sourceText={sourceText}
        targetText={targetText}
        onAddEntry={handleAddEntry}
        onEntryInput={handleEntryInput}
      />
      <EntryList
        entries={entries}
        onChangeEntry={handleChangeEntry}
        onDeleteEntry={handleDeleteEntry}
      />
    </>
  );
}


function AddEntry({ sourceText, targetText, onAddEntry, onEntryInput }) {
  return (
    <form onSubmit={onAddEntry} >
      <input
        type="text"
        id="sourceText"
        name="sourceText"
        value={sourceText}
        placeholder="Source text"
        onChange={onEntryInput}
      />
      &nbsp;
      <input
        type="text"
        id="targetText"
        name="targetText"
        value={targetText}
        placeholder="Target text"
        onChange={onEntryInput}
      />
      &nbsp;
      <button type="submit">Submit</button>
    </form>
  )
}


function EntryList({ entries, onChangeEntry, onDeleteEntry }) {
  return (
    <ul>
      {entries.map(entry => (
        <li key={entry.id}>
          <Entry
            entry={entry}
            onChange={onChangeEntry}
            onDelete={onDeleteEntry}
          />
        </li>
      ))}
    </ul>
  );
}


function Entry({ entry, onChange, onDelete }) {

  const [isEditing, setIsEditing] = useState(false);
  let entryContent;

  // The displayed content changes depending on whether the entry is being edited.
  // If the entry is currently being edited.
  if (isEditing) {
    entryContent = (
      <>
        <form onSubmit={() => { setIsEditing(false); onChange; }} >

          <input
            value={entry.sourceText}
            onChange={
              e => {onChange({ ...entry, sourceText: e.target.value });
            }}
          />
          &nbsp;
          <input
            value={entry.targetText}
            onChange={
              e => {onChange({ ...entry, targetText: e.target.value });
            }}
          />
          &nbsp;
          <button type="submit" >Save</button>
        </form>
      </>
    );
  // If the entry is not being edited.
  } else {
    entryContent = (
      <>
        {entry.sourceText}
        &nbsp;
        {entry.targetText}
        &nbsp;
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }

  return (
    <label>
      {entryContent}
      &nbsp;
      <button onClick={() => onDelete(entry.id)}>
        Delete
      </button>
    </label>
  );
}
