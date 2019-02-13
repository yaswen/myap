import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {Input ,Icon} from 'antd';
// import 'antd/lib/col/style';
// import 'antd/lib/row/style';
// import 'antd/lib/grid/style';
//import 'antd/lib/grid/style/index.css';//引入grid的样式，按理说好像应该配置自动按需引入 TODO

// import { Link } from 'react-router-dom';

// import SearchBar from '../SearchBar/withDropdown';
import SearchBar from './SearchBar';
import logo from '../assets/yinyue.png';
// import { themeColor } from '../../../../config';
// ReactDOM.render(<App />, document.getElementById('root'));

const Search = Input.Search;

class MyHeader extends Component{
	constructor(props) {
		super(props);
		this.state = {
			signingOut: false
		};
	}
	render(){
		return(
			<div style={{ padding: '10px 0', borderBottom: '1px solid #DBDBDB', }}>
				<Row type="flex" align="middle" className="container" >
					<Col xs={24} sm={7}>
						<div style={styles.header}>
							<a href="/">
								<img src={logo} alt="综合音乐" />
							</a>
						</div>
					</Col>
					<Col xs={24} sm={8} >

						<SearchBar />
					</Col>
				</Row>
			</div>
		)
	}
}

const styles = {
	header: {
		// color: themeColor,
		fontWeight: 200,
	},
}

export default MyHeader;
