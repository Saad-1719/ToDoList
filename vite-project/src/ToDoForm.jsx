import React, { useEffect, useState } from "react";
import {
	addTodo,
	deleteTodo,
	getAllTodos,
	updateTodo,
} from "./lib/todo.controller";

function ToDoForm() {
	const [allTodos, setAllTodos] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [updateNote, setUpdatednote] = useState("");
	const [editingNoteId, setEditingNoteId] = useState(null);

	const handleAdd = async () => {
		await addTodo(inputValue);
		await loadAllTodos();
		setInputValue("");
	};

	const handleRemove = async (id) => {
		await deleteTodo(id);
		await loadAllTodos();
	};

	async function loadAllTodos() {
		const todos = await getAllTodos();
		if (todos) {
			setAllTodos(todos);
		}
	}
	async function handleEdit(id, body) {
		setEditingNoteId(id);
		setUpdatednote(body);
	}

	const handleUpdate = async (id) => {
		await updateTodo(id, updateNote);
		await loadAllTodos();
		setEditingNoteId(null);
		setUpdatednote("");
	};

	useEffect(() => {
		loadAllTodos();
	}, []);

	return (
		<div className="todo-container">
			<h1>To-Do Guru</h1>
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder="Enter your todo"
				className="todo-input"
			/>
			<button onClick={handleAdd} className="todo-button">
				Submit
			</button>

			<h2 className="todo-title">Notes</h2>

			<ul className="todo-list">
				{allTodos.map((todo) => (
					<li key={todo.note_id} className="todo-item">
						{editingNoteId === todo.note_id ? (
							<div>
								<input
									type="text"
									value={updateNote}
									onChange={(e) => setUpdatednote(e.target.value)}
									className="todo-edit-input"
								/>
								<button
									onClick={() => handleUpdate(todo.note_id)}
									className="todo-save-button"
								>
									Save
								</button>
							</div>
						) : (
							<>
								<span className="text">{todo.notes}</span>
								<span className="note-btn">
									<button
										onClick={() => handleEdit(todo.note_id, todo.notes)}
										className="todo-edit-button"
									>
										Edit
									</button>
									<button
										onClick={() => handleRemove(todo.note_id)}
										className="todo-remove-button"
									>
										Remove
									</button>
								</span>
							</>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default ToDoForm;
