import recommendations from '../config/search_recommendations';

import React, { Component } from 'react';
import { AutoComplete, Input, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Search=Input.Search;
const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.onSearch = this.onSearch.bind(this);
	}


	onSearch(keyword) {
		console.log(`search - ${keyword}`);
		keyword = keyword.trim();
		if (keyword !== '' &&
			keyword !== this.props.searchParameters.keyword) {
			this.props.updateSearchKeyword(keyword);
			this.props.history.push(`/search?keyword=${window.encodeURIComponent(keyword)}&type=${this.props.searchParameters.type}`);//暂时使用铜钟的url进行搜索 TODO
		}
	}


	render(){
		const { keyword } = this.props.searchParameters;
		const { searchHistory } = this.props;
		const options=[
			<OptGroup key="recommendations" label={<span>搜索推荐</span>}>
				{recommendations.map(
					item => (
						<Option key={item} value={item}>{item}</Option>
					)
				)
				}
			</OptGroup>,
			<OptGroup key="history" label={
				<span>搜索历史
					<Button icon="delete" onClick={() => this.props.clearSearchHistory()} style={{ float: 'right' }}/>
                </span>
			}>
				{searchHistory.map(
					item => (
						<Option key={item} value={`${item} `}>{item}</Option>
					)
				)
				}
			</OptGroup>
		];

		return (
			<AutoComplete
				dropdownMatchSelectWidth={false}
				size="large"
				style={{ width: '100%' }}
				dataSource={options}
				onSelect={this.onSearch} //onSelect 被选中时调用，参数为选中的value值..
				defaultActiveFirstOption={false}
			>
				<Search
					placeholder="歌曲/专辑/艺人"
					defaultValue={ keyword || '' }
					onSearch={this.onSearch}
					enterButton
					size="large"
				/>
			</AutoComplete>
		);
	}
}

SearchBar.propTypes = {
	searchParameters: PropTypes.object.isRequired
};


function mapStateToProps(state) {
	return {
		searchParameters: state.searchParameters,
		searchHistory: state.searchHistory,
	};
}

//clearSearchHistory 清空搜索历史，绑定在搜索历史下拉框的一个小Button上。
function mapDispatchToProps(dispatch) {
	return {
		updateSearchKeyword: (keyword) => {
			dispatch({ type: 'UPDATE_SEARCH_KEYWORD', data: keyword });
		},
		clearSearchHistory: () => {
			dispatch({ type: 'CLEAR_SEARCH_HISTORY' });
		},
	};
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SearchBar));