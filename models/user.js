const db = require('../util/database');

module.exports = class User {
    constructor(name, email, password, protype) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.protype = protype
    }

    static find(email) {
        console.log('Entra a find', [email]);
        return db.execute('SELECT * FROM users WHERE email = ?', [email]);
    }

    static save(user) {
        console.log('Entra a save');
        return db.execute(
            'INSERT INTO users (name, email, password, protype) VALUES (?, ?, ?, ?)', [user.name, user.email, user.password, user.protype]
        );
    }

    static getUser(id) {

        console.log('Entra a getUser con id: ', id);
        return db.execute('SELECT * FROM users WHERE id = ?', [id]);
    }



};