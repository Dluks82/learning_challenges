import { randomUUID } from "node:crypto";

import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/"),
    handler: (req, res) => {
      return res.end("Welcome to My Tasks Application!");
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select("tasks");

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      const errorMessage = {
        error: "Missing attributes on body",
        attributes: [],
      };

      if (!title) errorMessage.attributes.push("title");
      if (!description) errorMessage.attributes.push("description");

      if (errorMessage.attributes.length > 0)
        return res.writeHead(400).end(JSON.stringify(errorMessage));

      const datetime_now = new Date().toISOString();

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: datetime_now,
        updated_at: datetime_now,
      };

      const insertResult = database.insert("tasks", task);
      return res.writeHead(201).end(JSON.stringify(insertResult));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      const task = {};

      if (!title && !description)
        return res.writeHead(400).end(
          JSON.stringify({
            error:
              "It is necessary to have at least a 'title' or 'description' to update",
          })
        );

      if (title) task["title"] = title;
      if (description) task["description"] = description;

      task["updated_at"] = new Date().toISOString();

      const updateResult = database.update("tasks", id, task);

      if (updateResult?.error)
        return res.writeHead(404).end(JSON.stringify(updateResult));
      return res.writeHead(200).end(JSON.stringify(updateResult));
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const status = req.status;

      if (status) {
        const datetime_now = new Date().toISOString();

        const data = {
          completed_at: datetime_now,
        };

        const concludeResult = database.conclude("tasks", id, data);

        if (concludeResult?.error)
          return res.writeHead(404).end(JSON.stringify(concludeResult));
        return res.writeHead(200).end(JSON.stringify(concludeResult));
      } else {
        return res.writeHead(400).end(
          JSON.stringify({
            error: "Use '/complete' to mark the task as done",
          })
        );
      }
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const deleteResult = database.delete("tasks", id);

      if (deleteResult?.error)
        return res.writeHead(404).end(JSON.stringify(deleteResult));
      return res.writeHead(200).end(JSON.stringify(deleteResult));
    },
  },
];
