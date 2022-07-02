import { useState, useEffect } from "react";
import  Axios  from "axios";
import axios from "axios";
export const App = () => {

  const [inputWord, setInputWord] = useState("");
  const [inputMeaning, setInputMeaning] = useState("");
  const [wordList , setWordList] = useState([]); 
  const [isChangable, setIsChangable] = useState(true);

  const onClickAdd = () => {
    console.log(inputMeaning);
    console.log(inputWord);
    

    Axios.post('http://localhost:3001/create', {
      //key: variable to pass
      inputWord: inputWord,
      inputMeaning: inputMeaning,
    }).then(() => {
      console.log("success!!")
    })

    if(inputMeaning === "" || inputWord === "") return;
    else{
      wordList.push({inputWord, inputMeaning});
    }
    console.log(wordList);
    
    setInputWord("");
    setInputMeaning("");
  }

  useEffect(() => {
    console.log('state updated')
  }, [wordList])

  useEffect(() => {
    Axios.get("http://localhost:3001/vocablaries").then((response) => {
      setWordList(response.data);
      console.log(response.data);
      console.log(response);
      console.log(wordList);
      console.log(inputWord);
      console.log(inputMeaning);
    })
  }, [])

  const onClickEdit = () => {
    setIsChangable(false);
    console.log(isChangable);
  }

  const onClickDelete = (e) => {
    let targetId = e.target.parentNode.id;
    let targetIndex = null;

    //identify the index of target element
    wordList.forEach((item, index) => {
    console.log(targetId);
    console.log(item.inputWord);
    if(item.inputWord === targetId) targetIndex = index;
    })

    
    let copy = wordList;
    copy.splice(targetIndex, 1);
    console.log('targetIndex',targetIndex);
    setWordList([...copy]);
    console.log(copy);
  }

  const onChangeWords = (e) => {
    return setInputWord(e.target.value);
  }

  const onChangeMeaning = (e) => {
    return setInputMeaning(e.target.value);
  }

  return (
    <>
    <div style={{width: "100%", height: "100%", backgroundColor: "#B9F2B4", minHeight: "1000px"}}>
      <div className="form-wrapper" style={{display: "flex", flexDirection: "column" ,alignItems: "center"}}>
        <h1 style={{textAlign: "center"}}>Add the word and the meaning</h1>
        <form style={{display: "flex", flexDirection: "column"}}>
          <input onChange={onChangeWords} value={inputWord} style={{height: "50px", width: "210px", borderRadius: "8px"}} placeholder= "Word"type="text" />
          <input onChange={onChangeMeaning} value={inputMeaning} style={{height: "50px", width: "210px", borderRadius: "8px"}} placeholder="Meaning" type="text" />
        </form>
        <button style={{color: "White", backgroundColor: "#22D0B1", width: "100px", height: "40px" ,borderRadius: "8px"}} onClick={onClickAdd}>add</button>
      </div>
      <div className="wordList">
        <ul>
          {wordList.map((el, index) => {
            return(
              <li id={el.inputWord} key={'key: '+ el.inputWord}>
                <input value={el.word_definition} type="text" readOnly={isChangable} style={{width: "210px", height: "50px", borderRadius: "8px"}}/>
                <input value={el.inputMeaning} type="text" readOnly={isChangable} style={{width: "210px", height: "50px", borderRadius: "8px"}} />
                <button style={{color: "White", backgroundColor: "#22D0B1", width: "100px", height: "40px" ,borderRadius: "8px"}} onClick={onClickEdit}>edit</button>
                <button style={{color: "White", backgroundColor: "#22D0B1", width: "100px", height: "40px" ,borderRadius: "8px"}} id={index} onClick={onClickDelete}>delete</button>
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
