const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'vocablarydb',
});

app.post("/create", (req, res) => {
    //you can name variables whatever you want
    const sentword = req.body.inputWord;
    const sentmeaning = req.body.inputMeaning;

    console.log("create word",sentword)
    console.log("create word",sentmeaning)


    db.query(
        //It has to be an actual column name
        "INSERT INTO vocablaries (word_name, word_definition) VALUES (?, ?)",
        [sentword, sentmeaning],
        (err, result) => {
            if(err) {
                console.log(err);
            }else {
                res.send("Values Inserted");
            }
        }
    );
});

app.get("/vocablaries", (req, res) => {
    db.query(
        "SELECT * FROM vocablaries",
        (err, result) => {
            if(err) {
                console.log(err)
            }else{
                res.send(result)
            }
        }
    )
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM vocablaries WHERE id = ?", id,
    (err, result) => {
        if(err) {
            console.log(err)
        }else{
            res.send(result)
        }
    });
});

app.put("/update", (req, res) => {
    const id = req.body.id;
    const sentword = req.body.word;
    const sentmeaning = req.body.meaning;
    console.log("put* ",id,sentword,sentmeaning)
    db.query(
        "UPDATE vocablaries SET word_name = ?, word_definition = ? WHERE id = ?",
        [sentword, sentmeaning, id],
        (err, result) => {
            if(err) {
                console.log(err);
            }else{
                res.send(result);
            }
        }
        )
})

app.listen(3001, () => {
    console.log("your server is running on port 3001");
});