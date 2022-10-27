const express = require('express');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const postsRoutes = require('./routes/posts');

const errorController = require('./controllers/error');

const app = express();

const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Accept, X-Custom-Header, Authorization'
    );
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use('/auth', authRoutes);

// app.use('/post', postsRoutes);

//Recibir json de pets
app.get("/pets", (req, res) => {
    fs.readFile(__dirname + "/" + "pets.json", "utf8", (err, data) => {
        console.log(data);
        res.end(data);
    })
});


// //Recibir json de peliculas
app.get("/movies", (req, res) => {
    fs.readFile(__dirname + "/" + "peliculas.json", "utf8", (err, data) => {
        console.log(data);
        res.end(data);
    })
});

app.post("/addPet", (req, res) => {
    fs.readFile(__dirname + "/" + "pets.json", "utf8", (err, data) => {
        data = JSON.parse(data);
        data["pet4"] = newPet["pet4"];
        console.log(data);
        res.end(JSON.stringify(data));
    })
})

app.delete("/delPet", (req, res) => {
    fs.readFile(__dirname + "/" + "pets.json", "utf8", (err, data) => {
        data = []
    })
})

app.patch("/upPet", (req, res) => {
    fs.readFile(__dirname + "/" + "pets.json", "utf8", (err, data) => {
        data = JSON.parse(data);
        data["pet4"] = newPet["pet4"];
    })
})


app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening on port ${ports}`));