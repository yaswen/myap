import React, {Component} from 'react';
import {Row, Col} from 'antd';
// import 'antd/lib/col/style';
// import 'antd/lib/row/style';
// import 'antd/lib/grid/style';
//import 'antd/lib/grid/style/index.css';//引入grid的样式，按理说好像应该配置自动按需引入 TODO

// import { Link } from 'react-router-dom';

// import SearchBar from '../SearchBar/withDropdown';

// import { themeColor } from '../../../../config';
// ReactDOM.render(<App />, document.getElementById('root'));

class MyItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signingOut: false
		};
	}

	render() {
		return (
			<ol className={"item"} style={styles.item}>
				<Row type="flex" align="middle" className="container">
					<Col xs={8} sm={6}>
						饭否
					</Col>
					<Col xs={8} sm={12}>
						<a href={'http://fanfou.com/home'}>http://fanfou.com/home</a>
						{/*<SearchBar />*/}
					</Col>
					<Col xs={8} sm={6}>
						评分：☆☆☆☆☆
					</Col>
				</Row>
			</ol>
		)
	}
}

const styles = {
	item: {
		// color: themeColor,
		fontWeight: 200,
		margin:12
	},
}

export default MyItem;
