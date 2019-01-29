import React from 'react';
import FilterLink from './containers/FilterLink';
import { VisibilityFilters } from '../redux/actions';

const Footer = () => (
	<div>
		<span>筛选：</span>
		<FilterLink filter={VisibilityFilters.SHOW_ALL}>全部</FilterLink>
		<FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>未完成</FilterLink>
		<FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>已完成</FilterLink>
	</div>
);

export default Footer;