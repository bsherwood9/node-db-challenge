const express = require("express");
const db = require("../data/db-config.js");
const Helper = require("../helpers/projects-model");
const router = express.Router();

//projects add and get
router.get("/projects", (req, res) => {
  db("projects")
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "That project could not be found" });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "There was an error while getting projects", err })
    );
});

router.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  db("projects")
    .where({ id })
    .first()
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(500).json({
        message: "There was an error while getting that specific project",
        err
      })
    );
});

router.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  db("projects")
    .where({ id })
    .del()
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(500).json({
        message: "There was an error while deleting that project",
        err
      })
    );
});

router.put("/projects/:id", (req, res) => {
  const edits = req.body;
  const { id } = req.params;
  db("projects")
    .where({ id })
    .update(edits)
    .then(data => res.status(200).json(data))
    .catch(err =>
      res
        .status(500)
        .json({ message: "There was an error while adding a project", err })
    );
});
router.post("/projects", (req, res) => {
  const newProj = req.body;
  Helper.addProject(newProj)
    .then(data => res.status(200).json(data))
    .catch(err =>
      res
        .status(500)
        .json({ message: "There was an error while adding a project", err })
    );
});

//resources get and add
router.get("/resources", (req, res) => {
  db("resources")
    .then(data => res.status(200).json(data))
    .catch(err =>
      res
        .status(500)
        .json({ message: "There was an error while getting projects", err })
    );
});
router.post("/resources", (req, res) => {
  const newRec = req.body;
  Helper.addResource(newRec)
    .then(data => res.status(200).json(data))
    .catch(err =>
      res
        .status(500)
        .json({ message: "There was an error while adding this resource", err })
    );
});

router.delete("/resources/:id", (req, res) => {
  const { id } = req.params;
  db("resources")
    .where({ id })
    .del()
    .then(data =>
      res.status(200).json({ message: `You deleted ${data} resource` })
    )
    .catch(err =>
      res.status(500).json({
        message: "There was an error while deleting that resources",
        err
      })
    );
});

router.put("/resources/:id", (req, res) => {
  const edits = req.body;
  const { id } = req.params;
  db("resources")
    .where({ id })
    .update(edits)
    .then(data =>
      res
        .status(200)
        .json({ message: ` Thanks for editing your resource ${data}` })
    )
    .catch(err =>
      res.status(500).json({
        message: "There was an error while editing your resource",
        err
      })
    );
});

//tasks
router.get("/tasks", (req, res) => {
  Helper.findAllTasks()
    .then(data => res.status(200).json(data))
    .catch(err =>
      res
        .status(500)
        .json({ message: "There was an error while getting projects", err })
    );
});

router.get("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  Helper.findTasksById(id)
    .then(data => res.status(200).json(data))
    .catch(err =>
      res
        .status(500)
        .json({ message: "There was an error while getting projects", err })
    );
});

router.post("/projects/:id/tasks", (req, res) => {
  const newTask = req.body;
  const { id } = req.params;
  db("projects")
    .where({ id })
    .first()
    .then(data => {
      if (data) {
        Helper.addTask(newTask, id).then(data => {
          res.status(200).json(data);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find porject with given id" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not add task to project with that id", err });
    });
});

router.put("/projects/:id/tasks/:taskid", (req, res) => {
  const { taskid } = req.params;
  const edits = req.body;
  const { id } = req.params;
  db("projects")
    .where({ id })
    .first()
    .then(data => {
      if (data) {
        db("tasks")
          .where({ id: taskid })
          .update(edits)
          .then(data => {
            res.status(200).json(data);
          });
      } else {
        res.status(404).json({ message: "Could not find task with given id" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not edit task to project with that id", err });
    });
});

router.delete("/projects/:id/tasks/:taskid", (req, res) => {
  const { taskid } = req.params;
  const edits = req.body;
  const { id } = req.params;
  db("projects")
    .where({ id })
    .first()
    .then(data => {
      if (data) {
        db("tasks")
          .where({ id: taskid })
          .del()
          .then(data => {
            res.status(200).json(data);
          });
      } else {
        res
          .status(404)
          .json({ message: "Could not find task with given id or delete it" });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not delete task to project with that id",
        err
      });
    });
});

//contexts and tasks

router.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  Helper.findTasksByIdContext(id)
    .then(data => res.status(200).json(data))
    .catch(err =>
      res
        .status(500)
        .json({ message: "There was an error while getting projects", err })
    );
});

module.exports = router;
