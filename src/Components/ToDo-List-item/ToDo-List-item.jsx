import TodoItem from './TodoItem';

export const ToDoListItem = ({
	todos,
	updateTodo,
	deleteTodo,
	updateStatusTodo,
	search,
}) => {

	if (!search) {
		search = '';
	}

	return (
		<>
			{todos
				.filter((item) => {
					return search.toLowerCase() === ''
						? item
						: item.title.toLowerCase().includes(search);
				})
				.map((todo) => (
					<TodoItem
						{...todo}
						key={todo.id}
						updateTodo={updateTodo}
						deleteTodo={deleteTodo}
						updateStatusTodo={updateStatusTodo}
					/>
				))}
		</>
	);
};
