import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ todos, onTodoClick }) => (
	<ul>
		{/*{!todos?"todos":"todoskong"}*/}
		{/*{todos.toLocaleString()}*/}
		{/*{!todos[0]?"lalala":"todo0id"+todos[0].id}*/}
		{todos.map(todo => (
			<Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
		))}
	</ul>
);
//todos的格式:[{id:1,completed:true,text:"222"},{id:2,completed:true,text:"111"}...]
//toggleTodo是一个函数,
//这两个是这个组件的prop,其中toggleTodo进一步传到下面Todo组件的prop中;todos则使用map函数进行拆分渲染.


TodoList.propTypes = {
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			completed: PropTypes.bool.isRequired,
			text: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	onTodoClick: PropTypes.func.isRequired
};
//isRequired意思是，这个prop是必须的。

export default TodoList;