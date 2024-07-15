import React, { useContext } from "react";
import { ToDoContext } from "./AddToDo";

function ToDoForm() {
  const { state, dispatch } = useContext(ToDoContext);

  const handleInputChange = (e) => {
    dispatch({ type: "SetInputValue", payload: e.target.value });
  };

  const handleEditingChange = (e) => {
    dispatch({ type: "SetEditingValue", payload: e.target.value });
  };

  const handleAdd = () => {
    if (state.inputValue.trim() !== "") {
      dispatch({ type: "AddToDo", payload: state.inputValue });
    }
  };

  const handleRemove = (id) => {
    dispatch({ type: "RemoveToDo", payload: id });
  };

  const handleEdit = (id) => {
    dispatch({ type: "SetEditingId", payload: id });
    const todo = state.todos.find((todo) => todo.id === id);
    dispatch({ type: "SetEditingValue", payload: todo.text });
  };

  const handleEditSubmit = (id) => {
    dispatch({ type: "EditToDo", payload: { id, text: state.editingValue } });
  };

  return (
      <div className="todo-container">
          <h1>To-Do Guru</h1>
      <input
        type="text"
        value={state.inputValue}
        onChange={handleInputChange}
        placeholder="Enter your todo"
        className="todo-input"
      />
      <button onClick={handleAdd} className="todo-button">Submit</button>

      <h2 className="todo-title">Notes</h2>
      <ul className="todo-list">
        {state.todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {state.editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={state.editingValue}
                  onChange={handleEditingChange}
                  className="todo-edit-input"
                />
                <button onClick={() => handleEditSubmit(todo.id)} className="todo-save-button">Save</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => handleEdit(todo.id)} className="todo-edit-button">Edit</button>
                <button onClick={() => handleRemove(todo.id)} className="todo-remove-button">Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoForm;
