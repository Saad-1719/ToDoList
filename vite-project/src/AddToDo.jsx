import React, { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

export const ToDoContext = createContext();

function reducer(state, action) {
	switch (action.type) {
		case "AddToDo":
			return {
				...state,
				todos: [...state.todos, { id: uuidv4(), text: action.payload }],
				inputValue: "",
			};

		case "RemoveToDo":
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.payload),
			};

		case "EditToDo":
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload.id
						? { ...todo, text: action.payload.text }
						: todo
				),
				editingId: null,
				editingValue: "",
			};

		case "SetInputValue":
			return {
				...state,
				inputValue: action.payload,
			};

		case "SetEditingValue":
			return {
				...state,
				editingValue: action.payload,
			};

		case "SetEditingId":
			return {
				...state,
				editingId: action.payload,
			};

		default:
			return state;
	}
}

function AddToDo({ children }) 
{
	const initialState = {
		todos: [],
		inputValue: "",
		editingId: null,
		editingValue: "",
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<ToDoContext.Provider value={{ state, dispatch }}>
			{children}
		</ToDoContext.Provider>
	);
}

export default AddToDo;
