import React, {Component} from 'react';
import axios from 'axios';
// import logo from '../../assets/logo.png';
import './App.css';
// import { Row, Col } from 'antd';
//import 'antd/lib/grid/style/index.css';//引入antd的grid样式，未配置按需引入
import {Button} from 'antd';
//不引入button的样式，以尝试配置按需引入
//import Header from '../Header.jsx';
import {Icon, LocaleProvider, Layout} from 'antd';
import MyHeader from '../MyHeader.jsx';
//import MVIcon from '../MVIcon';
import MyFooter from '../Footer';
//import Test from '../Test';
//import Text from '../Text';
import MyList from '../SongList';
//import data from '../songs';
import MusicPlayer from '../MusicPlayer';

const {Header, Footer, Content} = Layout;


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			data: null,
		};
	}

	componentDidMount() {
		const _this = this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
		const url = "http://tongzhong.xyz/api/daily_recommendations";//暂时使用tongzhong的url
		//使用了新技术“axios”实现ajax，获取今天的每日推荐歌曲的数据。
		axios.get(url)
			.then(function (response) {
				_this.setState({
					data: response.data,
					isLoaded: true
				});
			})
			.catch(function (error) {
				console.log(error);
				_this.setState({
					isLoaded: false,
					error: error
				})
			})
	}


	render() {
		if (!this.state.isLoaded) {
			return (<div>Loading</div>);
		} else {
			let songs = this.state.data.songs;
			return (
				<div>
					<Layout theme={"light"}>
						<Header style={{position: 'fixed', width: '100%', zIndex: 1040}}>
							<MyHeader/>
						</Header>

						<Content>
							<div className="container"
							     style={{
								     marginTop: 80, borderBottom: '1px solid #DBDBDB'
							     }}
							>

								<MyList songs={songs}/>

							</div>
						</Content>

						<Footer>
							<MyFooter/>
						</Footer>
						<MusicPlayer />
					</Layout>
					{/*<Header  style={{ position: 'fixed', width: '100%', zIndex: 1040 }}/>*/}
					{/*<MyHeader  style={{ position: 'fixed', width: '100%', zIndex: 1040 }}/>*/}
					{/*<MyList />*/}
					{/*<div className="txt">*/}

					{/*<Text/>*/}
					{/*<Button type="primary">Primary</Button>*/}
					{/*<Button>Default</Button>*/}
					{/*<Button type="dashed">Dashed</Button>*/}
					{/*<Button type="danger">Danger</Button>*/}
					{/*残酷月光 <MVIcon link={"http://www.baidu.com"}/>*/}
					{/*</div>*/}
					{/*<Test/>*/}
					{/*<Footer  style={{ marginBottom: 70 }}/>*/}
				</div>
				// <div style={{ padding: '10px 0', borderBottom: '1px solid #DBDBDB', }}>
				//    <Row type="flex" align="middle" className="container" >
				//     <Col xs={24} sm={7}>
				// 	    <div className="nowrap" style={styles.header}>
				// 		    <a href="/">
				// 			    <img src={logo} alt="铜钟shiwen音乐" />
				// 		    </a>
				// 	    </div>
				//     </Col>
				//     <Col xs={24} sm={8} >
				// 	    <div className="nowrap" style={styles.header}>fanfou</div>
				// 	    {/*<SearchBar />*/}
				//     </Col>
				//     <Col xs={12} sm={4}>
				// 	    <Button type="primary">Button</Button>
				//     </Col>
				//    </Row>
				// </div>
			);
		}
	}
}

const styles = {
	header: {
		// color: themeColor,
		fontWeight: 200,
	},
};
export default App;
