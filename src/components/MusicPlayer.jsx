import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Row, Col, Slider, Button, notification, Tooltip } from 'antd';
import { withBaseIcon } from 'react-icons-kit';
import { repeat } from 'react-icons-kit/ikons/repeat';
import { ic_repeat_one } from 'react-icons-kit/md/ic_repeat_one';
import { shuffle } from 'react-icons-kit/ikons/shuffle';
import { volume_2 } from 'react-icons-kit/ikons/volume_2';
import { volume_mute } from 'react-icons-kit/ikons/volume_mute';

import Artists from './Artists';
import MVIcon from './MVIcon';
import Playlist from './Playlist';
import { toMinAndSec } from '../lib/time_converter';
// import { musicPlayer, themeColor } from '../../../config';
// const themeColor = '#EA7030';
const musicPlayer = {
	background: 'rgba(120, 120, 120, 1)',
	color: 'white',
};
//提示的配置，右下角，下方距离50，存在时长3秒
notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
});

const Icon1 = withBaseIcon({
  size: 20, style: { color: 'white', verticalAlign: 'middle' }
});
const modeIcons = {
  loop: repeat,
  single: ic_repeat_one,
  shuffle: shuffle,
};

const playModes = ['loop', 'shuffle', 'single'];
const modeExplanations = {
  loop: '循环',
  shuffle: '随机',
  single: '单曲循环',
};

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playMode: localStorage.getItem('playMode') || 'loop',
      volume:
        localStorage.getItem('volume') ?
          Number(localStorage.getItem('volume')) : 0.6,
      songSource: null,
      muted: false,
      playProgress: 0,
    };//初始化播放参数
    this.playOrPause = this.playOrPause.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.getSongSource = this.getSongSource.bind(this);
    this.changePlayProgress = this.changePlayProgress.bind(this);
    this.muteOrNot = this.muteOrNot.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.playNext = this.playNext.bind(this);
    this.switchPlayMode = this.switchPlayMode.bind(this);
    this.clickPlaylistBtn = this.clickPlaylistBtn.bind(this);
  }
/*
当组件在客户端被实例化，第一次被创建时，以下方法依次被调用：
1、getDefaultProps
2、getInitialState
3、componentWillMount
4、render
5、componentDidMount
* */
  componentDidMount() {
    this.audio.volume = this.state.volume;
    this.audio.addEventListener('loadeddata', () => {
      this.setState({
        songLoaded: true,
        songDuration: this.audio.duration,
        // playProgress: 0
      });
    });
    this.audio.addEventListener('play', () => {
      document.title = `${this.props.currentSong.name} - 铜钟聚合音乐`;
      if (this.interval) { clearInterval(this.interval); }
      this.interval = setInterval(() => {
        console.log('interval');
        this.setState({
          playProgress: this.audio.currentTime,
          // songDuration: this.audio.duration,
        });
      }, 1000);
    });
    this.audio.addEventListener('pause', () => {
      if (this.interval) {
        clearInterval(this.interval);
      }
    });
    this.audio.addEventListener('ended', () => {
      clearInterval(this.interval);
      this.setState({
        playProgress: this.audio.currentTime,
      }, () => {
        const { currentSong, playlist } = this.props;
        const { playMode } = this.state;
        this.props.playNext(currentSong, playlist, playMode, 'forward');
      });
    });

  }
