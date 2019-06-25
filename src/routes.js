const express = require("express");
const routes = new express.Router();

var projects = [];

const checkDataMiddleware = (req, res, next) => {
  const id = req.params.id;

  projects.some(project => {
    if (project.id == id) {
      return next();
    } else {
      return res.status(400).json({ error: "id not found" });
    }
  });
};

routes.get("/projects", (req, res) => {
  return res.status(200).json({ projects });
});

routes.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const data = {
    id,
    title,
    tasks: []
  };

  projects.push(data);
  return res.status(204).json({});
});

routes.put("/projects/:id", checkDataMiddleware, (req, res) => {
  const id = req.params.id;
  const title = req.body.title;

  projects.map(project => {
    if (project.id == id) {
      project.title = title;
    }
  });

  return res.status(204).json({});
});

routes.delete("/projects/:id", checkDataMiddleware, (req, res) => {
  const id = req.params.id;

  projects = projects.filter(project => {
    return project.id != id;
  });

  return res.status(204).json({});
});

routes.post("/projects/:id/tasks", checkDataMiddleware, (req, res) => {
  const id = req.params.id;
  const title = req.body.title;

  projects.map(project => {
    if (project.id == id) {
      project.tasks.push({ title });
    }
  });

  return res.status(204).json({});
});

module.exports = routes;
