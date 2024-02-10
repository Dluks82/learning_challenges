import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    let data = this.#database[table] ?? [];
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    const currentValues = this.#database[table][rowIndex];

    if (rowIndex > -1) {
      const newValues = { ...currentValues, ...data };

      this.#database[table][rowIndex] = newValues;

      this.#persist();

      return newValues;
    } else {
      return { error: "task does not exist", id: id };
    }
  }

  conclude(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    const currentValues = this.#database[table][rowIndex];

    if (rowIndex > -1) {
      const newValues = { ...currentValues, ...data };

      this.#database[table][rowIndex] = newValues;

      this.#persist();

      return newValues;
    } else {
      return { error: "task does not exist", id: id };
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    const task = this.#database[table][rowIndex];
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);

      this.#persist();

      return task;
    } else {
      return { error: "task does not exist", id: id };
    }
  }
}
