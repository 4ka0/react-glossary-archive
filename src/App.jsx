import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


export default function Glossary() {

  const [entries, setEntries] = useState([]);
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");

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

  function handleAddEntryInput(e) {
    if (e.target.name == "sourceText") {
      setSourceText(e.target.value);
    } else {
      setTargetText(e.target.value);
    }
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

  function handleChangeEntryInput(targetEntry, newValue, targetName) {
    let updatedEntries = entries.map(
      entry => {
        if (entry.id === targetEntry.id) {
          if (targetName == "sourceText") {
            targetEntry.sourceText = newValue;
          } else {
            targetEntry.targetText = newValue;
          }
          return targetEntry;
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
        onAddEntryInput={handleAddEntryInput}
      />
      <EntryList
        entries={entries}
        onChangeEntry={handleChangeEntry}
        onChangeEntryInput={handleChangeEntryInput}
        onDeleteEntry={handleDeleteEntry}
      />
    </>
  );
}


function AddEntry({ sourceText, targetText, onAddEntry, onAddEntryInput }) {
  return (
    <form onSubmit={onAddEntry} >
      <input
        type="text"
        id="sourceText"
        name="sourceText"
        value={sourceText}
        placeholder="Source text"
        onChange={onAddEntryInput}
        required
      />
      &nbsp;&nbsp;
      <input
        type="text"
        id="targetText"
        name="targetText"
        value={targetText}
        placeholder="Target text"
        onChange={onAddEntryInput}
        required
      />
      &nbsp;&nbsp;
      <button type="submit">Submit</button>
    </form>
  )
}


function EntryList({ entries, onChangeEntry, onChangeEntryInput, onDeleteEntry }) {
  return (
    <ul>
      {entries.map(entry => (
        <li
          style={{"padding-top": "6px"}}
          key={entry.id}
        >
          <Entry
            entry={entry}
            onChange={onChangeEntry}
            onChangeInput={onChangeEntryInput}
            onDelete={onDeleteEntry}
          />
        </li>
      ))}
    </ul>
  );
}


function Entry({ entry, onChange, onChangeInput, onDelete }) {

  const [isEditing, setIsEditing] = useState(false);
  let entryContent;

  if (isEditing) {
    entryContent = (
      <>
        <form
          style={{display: "inline"}}
          onSubmit={() => { setIsEditing(false); onChange; }}
        >
          <input
            type="text"
            id="sourceText"
            name="sourceText"
            value={entry.sourceText}
            onChange={(e) => onChangeInput(entry, e.target.value, e.target.name)}
            required
          />
          &nbsp;&nbsp;
          <input
            type="text"
            id="targetText"
            name="targetText"
            value={entry.targetText}
            onChange={(e) => onChangeInput(entry, e.target.value, e.target.name)}
            required
          />
          &nbsp;&nbsp;
          <button type="submit" >Save</button>
        </form>
      </>
    );
  } else {
    entryContent = (
      <>
        {entry.sourceText}
        &nbsp;&nbsp;
        {entry.targetText}
        &nbsp;&nbsp;
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }

  return (
    <label>
      {entryContent}
      &nbsp;&nbsp;
      <button onClick={() => onDelete(entry.id)}>
        Delete
      </button>
    </label>
  );
}
