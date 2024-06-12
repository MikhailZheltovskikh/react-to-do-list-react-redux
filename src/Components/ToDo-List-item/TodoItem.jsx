import React, { useState } from 'react';
import styles from './ToDo-List-item.module.css';


const TodoItem = ({ id, completed, title, updatePost, deletePost, updateStatus }) => {
	const [isEdit, setIsEdit] = useState(false);

	const [value, setValue] = useState(title);

	const handleEdit = () => {
		setIsEdit((prevState) => !prevState);
	};

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const onSubmit = async () => {
		await updatePost(id, value);
		handleEdit();
	};

	const hendelDelete = () => {
		deletePost(id);
	};

	return (
		<li className={styles.toDoList__item}>
			{isEdit ? (
				<div className={styles.toDoList__item__btn__edit}>
					<input value={value} onChange={handleChange} />
					<button
						className={styles.toDoList__item__btn__edit__submit}
						onClick={onSubmit}
					>
						✔
					</button>
				</div>
			) : (
				<div className={styles.toDoList__item__box}>
					<input
						className={styles.toDoList__item__input}
						type="checkbox"
						name="checkboxInput"
						checked={completed}
						onChange={(e) => updateStatus(id, e.target.checked)}
					/>
					<div className={styles.toDoList__item__text}>{title}</div>
					<button
						onClick={hendelDelete}
						className={styles.toDoList__item__delete__btn}
					>
						X
					</button>
				</div>
			)}
			<button onClick={handleEdit} className={styles.toDoList__item__edit__btn}>
				✏️
			</button>
		</li>
	);
};

export default TodoItem;


// TodoItem.propTypes ={
// 	deletePost: PropTypes.func,
// }