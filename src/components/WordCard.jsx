import React, { useState } from "react";
import Axios from "axios";

export const WordCard = ({ el, index, queryVocabs, wordList, setWordList, refreshPage, editedWord, editedDef }) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [newMeaning, setNewMeaning] = useState("");

  const onClickEdit = (id) => {
    // setNewWord();
    // setNewMeaning()

    console.log(wordList);
    console.log(newWord);

    setIsBeingEdited(!isBeingEdited);
    console.log(isBeingEdited);

    setWordList((prev) =>
      prev.filter((val) => {
        console.log(val.id, val.id === id);

        return val.id === id;
      })
    );
    console.log(wordList);
    setNewWord();
    setNewMeaning();

    console.log(wordList);

    //    wordList.map((val) =>{
    //     if(val.id === id) {
    //       return `
    //     <input value={el.word_definition || el.inputMeaning} type="text"/>
    //     <button className="update-button" onClick={onClickEdit}>update</button>
    //     `
    //     }

    // })
  };

  const onClickUpdate = async (id) => {
    console.log("called");


    if (newMeaning === "" || newWord === "") return;
      else if(newWord === undefined ){
      setNewWord(editedWord);
    } else if(newMeaning === undefined ){
      setNewMeaning(editedDef);
    } 
    
      queryVocabs();
      setIsBeingEdited(!isBeingEdited);
      console.log(isBeingEdited);
      const response = await Axios.put("http://localhost:3001/update", {
            word: newWord,
            meaning: newMeaning,
            id: id,
          })
      console.log(response)
        // .then((response) => {
        //   console.log(response);
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
        
      queryVocabs();
      // refreshPage();
      console.log(editedWord);
      console.log(editedDef);
      console.log(newWord);
      console.log(newMeaning);
      setNewWord(editedWord);
      setNewMeaning(editedDef);
      // console.log("called");
    }

  const onClickDelete = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      console.log(response);

      setWordList((prev) =>
        prev.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  const onChangeNewWords = (e) => {
    return setNewWord(e.target.value);
  };

  const onChangeNewMeaning = (e) => {
    return setNewMeaning(e.target.value);
  };

  return (
    <li id={el.id} key={"key: " + el.id}>
      {/* <input value={el.word_name || el.inputWord} type="text"/>
        <input value={el.word_definition || el.inputMeaning} type="text"/> */}
      {!isBeingEdited && <span>{el.word_name || el.inputWord}</span>}
      {!isBeingEdited && <span>{el.word_definition  || el.inputMeaning}</span>}
      {!isBeingEdited && (
        <button className="edit-button" onClick={() => onClickEdit(el.id)}>
          edit
        </button>
      )}
      {!isBeingEdited && (
        <button onClick={() => onClickDelete(el.id)} id={index}>
          delete
        </button>
      )}
      {/* <button className="update-button" onClick={onClickEdit}>update</button> */}
      {isBeingEdited && (
        <input
          onChange={onChangeNewWords}
          value={newWord === undefined ? editedWord : newWord}
          type="text"
        />
      )}
      {isBeingEdited && (
        <input
          onChange={onChangeNewMeaning}
          value={newMeaning === undefined ? editedDef : newMeaning}
          type="text"
        />
      )}
      {isBeingEdited && (
        <button className="update-button" onClick={() => onClickUpdate(el.id)} >
          update
        </button>
      )}
    </li>
  );
};

export default WordCard;
//newWord === editedWord ? newWord : setNewword(editedWord),