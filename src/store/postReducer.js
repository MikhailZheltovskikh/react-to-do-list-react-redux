const initialState = {
	todos: [],
	isLoading: false,
};

const postReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'LOAD_TODO': {
			return {
				...state,
				isLoading: false,
				todos: state.todos.concat(payload),
			};
		}
		case 'LOAD_TODO_REQUESTED': {
			return {
				...state,
				isLoading: true,
			};
		}
		case 'TODO_REQUESTED_FAILED': {
			return {
				...state,
				todos: [],
				isLoading: false,
				error: payload,
			};
		}

		case 'DELETE_POST': {
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== payload),
				isLoading: false,
			};
		}
		case 'UPDATE_POST': {
			const updateIndexPost = state.todos.findIndex(
				(todo) => todo.id === payload.id,
			);
			const copyTodo = state.todos.slice();
			copyTodo[updateIndexPost] = {
				...copyTodo[updateIndexPost],
				title: payload.title,
			};
			return {
				...state,
				todos: copyTodo,
				isLoading: false,
			};
		}

		case 'UPDATE_STATUS_POST': {
			const updateIndexPost = state.todos.findIndex(
				(todo) => todo.id === payload.id,
			);
			const copyTodo = state.todos.slice();
			copyTodo[updateIndexPost] = {
				...copyTodo[updateIndexPost],
				completed: payload.completed,
			};
			return {
				...state,
				todos: copyTodo,
				isLoading: false,
			};
		}
		case 'CREATE_TODO_POST': {
			return {
				...state,
				todos: state.todos.concat(payload),
				isLoading: false,
			};
		}

		case 'SORT_TODO':
			return {
				...state,
				todos: payload,
			};

		default:
			return state;
	}
};

export const loadTodo = (arg) => async (dispatch, getState) => {
	dispatch({ type: 'LOAD_TODO_REQUESTED' });
	try {
		const response = await fetch('http://localhost:3005/todo');
		const data = await response.json();
		dispatch({ type: 'LOAD_TODO', payload: data });
	} catch (e) {
		dispatch({ type: 'TODO_REQUESTED_FAILED', payload: e.message });
	}
};

export const deleteTodo = (id) => async (dispatch, getState) => {
	dispatch({ type: 'LOAD_TODO_REQUESTED' });
	try {
		await fetch(`http://localhost:3005/todo/${id}`, {
			method: 'DELETE',
		});
		dispatch({ type: 'DELETE_POST', payload: id });
	} catch (e) {
		dispatch({ type: 'TODO_REQUESTED_FAILED', payload: e.message });
	}
};

export const updateTodo = (id, value) => async (dispatch, getState) => {
	dispatch({ type: 'LOAD_TODO_REQUESTED' });
	try {
		const response = await fetch(`http://localhost:3005/todo/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify({ title: value }),
		});
		const updatePost = await response.json();
		dispatch({ type: 'UPDATE_POST', payload: updatePost });
	} catch (e) {
		dispatch({ type: 'TODO_REQUESTED_FAILED', payload: e.message });
	}
};

export const updateStatusTodo = (id, checked) => async (dispatch, getState) => {
	dispatch({ type: 'LOAD_TODO_REQUESTED' });
	try {
		const response = await fetch(`http://localhost:3005/todo/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				completed: checked,
			}),
		});
		const updatePost = await response.json();
		dispatch({ type: 'UPDATE_STATUS_POST', payload: updatePost });
	} catch (e) {
		dispatch({ type: 'TODO_REQUESTED_FAILED', payload: e.message });
	}
};

export const creatingTodo = (event) => async (dispatch, getState) => {
	dispatch({ type: 'LOAD_TODO_REQUESTED' });
	const form = event.target;
	const todoTitle = form.elements.textToDo.value;
	try {
		const response = await fetch(`http://localhost:3005/todo/`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify({
				title: todoTitle,
				completed: false,
			}),
		});
		const data = await response.json();
		dispatch({ type: 'CREATE_TODO_POST', payload: data });
		form.reset();
	} catch (e) {
		dispatch({ type: 'TODO_REQUESTED_FAILED', payload: e.message });
	}
};

export const sortTodo = () => {
	return (dispatch, getState) => {
		const { todos } = getState().todo;

		const sortedTodos = [...todos].sort((a, b) => {
			if (a.title < b.title) {
				return -1;
			}
			if (a.title > b.title) {
				return 1;
			}
			return 0;
		});

		dispatch({ type: 'SORT_TODO', payload: sortedTodos });
	};
};

export default postReducer;
