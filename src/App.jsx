import { useState } from 'react';


const initialEntries = [
  { id: 1, sourceText: '情報', targetText: 'information' },
  { id: 2, sourceText: '装置', targetText: 'device, apparatus' },
  { id: 3, sourceText: '発明', targetText: 'invention' },
];


export default function Glossary() {

  const [entries, setEntries] = useState(initialEntries);
  // const [entries, setEntries] = useState([]);

  function handleAddEntry(e) {
    e.preventDefault();
    const id = entries.length + 1;
    const sourceText = e.target.sourceText.value;
    const targetText = e.target.targetText.value;
    const newEntry = {
      id: id,
      sourceText: sourceText,
      targetText: targetText,
    };
    const currentEntries = entries.slice();
    const updatedEntries = currentEntries.concat(newEntry);
    setEntries(updatedEntries);
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

  function handleDeleteEntry(entryId) {
    let updatedEntries = entries.filter(entry => entry.id !== entryId);
    setEntries(updatedEntries);
  }

  return (
    <>
      <AddEntry
        onAddEntry={handleAddEntry}
      />
      <EntryList
        entries={entries}
        onChangeEntry={handleChangeEntry}
        onDeleteEntry={handleDeleteEntry}
      />
    </>
  );
}


function AddEntry({ onAddEntry }) {

  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");

  return (

    <form onSubmit={onAddEntry} >

      <input
        type="text"
        id="sourceText"
        name="sourceText"
        value={sourceText}
        placeholder="Source text"
        onChange={e => setSourceText(e.target.value)}
      />

      &nbsp;

      <input
        type="text"
        id="targetText"
        name="targetText"
        value={targetText}
        placeholder="Target text"
        onChange={e => setTargetText(e.target.value)}
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

  // Alter the displayed content depending on whether the entry is being edited.
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
