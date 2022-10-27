const db = require('../util/database');

module.exports = class Post {
    constructor(name, fechanac, escolaridad, quejaMemoria) {
        this.name = name;
        this.fechanac = fechanac;
        this.escolaridad = escolaridad;
        this.quejaMemoria = quejaMemoria;

    }

    static fetchAll() {
        return db.execute('SELECT * FROM pacientes');
    }

    static save(post) {
        return db.execute(
            'INSERT INTO pacientes (name, fechanac, escolaridad, quejaMemoria) VALUES (?, ?, ?,?)', [post.name, post.fechanac, post.escolaridad, post.quejaMemoria]
        );
    }

    static delete(id) {
        console.log('Entra a delete paciente: ', id);
        return db.execute('DELETE FROM pacientes WHERE paciente_id = ?', [id]);
    }

    static getPaciente(paciente_id) {
        console.log('Entra a getPaciente con: ', Number(paciente_id));

        return db.execute('SELECT * FROM pacientes WHERE paciente_id = ?', [Number(paciente_id)]);
    }

    static getPacienteName(name) {

        console.log('Entra a getPacienteId con Name : ', name);

        return db.execute('SELECT * FROM pacientes WHERE name = ?', [name]);
    }

    static postPoints(test) {
        console.log('Entra a get Puntaje en models', test);

        const sql = `INSERT INTO tests(
  paciente_id,
  visoespacial,
  atencion,
  recuerdodiferido,
  memoria,
  denominacion,
  lenguaje,
  abstraccion,
  orientacion,
  total
) 
VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ?)`
        return db.execute(sql, [test.paciente_id, test.visoespacial, test.atencion, test.recuerdodiferido, test.memoria, test.denominacion, test.lenguaje, test.abstraccion, test.orientacion, test.total]);
    }

    // getTest

    static getTest(paciente_id) {
        console.log('Entra a getTests models: ', paciente_id);

        console.log('Entra a getPaciente con: ', Number(paciente_id));

        return db.execute('SELECT * FROM tests WHERE paciente_id = ?', [Number(paciente_id)]);
    }

    // getTestId

    static getTestId(test_id) {
        console.log('Entra a getTests ud models: ', test_id);

        console.log('Entra a gettestid con: ', Number(test_id));

        return db.execute('SELECT * FROM tests WHERE test_id = ?', [Number(test_id)]);
    }

};