/*
组件已经渲染好并且用户可以与它进行交互，比如鼠标点击，手指点按，或者其它的一些事件，导致应用状态的改变，你将会看到下面的方法依次被调用
1、componentWillReceiveProps
2、shouldComponentUpdate
3、componentWillUpdate
4、render
5、componentDidUpdate
* */
  componentWillReceiveProps(nextProps) {
    const currentSong = this.props.currentSong;
    const songToPlay = nextProps.currentSong;
    const { playAction } = nextProps;

    if (songToPlay) {
      // updating playlist will cause component receive props, so the judgement
      // is necessary
      if ((currentSong && songToPlay.link !== currentSong.link) ||
        (!currentSong && songToPlay)) {
        if (playAction === 'play') {
          this.audio.pause();
          this.setState({
            songSource: null,
            songLoaded: false,
            playProgress: 0,
          });
          this.getSongSource(songToPlay.platform, songToPlay.originalId, () => {
            this.audio.play();
          });
        } else if (playAction === 'pause') {
          this.setState({
            songSource: null,
            songLoaded: false,
            playProgress: 0,
          });
        }
      } else if (currentSong && songToPlay.link === currentSong.link) {
        if (playAction === 'play') {
          this.play();
        } else if (playAction === 'pause') {
          this.pause();
        }
      }
    } else {
      if (playAction === 'play') {
        this.props.updatePlayAction('pause');
      } else if (playAction === 'pause') {
        this.pause();
      }
      this.setState({
        songSource: null,
        songLoaded: false,
        playProgress: 0,
      });
    }
  }

  playOrPause() {
    if (this.props.playAction === 'play') {
      this.props.updatePlayAction('pause');
    } else if (this.props.playAction === 'pause') {
      this.props.updatePlayAction('play');
    }
  }
  play() {
    if (this.state.songSource) {
      this.audio.play();
    } else {
      const { currentSong } = this.props;
      this.getSongSource(currentSong.platform, currentSong.originalId, () => {
        this.audio.play();
      });
    }
  }
  pause() {
    this.audio.pause();
  }

  //获得歌曲资源,
  getSongSource(platform, originalId, callback) {
    this.setState({
      getMusicUrlStatus: 'started',
    });
	  console.log(`getSongSource - ${platform}/${originalId}`);
    fetch(`http://tongzhong.xyz/api/song_source/${platform}/${originalId}`)//暂时使用铜钟的url，数据TODO
      .then(res => res.json())
      .then(json => {
        if (json.status === 'ok') {
          this.setState({
            songSource: json.data.songSource,
            songLoaded: false,
          }, callback);
        } else {
	        console.log('failed - json.status != ok');
          this.setState({
            getMusicUrlStatus: 'failed',
          });
        }
      })
      .catch(err => {
        console.log('failed - catched error'+err.toString());
        this.setState({
          getMusicUrlStatus: 'failed',
        });
      });
  }

  //修改播放进度,绑定播放进度条的onChange
  changePlayProgress(value) {
    this.audio.currentTime = value;
    this.setState({ playProgress: value });
  }

  //是否静音,绑定音量符号的onClick
  muteOrNot() {
    if (this.state.muted) {
      this.audio.muted = false;
      this.setState({ muted: false });
    } else {
      this.audio.muted = true;
      this.setState({ muted: true });
    }
  }

  //改变音量,绑定音量条的onChange
  changeVolume(value) {
    this.audio.volume = value;
    this.setState({ volume: value });
    localStorage.setItem('volume', value);
  }
//上一首或下一首,参数传入props的playNext函数.
  //绑定的是上一首和下一首.
  playNext(direction) {
    const { currentSong, playlist } = this.props;
    let { playMode } = this.state;
    if (playMode === 'single') {
      playMode = 'loop';
    }
    this.props.playNext(currentSong, playlist, playMode, direction);
  }

