import TodoItem from './TodoItem';

export const ToDoListItem = ({ todos, search }) => {
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
					<TodoItem {...todo} key={todo.id} />
				))}
		</>
	);
};
