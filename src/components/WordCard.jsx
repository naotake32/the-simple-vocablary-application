import React, { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";



export const WordCard = ({ el, index, queryVocabs, wordList, setWordList, editedWord, editedDef }) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [newMeaning, setNewMeaning] = useState("");

  const {speak} = useSpeechSynthesis();

  const onClickEdit = (id) => {
    // setNewWord();
    // setNewMeaning()

    console.log("-----------------------------------------",id);
    console.log(newWord);

    setIsBeingEdited(prev => {
      console.log("setEdit",prev)
      return !prev
    } )
    
   

    setWordList((prev) =>
      prev.filter((val) => {
        console.log(val.id, val.id === id);

        return val.id === id;
      })
    );
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

  useEffect(()=>{
    console.log(wordList);

  },[wordList])

  useEffect(()=>{
    //execute to check the value of state
    console.log("isEdit",isBeingEdited);
  },[isBeingEdited])

  const updateWords = async() =>{

    console.log("newword",newWord)
    console.log("newmean",newMeaning)

    const response = await Axios.put("http://localhost:3001/update", {
      word: newWord,
      meaning: newMeaning,
      id: el.id,
    })
    console.log(response)
      // .then((response) => {
      //   console.log(response);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
      

    //obtain values inside the db after the "new" data has been renewed
    queryVocabs();
   
    
    
    console.log("called");
  


  }

  //execute if "newWord" or "newMeaning" will be changed
  useEffect(()=>{
    //don't execute unless "isBeingEdited" is false
    if(isBeingEdited) return
    //don't execute unless "newMeaning or newWord" are true
    if(!newMeaning || !newWord) return
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    updateWords()
 
  },[newWord,newMeaning])

  const onClickUpdate =  (id) => {
    console.log("called");
    console.log("new wo",newWord)
    console.log("new mn",newMeaning)



    if (newMeaning === "" || newWord === "") return;
      else if(newMeaning === undefined && newWord === undefined ){
      console.log("empty")
      setNewWord(editedWord);
      setNewMeaning(editedDef);
    } else if(newMeaning === undefined ){
      setNewMeaning(editedDef);
    }else if(newWord === undefined ) {
      console.log('enter')
      setNewWord(editedWord);
    } else{
    updateWords();

    }
      setIsBeingEdited(isBeingEdited => !isBeingEdited);
    
  
    
  };

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
      {!isBeingEdited && 
      <>
        <span>{el.word_name }</span>
        <span>{el.word_definition }</span>
        
          <button className="edit-button" onClick={() => onClickEdit(el.id)} id={index}>
            edit
          </button>
      
      
          <button onClick={() => onClickDelete(el.id)} id={index}>
            delete
          </button>
          <button onClick={() => speak({text:el.word_name})}>▶</button>
      </>
      
    }
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