//切换播放模式.
  switchPlayMode() {
    const i = playModes.indexOf(this.state.playMode);//当前的playMode是playModes中的第几个..这个playModes是文件开头定义的常量
    const mode = playModes[i + 1] || playModes[0];//如果超出了playModes的长度,playModes[i+1]会返回undefined,整个表达式的值就是||后边的.
    localStorage.setItem('playMode', mode);
    this.setState({
      playMode: mode,
    });
  }
  //点击了播放列表按钮.绑定的是播放列表按钮的onClick
  //先从props中取shouldShowPlaylist,如果已显示,隐藏,如果未显示,显示.
  clickPlaylistBtn() {
    const { shouldShowPlaylist } = this.props;
    if (shouldShowPlaylist) {
      this.props.hidePlaylist();
    } else {
      this.props.showPlaylist();
    }
  }

  render() {
    const { currentSong } = this.props;
    const progress = toMinAndSec(this.state.playProgress);
    const total = toMinAndSec(this.state.songDuration);
    return (
      <div style={styles.player} id="music-player">
        <audio src={this.state.songSource}
          ref={(audio) => { this.audio = audio; }}
        >
          <source src={this.state.songSource} />
        </audio>

        <Row type="flex" align="middle" className="container" justify="space-around" >
          <Col xs={17} sm={3}>
            <Button ghost shape="circle" icon="step-backward"
              onClick={() => this.playNext('backward')}
            />
            <Button ghost shape="circle" size="large"
              icon={this.props.playAction === 'pause' ? 'caret-right' : 'pause'}
              onClick={this.playOrPause}
              // disabled={!this.state.songSource}
              style={{ margin: '0 10px' }} />
            <Button ghost shape="circle" icon="step-forward"
              onClick={() => this.playNext('forward')} />
          </Col>
          <Col xs={24} sm={15} style={{ paddingLeft: 30, paddingRight: 30 }}>
            <Row type="flex" align="middle" justify="space-between" style={{ height: 20 }}>
              <Col xs={11} sm={15}>
                <div className="nowrap">
                  {/*如果是当前歌曲*/}
                  {
                    currentSong &&
                    <span>
                      <span style={{ marginRight: 12, color: 'white' }}>
                        <a href={currentSong.link}
                          style={{ color: 'white', marginRight: 4, fontSize: 16 }}
                          target="_blank"
                        >
                          <strong>{currentSong.name}</strong>
                        </a>
                        {currentSong.mvLink &&
                          <MVIcon link={currentSong.mvLink}
                            fontColor="white"
                          />}
                      </span>
                      <span className="nowrap">
                        {
                          currentSong.artists &&
                          <Artists artists={currentSong.artists}
                            fontColor="white"
                          />
                        }
                      </span>
                    </span>
                  }
                </div>

              </Col>
              <Col xs={9} sm={5} style={{ fontSize: 'small', fontWeight: 'lighter', color: 'rgb(230, 230, 230)' }}>
                {currentSong && `来自${platforms[currentSong.platform]}`}
              </Col>
              <Col xs={0} sm={4} style={{ textAlign: 'right' }}>
                {
                  this.state.getMusicUrlStatus === 'failed' ? '播放失败' :
                    (
                      this.state.songLoaded ? `${progress} / ${total}` :
                        (this.props.playAction === 'play' &&
                          <Icon type="loading" />)
                    )
                }
              </Col>
            </Row>
            <Slider min={0}
              max={this.state.songDuration ? parseInt(this.state.songDuration) : 0}
              value={this.state.playProgress}
              tipFormatter={(value) => toMinAndSec(value)}
              onChange={this.changePlayProgress}
              disabled={!this.state.songSource}
              style={{ margin: '8px 0' }} />
          </Col>
          <Col xs={1} sm={1}>
          </Col>
          <Col xs={1} sm={1}>
            <Tooltip
              title={modeExplanations[this.state.playMode]}
            >
              <a
                  onClick={this.switchPlayMode}
              >
                <Icon1
                  icon={modeIcons[this.state.playMode]}
                />
              </a>
              {/* <Button
                onClick={this.switchPlayMode}
                style={{
                  border: 'none',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                }}
              >
                <Icon1
                  icon={modeIcons[this.state.playMode]}
                />
              </Button> */}
            </Tooltip>
          </Col>
          <Col xs={10} sm={3}>
            <Row type="flex" align="middle">
              <Col xs={3} sm={4}>
                <a onClick={this.muteOrNot}>
                  <Icon1 icon={this.state.muted ? volume_mute : volume_2} />
                </a>
                {/* <Button
                  onClick={this.muteOrNot}
                  style={{
                    border: 'none',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                  }}
                >
                  <Icon1 icon={this.state.muted ? volume_mute : volume_2} />
                </Button> */}
              </Col>
              <Col xs={21} sm={20} style={{ paddingRight: 5 }}>
                <Slider min={0} max={1} step={0.01}
                  defaultValue={this.state.volume}
                  onChange={this.changeVolume}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={2} sm={1}>
            <Button ghost icon="bars" onClick={this.clickPlaylistBtn}
              title="播放列表"
              style={{ float: 'right' }}
            />
          </Col>
        </Row>
        {
          this.props.shouldShowPlaylist && <Playlist />
        }
      </div>
    );
  }
}


const styles = {
  player: {
    position: 'fixed',
    bottom: 0,
    padding: '8px 0',
    width: '100%',
    backgroundColor: musicPlayer.background,
    color: musicPlayer.color,
  },
};
const platforms = {
  qq: 'QQ音乐',
  netease: '网易云音乐',
  xiami: '虾米'
};

function mapStateToProps(state) {
  const currentSong = state.playlist[state.playIndex];
  return {
    playAction: state.playAction,
    currentSong: currentSong,
    playlist: state.playlist,
    shouldShowPlaylist: state.shouldShowPlaylist,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    playNext: (currentSong, playlist, playMode, direction) => {
      let nextPlayIndex;
      const currentIndex = playlist.findIndex(song =>
        song.link === currentSong.link);
      if (playMode === 'loop') {
        if (direction === 'forward') {
          nextPlayIndex = playlist[currentIndex + 1] ? currentIndex + 1 : 0;
        } else if (direction === 'backward') {
          nextPlayIndex = playlist[currentIndex - 1] ? currentIndex - 1 :
            playlist.length - 1;
        }
      } else if (playMode === 'single') {
        dispatch({ type: 'UPDATE_PLAY_ACTION', data: 'pause' });
      } else if (playMode === 'shuffle') {
        nextPlayIndex = Math.floor(Math.random() * playlist.length);
      }
      if (nextPlayIndex !== undefined) {
        if (nextPlayIndex === currentIndex) {
          dispatch({ type: 'UPDATE_PLAY_ACTION', data: 'pause' });
        } else {
          dispatch({ type: 'UPDATE_PLAY_INDEX', data: nextPlayIndex });
        }
      }

      // if the player is paused, clicking "Previous" or "Next" button will make it play
      dispatch({ type: 'UPDATE_PLAY_ACTION', data: 'play' });
    },
    updatePlayAction: (playAction) => {
      dispatch({ type: 'UPDATE_PLAY_ACTION', data: playAction });
    },
    showPlaylist: () => {
      dispatch({ type: 'SHOULD_SHOW_PLAYLIST' });
    },
    hidePlaylist: () => {
      dispatch({ type: 'SHOULD_NOT_SHOW_PLAYLIST' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
