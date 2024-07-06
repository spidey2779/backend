import express from "express";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../middleware/todo.js";
import { authenticationMiddleware } from "../utils/authentication.js";

const router = express.Router();
router.use(authenticationMiddleware);
router.route("/todos").get(getTodo).post(createTodo).put(updateTodo)
router.route("/todos/:id").delete(deleteTodo);
export default router;
