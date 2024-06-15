import * as SQLite from 'expo-sqlite/legacy';
import { Place } from '../models/place';

const database = SQLite.openDatabase('places.db');

export function init() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                address TEXT NOT NULL,
                description TEXT NOT NULL,
                category TEXT NOT NULL,
                date TEXT NOT NULL,
                imageUri TEXT NOT NULL
            )`,
            [],
            () => {
                resolve();
            },
            (_, error) => {
                reject(error);
            }
            );
        });
    }); 

    return promise;
}

export function insertPlace(place) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`INSERT INTO places (title, address, description, category, date, imageUri) VALUES (?, ?, ?, ?, ?, ?)`,
            [place.title, place.address, place.description, place.category, place.date, place.imageUri],
            (_, result) => {
                resolve(result);
            },
            (_, error) => {
                reject(error);
            }
            );
        });
    });

    return promise;
}

export function fetchPlaces() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`SELECT * FROM places`, [],
            (_, result) => {
                //console.log(JSON.stringify(result, null, 2));
                const places = [];

                for (const db of result.rows._array) {

                    places.push(new Place(db.title, db.address, db.description, db.category, db.date, db.imageUri, db.id));
                }

                resolve(places);
            },
            (_, error) => {
                reject(error);
            }
            );
        });
    });

    return promise;
}

export function fetchCategoryPlaces(category) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM places WHERE  category = ?`,
                [category],
                (_, result) => {
                    const places = [];

                    for (const db of result.rows._array) {
                        places.push(new Place(db.title, db.address, db.description, db.category, db.date, db.imageUri, db.id));
                    }

                    resolve(places);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });

    return promise;
}

export function fetchPlaceDetails(id) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM places WHERE id = ?`, 
                [id], 
                (_, result) => {
                    resolve(result.rows._array[0]);
                }, 
                (_, error) => {
                    reject(error)
                });
        });
    });

    return promise;
}

export function deletePlace(id) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM places WHERE id = ?`,
                [id],
                (_, result) => {
                    resolve(result)
                },
                (_, error) => {
                    reject(error)
                }
            );
        });
    });

    return promise;
}

export function editPlace(place) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `UPDATE places 
                 SET title = ?, address = ?, description = ?, category = ?, date = ?, imageUri = ? 
                 WHERE id = ?`,
                [place.title, place.address, place.description, place.category, place.date, place.imageUri, place.id],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        })
    });

    return promise;
}

export function countPlaces(category) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT COUNT() FROM places
                 WHERE category = ?`,
                [category], 
                (_, result) => {
                    const numberOfPlaces = result.rows._array[0]["COUNT()"];
                    resolve(numberOfPlaces)
                },
                (_, error) => {
                    reject(error)
                }
            );
        });
    });

    return promise;
}