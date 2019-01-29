/*
 * action 类型
 */

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * 其它的常量
 */

export const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action 创建函数
 */

/*
* action生成器，生成一个添加TODO，再传一个text
* action生成器，切换TODO状态，index是TODO编号
* action生成器，切换筛选状态，filter是筛选器名
* */
export function addTodo(text) {
	return { type: ADD_TODO, text }
}

export function toggleTodo(index) {
	return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
	return { type: SET_VISIBILITY_FILTER, filter }
}