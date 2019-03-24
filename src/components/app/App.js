import React, {Component} from 'react';
import {connect} from 'react-redux';
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
import Result from '../Result';
//import Test from '../Test';
//import Text from '../Text';
import SongList from '../SongList';
//import data from '../songs';
import MusicPlayer from '../MusicPlayer';
import SearchTypeMenu from '../SearchTypeMenu';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import themeColor from '../../config';
import urls from '../../config/urls';
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
		const _this = this; //先存一下this,以防使用箭头函数this会指向我们不希望它所指向的对象。
		const url = urls.dailyUrl;
		// console.log(`urls = ${urls.dailyUrlTong}`);
		// console.log(`axios - urlTong - ${url}`);
		//使用了新技术“axios”进行ajax,获取今天的每日推荐歌曲的数据
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
			});

	}


	render() {
		let { searchStatus, searchResults, searchParameters } = this.props;
		let songs=[];
		if (this.state.isLoaded) {
			 songs = this.state.data.songs;
		}
		//console.log('songs - : '+songs.toString());

			return (
				<div>
					<BrowserRouter>
					<Layout theme={"light"}>
						<Header style={{position: 'fixed', width: '100%', zIndex: 1040}}>
							<MyHeader/>
						</Header>
						<Content>
							{this.state.isLoaded &&
							<div className="container"
							     style={{
								     marginTop: 80, borderBottom: '1px solid #DBDBDB'
							     }}
							>
								<Switch>
									<Route exact path="/" render={() => (
										<SongList songs={songs}/>
									)} />
									<Route path="/search" render={() => (
										<div>
											{
												searchStatus !== 'not_searched_yet' && <SearchTypeMenu />
											}
											{/*{
												searchParameters.type === 'song' && <TopSongs />
											}*/}
											{
												Object.keys(searchResults).map((key) => (
													<Result
														searchType={searchParameters.type}
														result={searchResults[key]}
														provider={key}
														key={key} />
												))
											}
											<div className="loading-anim-wrapper">
												{
													searchStatus === 'searching' &&
													<Icon type="loading" style={{fontSize: 30, color: themeColor}} />
												}
											</div>
										</div>
									)}/>
								</Switch>

							</div>
							}
						</Content>
						<Footer>
							<MyFooter/>
						</Footer>
						<MusicPlayer />
					</Layout>
					</BrowserRouter>
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
function mapStateToProps(state) {
	return {
		user: state.user,
		searchStatus: state.searchStatus,
		searchResults: state.searchResults,
		searchParameters: state.searchParameters
	};
}
function mapDispatchToProps(dispatch) {
	return {

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
