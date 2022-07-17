import "./App.css";
import { useState, useEffect, useCallback } from "react";
import  Axios  from "axios";
//import { useSpeechSynthesis } from "react-speech-kit";
export const App = () => {


  const [inputWord, setInputWord] = useState("");
  const [inputMeaning, setInputMeaning] = useState("");
  const [wordList , setWordList] = useState([]); 
  const [isBeingEdited, setIsBeingEdited] = useState(false)
  const [newWord, setNewWord] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
//  const {speak} = useSpeechSynthesis();

  const queryVocabs = useCallback(() => {
    Axios.get("http://localhost:3001/vocablaries").then((response) => {
      setWordList(response.data);
    })
  }, [])

  const onClickAdd = () => {
    if(inputMeaning === "" || inputWord === "") return;
    else{
        Axios.post('http://localhost:3001/create', {
      //key: variable to pass
      inputWord: inputWord,
      inputMeaning: inputMeaning,
    }).then((response) => {
      if(response.status === 200) queryVocabs()
    })
    }
    setInputWord("");
    setInputMeaning("");
  }

  useEffect(() => {
    console.log('state updated')
  }, [])

  useEffect(() => {
    queryVocabs()
  }, [])

  // const onClickHandle = (e) => {
  //   speak({word: e.word_name});
  // }

  const onClickEdit = (id) => {

    // setNewWord();
    // setNewMeaning()

    console.log(wordList);
    console.log(newWord);

    setIsBeingEdited(true);
    console.log(isBeingEdited);


      setWordList(prev => prev.filter((val) => {
        console.log(val.id,val.id === id);
        
        return val.id === id;}))
        console.log(wordList)
        setNewWord();
        setNewMeaning();

        console.log(wordList.id);

    //    wordList.map((val) =>{
    //     if(val.id === id) {
    //       return `
    //     <input value={el.word_definition || el.inputMeaning} type="text"/>
    //     <button className="update-button" onClick={onClickEdit}>update</button>
    //     `
    //     }
      
    // })
  }

  const onClickUpdate = (id) => {
    queryVocabs();
    setIsBeingEdited(false);
    console.log(isBeingEdited);
    console.log("before put")

    console.log(newWord)
    console.log(newMeaning)

      Axios.put("http://localhost:3001/update", { word: newWord,meaning: newMeaning, id: id })
      .then(
        (response) => {
          console.log(response);
        }
      )
      .catch(error => {
        console.log(error);
      })

    queryVocabs();
      
    }

  const onClickDelete = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      console.log(response);
      
    setWordList(prev => prev.filter((val) => {
        return val.id !== id;
      }))
    })


  }

  const onChangeWords = (e) => {
    return setInputWord(e.target.value);
  }

  const onChangeMeaning = (e) => {
    return setInputMeaning(e.target.value);
  }

  const onChangeNewWords = (e) => {
    setNewWord(e.target.value);
    console.log(newWord);
    
    return setNewWord(e.target.value);
  }

  const onChangeNewMeaning = (e) => {
    setNewMeaning(e.target.value);
    console.log(newMeaning);
    return setNewMeaning(e.target.value);
  }



  return (
    <>
    <div className="container">
      <div className="form-wrapper">
        <h1>Add the word and the meaning</h1>
        <form>
          <input onChange={onChangeWords} value={inputWord} placeholder= "Word"type="text" />
          <input onChange={onChangeMeaning} value={inputMeaning} placeholder="Meaning" type="text" />
        </form>
        <button onClick={onClickAdd}>add</button>
      </div>
      <div className="wordList-wrapper">
        <ul>
          {wordList.map((el, index) => {
            return(
              <li id={el.id} key={'key: '+ el.id}>
                {/* <input value={el.word_name || el.inputWord} type="text"/>
                <input value={el.word_definition || el.inputMeaning} type="text"/> */}
                {!isBeingEdited &&  <span>{el.word_name || el.inputWord}</span>}
                {!isBeingEdited &&  <span>{el.word_definition || el.inputMeaning}</span>}
                {!isBeingEdited && <button className="edit-button" onClick={()=>onClickEdit(el.id)}>edit</button>}
                {!isBeingEdited && <button onClick={()=>onClickDelete(el.id)} id={index}>delete</button>}
                {/* <button className="update-button" onClick={onClickEdit}>update</button> */}
                {isBeingEdited &&  <input onChange={onChangeNewWords} value={(newWord === undefined) ? el.word_name : newWord} type="text"/>}
                {isBeingEdited &&  <input onChange={onChangeNewMeaning} value={newMeaning || el.word_definition} type="text"/>}
                {isBeingEdited &&  <button className="update-button" onClick={()=>onClickUpdate(el.id)}>update</button>} 
              </li>
            )
          })}
        </ul>
      </div>
   </div>
   </>
  );
}

export default App;
// el.word_name || el.inputWord
// el.word_definition || el.inputMeaning