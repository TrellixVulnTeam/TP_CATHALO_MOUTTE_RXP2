class GenreRepository {
    constructor(database) {
        this.database = database;
    }

    list() {
        return new Promise((resolve, reject) => {
            console.log("TEST");
            this.database.all('SELECT * FROM genres', [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(
                        rows,
                    );
                }
            });
        });
    }

   create(data) {
        return new Promise((resolve, reject) => {
            this.database.run(
                'INSERT INTO genres (id, name) VALUES (?,?)',
                [data.contents, data.done ? 1 : 0],
                function (err) {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                },
            );
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.database.run(
                `DELETE FROM genres
                 WHERE id = ?`,
                [id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve(true);
                    }
                },
            );
        });
    }
}

module.exports = GenreRepository;