import React, { Component } from 'react';
import { Row, Col } from 'antd';
// import 'antd/lib/col/style';
// import 'antd/lib/row/style';
// import 'antd/lib/grid/style';
//import 'antd/lib/grid/style/index.css';//引入grid的样式，按理说好像应该配置自动按需引入 TODO

import SongItem from './SongItem';
// import { Link } from 'react-router-dom';

// import SearchBar from '../SearchBar/withDropdown';

//import MyItem from './MyItem';
// import { themeColor } from '../../../../config';
// ReactDOM.render(<App />, document.getElementById('root'));

class MyList extends Component{
	constructor(props) {
		super(props);
		this.state = {
			// signingOut: false
		};
	}
	render(){
		let { songs } = this.props;
		return(
			<div className={"list"} style={styles.list}>
				<ul style={styles.ul}>
					{
						songs.map((song, index) => (
							<SongItem song={song} key={song.link} index={index} showPlatform={this.props.showPlatform}
							          isLiked={this.props.allIsLiked} />
						))
					}
				</ul>

			</div>
		)
	}
}

const styles = {
	list: {
		// color: themeColor,
		fontWeight: 200,
	},
	ul:{
		listStyle: 'none',
		padding: '0 15px',
		// marginTop: 10
	}
};

export default MyList;
