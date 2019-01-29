import React from 'react';
import TodoFooter from '../TodoFooter';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const Myap = () => (
	<div style={styles.myap}>
		<p style={styles.title}>我的待办</p>
		<AddTodo/>

		<VisibleTodoList/>
		<TodoFooter/>
	</div>
);
const styles = {
	myap: {
		margin:"auto auto",
		marginTop:36,
		padding:10,
		textAlign:"center"
	},
	title:{
		padding:10,
		fontSize:36
	}
};
export default Myap;
