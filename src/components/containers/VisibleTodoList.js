import { connect } from 'react-redux';
import { toggleTodo } from '../../redux/actions';
import TodoList from '../TodoList';



const getVisibleTodos = (todos, filter) => {
	switch (filter) {
		case 'SHOW_ALL':
			return todos;
		case 'SHOW_COMPLETED':
			return todos.filter(t => t.completed);
		case 'SHOW_ACTIVE':
			return todos.filter(t => !t.completed);
		default:
			return todos;
	}
};
/*
* 使用 connect() 前，需要先定义 mapStateToProps 这个函数来指定如何把当前 Redux store state 映射到展示组件的 props 中。
* 例如，VisibleTodoList 需要计算传到 TodoList 中的 todos,
* 所以定义了根据 state.visibilityFilter 来过滤 state.todos 的方法，并在 mapStateToProps 中使用。
*
*
* mapStateToProps（state, ownProps）
mapStateToProps是一个函数，用于建立组件跟 store 的 state 的映射关系
作为一个函数，它可以传入两个参数，结果一定要返回一个 object
传入mapStateToProps之后，会订阅store的状态改变，在每次 store 的 state 发生变化的时候，都会被调用。//意思可能是，不再需要subscribe订阅了，这样connect就可以实时更新了
ownProps代表组件本身的props，如果写了第二个参数ownProps，那么当prop发生变化的时候，mapStateToProps也会被调用。
例如，当 props接收到来自父组件一个小小的改动，那么你所使用的 ownProps 参数，mapStateToProps 都会被重新计算）。
mapStateToProps可以不传，如果不传，组件不会监听store的变化，也就是说Store的更新不会引起UI的更新

* VisibleTodoList 这个组件，只是在TodoList外面包一层connect~
* getVisibleTodos（上面这个方法）的作用：传入todos，传入filter(文本)，解读这个filter文本，返回todos或todos.filter(xxx)
*
* 下面mapStateToProps，用于读取state中的值,然后返回todos(是传给TodoList组件的prop),
*
* */
const mapStateToProps = state => {
	return {
		todos: getVisibleTodos(state.todos, state.visibilityFilter)
	}
};
/*
* toggleTodo是一个方法,用于改变state中的值
* 也就是需要把改变State中的值的方法用一个口子,开放出来,传给子组件(TodoList每一个todo都有一个按钮可以点击,切换todo)
* mapDispatchToProps做到了这一点.connect传入这个mapDispatchToProps以后,下级TodoList组件可以直接在prop中获取toggleTodo方法,让它的onClick=toggleTodo了。
* */

const mapDispatchToProps = dispatch => {
	return {
		onTodoClick: id => {
			dispatch(toggleTodo(id))
		}
	}
};

const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList);

export default VisibleTodoList;