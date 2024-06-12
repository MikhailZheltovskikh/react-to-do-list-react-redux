import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Form, ToDoListItem, Loader, Serach } from './Components';
import { useDispatch, useSelector } from 'react-redux';
import {
	loadTodo,
	deleteTodo,
	updateTodo,
	updateStatusTodo,
	creatingTodo,
	sortTodo,
} from './store/postReducer';

export const App = () => {
	const [search, setSearch] = useState();
	const [isSorted, setIsSorted] = useState(false);
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.todo.todos);
	const isLoading = useSelector((state) => state.todo.isLoading);

	const deletePost = (id) => {
		dispatch(deleteTodo(id));
	};

	const updatePost = (id, value) => {
		dispatch(updateTodo(id, value));
	};

	const updateStatus = (id, checked) => {
		dispatch(updateStatusTodo(id, checked));
	};

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
						<ToDoListItem
							todos={posts}
							updatePost={updatePost}
							deletePost={deletePost}
							updateStatus={updateStatus}
							search={search}
						/>
					</>
				)}
			</ul>
		</div>
	);
};
