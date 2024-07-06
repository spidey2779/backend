import Todo from "../models/todomodel.js";

export const getTodo = async (req, res) => {
  const user = req.user;
  try {
    const todos = await Todo.find({ userId: user._id });
    const newTodos = todos.map((todo) => ({
      text: todo.text,
      id: todo._id,
      isCompleted: todo.isCompleted,
    }));
    res.status(200).json(newTodos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createTodo = async (req, res) => {
  const { text } = req.body;
  const userId = req.user._id;
  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }
  try {
    const newTodo = new Todo({
      text,
      userId,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json({
      id: savedTodo._id,
      isCompleted: savedTodo.isCompleted,
      text: savedTodo.text,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTodo = async (req, res) => {
  const { id, text, isCompleted } = req.body;
  const userId = req.user._id;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId },
      { text, isCompleted },
      { new: true } //return updated document
    );
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res
      .status(200)
      .json({ text: todo.text, isCompleted: todo.isCompleted, id: todo._id });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteTodo = async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  try {
    const deleteTodo = await Todo.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!deleteTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
