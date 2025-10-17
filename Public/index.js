const express = require('express');
const fs = require('fs')
const path = require('path');
const server = express();
const port = 3000;


server.use(express.static(path.join(__dirname, 'public')));

function updateHitCounter(){
    const filePath = 'hits.txt';
    let hits = 0;
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        hits = parseInt(data);
    }
    hits++;
    fs.writeFileSync(filePath, hits.toString());
    return hits;
}

function getRandomWord(){
    const filePath = "allwords.txt";
    if (fs.existsSync(filePath)){
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n')
        const wordCount = lines.length
        const randomLine = lines[Math.floor(Math.random() * wordCount)]
        const [word, part, defn] = randomLine.split('\t');
        return { word: word, part: part, definition: defn}
    }
 
}

server.get('/hits', (req,res)=>{
    const hits = updateHitCounter();
    res.json({hits});
})

server.get('/word', (req,res)=>{
    
    const wordInfo = getRandomWord()
    
    res.json(wordInfo);
})

server.get('/hello', function(req, res) {
    
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(port, () => console.log(`Server listening on port ${port}`));