import styles from './Search.module.css';
import PropTypes from 'prop-types';

export const Serach = ({ searchTodo }) => {
	return (
		<>
			<h4>Поиск</h4>
			<div className={styles.search__wrapper}>
				<label>
					<input
						className={styles.search}
						type="text"
						placeholder="Введите текст для поиска"
						onChange={(e) => searchTodo(e.target.value)}
					/>
				</label>
			</div>
		</>
	);
};

Serach.propTypes = {
	search: PropTypes.func,
};
