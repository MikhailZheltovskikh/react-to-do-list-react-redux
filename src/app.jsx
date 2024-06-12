import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Form, ToDoListItem, Loader, Serach } from './Components';
import { useDispatch, useSelector } from 'react-redux';
import { loadTodo, creatingTodo, sortTodo } from './store/postReducer';

export const App = () => {
	const [search, setSearch] = useState();
	const [isSorted, setIsSorted] = useState(false);
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.todo.todos);
	const isLoading = useSelector((state) => state.todo.isLoading);

	const creating = (event) => {
		dispatch(creatingTodo(event));
	};

	const searchTodo = (event) => {
		setSearch(event);
	};

	const hendelSortTodo = () => {
		dispatch(sortTodo());
		setIsSorted(true);
	};

	useEffect(() => {
		dispatch(loadTodo());
	}, []);

	return (
		<div className={styles.app}>
			<h1>To-Do</h1>
			<Serach searchTodo={searchTodo} />
			<Form onSubmit={creating} />

			<button className={styles.sort__btn} onClick={hendelSortTodo}>
				Сортировка ⇩
			</button>

			<ul className={styles.toDoList}>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<ToDoListItem todos={posts} search={search} />
					</>
				)}
			</ul>
		</div>
	);
};
