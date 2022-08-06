import "./App.css";
import { useState, useEffect, useCallback } from "react";
import  Axios  from "axios";
import WordCard from "./components/WordCard";


export const App = () => {


  const [inputWord, setInputWord] = useState("");
  const [inputMeaning, setInputMeaning] = useState("");
  const [wordList , setWordList] = useState([]); 


  const queryVocabs = useCallback(() => {
    Axios.get("http://localhost:3001/vocablaries").then((response) => {
      setWordList(response.data);
    })
  }, [])


  const onClickAdd = () => {
    console.log("add")
    if(inputMeaning === "" || inputWord === "") return;
    else{
      console.log("create!!!!!!!!!!!!!!!!!!!!!!")
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

  

 
  const onChangeWords = (e) => {
    return setInputWord(e.target.value);
  }

  const onChangeMeaning = (e) => {
    return setInputMeaning(e.target.value);
  }




  return (
    <>
    <div className="container">
      <div className="form-wrapper">
        <h1>Add the word and the meaning</h1>
        <form>
          <input onChange={onChangeWords} value={inputWord} placeholder= "Word" type="text" />
          <input onChange={onChangeMeaning} value={inputMeaning} placeholder="Meaning" type="text" />
        </form>
        <button onClick={onClickAdd}>add</button>
      </div>
      <div className="wordList-wrapper">
        <ul>
          {wordList.map((el, index) => {
            return(
              <WordCard 
              el={el} 
              editedWord={el.word_name}
              editedDef={el.word_definition}
              key={el.word_name} 
              queryVocabs={queryVocabs}  
              wordList={wordList} 
              setWordList={setWordList}/>
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