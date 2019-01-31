import React, {Component} from 'react';
import {Row, Col, Button} from 'antd';
import './songItem.css';
import MVIcon from './MVIcon';
import Artists from './Artists';
import AddTo from './AddTo';
import {connect} from 'react-redux';

import neteaseMusicLogo from './images/netease_22.png';
import qqMusicLogo from './images/qq_22.png';
import xiamiMusicLogo from './images/xiami_22.png';

class SongItem extends Component {
	constructor(props) {
		super(props);
	}

	/*
	* 播放暂停键的onClick
	* 初始分析，如果这首歌没在播放，应显示播放，否则应显示暂停。如果没在播放列表里，要加到播放列表里
	* 函数逻辑：
	* 入参shouldPlay，如果为真，
	* */
	playOrPause = (shouldPlay) => {
		if (shouldPlay) {//当前是播放键
			const index = this.props.playlist.findIndex(song => song.link === this.props.song.link);
			//findIndex,返回数组中符合参数函数返回值为true的成员的索引位置.这里就是返回本身歌曲是否在播放列表里,如果在,返回索引位置,如果不在,返回-1
			if (index === -1) {//如果没找到,则把当前歌曲加进播放列表,并且播放列表的长度更新
				this.props.addToPlaylist(this.props.song);
				this.props.updatePlayIndex(this.props.playlist.length);
			} else {//如果找到了,播放index更新
				this.props.updatePlayIndex(index);
			}
			this.props.updatePlayAction('play');//然后playAction更新为播放状态
		} else {//当前是暂停键,那说明歌曲本来就在播放列表里.不用判断各种的了,直接把播放状态更新为暂停.
			this.props.updatePlayAction('pause');
		}
	};


	render() {
		let {song, currentSong} = this.props;
		let anchorClass = song.hasCopyright ? '' : 'no-copyright';//有没有版权
		//显示的播放图标是啥样（true表示要显示播放按钮/false表示要显示暂停按钮），如果没有当前歌曲或者当前歌曲不是这首歌，或者当前歌曲的链接是这首歌并且播放状态为暂停。
		//也就是，如果这首歌正在播放，则显示暂停按钮，如果没在播放（在播放别的歌或者压根没播歌），则显示播放按钮
		const shouldShowPlayIcon =
			(!currentSong || currentSong.link !== song.link) ||
			(currentSong.link === song.link && this.props.playAction === 'pause');

		return (
			<li className={"song-item"}>
				<Row type="flex" align="middle" style={{fontSize: 14}}>
					<Col xs={24} sm={8}>
						<div className={"nowrap"}>
							<a href={song.link}
							   title={`${song.name}${song.alias ? ` - ${song.alias}` : ''}\n` +
							   `${song.hasCopyright ? '' : '（此歌曲在该平台可能存在版权问题。）'}`}
							   target="_blank"
							   className={anchorClass}
							>
								<span>{song.name}</span>
								<span className="song-alias">
                                    {song.alias && ` - ${song.alias}`}
                                </span>
							</a>
						</div>
					</Col>
					<Col sm={1}>{song.mvLink && <MVIcon link={song.mvLink}/>}</Col>
					<Col xs={12} sm={5}>
						<div className="nowrap">
							<Artists artists={song.artists}/>
						</div>
					</Col>
					<Col xs={12} sm={5}>
						<div className="nowrap">
							<a href={song.album.link} target="_blank" title={song.album.name}>
								《{song.album.name}》
							</a>
						</div>
					</Col>
					<Col sm={2}>
						{
							this.props.showPlatform &&
							<img src={logos[song.platform]} alt={song.platform} style={{width: 22, height: 22}}/>
						}
					</Col>
					<Col sm={1}>
						<Button
							onClick={() => this.playOrPause(shouldShowPlayIcon)}
							shape="circle"
							icon={shouldShowPlayIcon ? 'caret-right' : 'pause'}//到时候，
							title={shouldShowPlayIcon ? '播放' : '暂停'}
							style={{
								backgroundColor: 'rgba(0, 0, 0, 0)',
							}}
						/>
					</Col>
					<Col sm={1}>
						<AddTo data={song} />
					</Col>
				</Row>
			</li>
		);
	}
}

const logos = {
	qq: qqMusicLogo,
	netease: neteaseMusicLogo,
	xiami: xiamiMusicLogo
};

/*
* 读取redux的state的数据，存到props：
* currentSong当前播放歌曲。
* playlist 播放列表
* playAction 播歌状态
*
* */
function mapStateToProps(state) {
	return {
		currentSong: state.playlist[state.playIndex],
		playlist: state.playlist,
		playAction: state.playAction,
	};
}

//这里涉及到的几个函数,
// addToPlaylist是用来把song放进播放列表里最后一个.
// updatePlayIndex是用来改变播放进度,也就是正在播放或者暂停中的歌曲是当前播放列表中的第几个.
// updatePlayAction是用来改变播放状态,当前播放状态是播放中还是暂停中.
function mapDispatchToProps(dispatch) {
	return {
		addToPlaylist: (song) => {
			dispatch({type: 'ADD_TO_PLAYLIST', data: song});
		},
		updatePlayIndex: (index) => {
			dispatch({type: 'UPDATE_PLAY_INDEX', data: index});
		},
		updatePlayAction: (playAction) => {
			dispatch({type: 'UPDATE_PLAY_ACTION', data: playAction});
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SongItem);