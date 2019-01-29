import React, { Component } from 'react';
import { Row, Col } from 'antd';
// import { Link } from 'react-router-dom';

// import SearchBar from '../SearchBar/withDropdown';
import logo from '../assets/logo.png';
// import { themeColor } from '../../../../config';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signingOut: false
		};
	}

	render() {
		return (
			<div style={{ padding: '10px 0', borderBottom: '1px solid #DBDBDB', }}>
				<Row type="flex" align="middle" className="container" >
					<Col xs={24} sm={7}>
						<div className="nowrap" style={styles.header}>
							<a href="/">
								<img src={logo} alt="铜钟shiwen音乐" />
							</a>
						</div>
					</Col>
					<Col xs={24} sm={8} >
						<div className="nowrap" style={styles.header}>fanfou</div>
						{/*<SearchBar />*/}
					</Col>
				</Row>
			</div>
		);
	}
}

const styles = {
	header: {
		// color: themeColor,
		fontWeight: 200,
	},
};

export default Header;
