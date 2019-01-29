import React, { Component } from 'react';
import { Button, List, Row, Col, Icon } from 'antd';
import { connect } from 'react-redux';

import ItemInPlaylist from './SongItemInPlayList';
// import { playlist } from '../../../config';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // likeAll = () => {
  //
  // }

  render() {
    return (
      <div style={styles.wrapper}>
        <Row type="flex" align="middle" style={styles.header}>
          <Col span={14}>播放列表</Col>
          {/* <Col span={6}>
            <Button icon="heart-o" ghost>
              喜欢全部
            </Button>
          </Col> */}
          <Col span={8}>
            <Button icon="delete" ghost onClick={this.props.clearPlaylist}>
              清空
            </Button>
          </Col>
          <Col span={2}>
            <Button icon="close" ghost onClick={this.props.closePlaylist} />
          </Col>
        </Row>
        <div className="playlist" style={styles.list}>
          <List
            itemLayout="horizontal"
            dataSource={this.props.dataSource}
            size="small"
            renderItem={song => {
              return (
                <List.Item
                  key={`${song.platform}${song.originalId}`}
                  // style={{ color: 'white' }}
                >
                  <ItemInPlaylist song={song} rowWidth={playlist.width} />
                </List.Item>
              );
            }}

          />
        </div>

      </div>
    );
  }
}

const playlist={
  width:600
};//应该放在同一的项目配置处

const styles = {
  wrapper: {
    position: 'absolute',
    bottom: 64,
    color: 'white',
    left: (window.innerWidth - playlist.width) / 2,
    width: playlist.width + 30,
    // height: 300,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    background: 'rgba(150, 150, 150, 0.8)',
  },
  header: {
    borderBottom: '2px solid gray',
    padding: '10px 10px',
    background: 'rgb(150, 150, 150)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  list: {
    color: 'white',
    overflow: 'auto',
    // background: 'rgba(150, 150, 150, 0.8)',
    height: 260,
    padding: '0 10px',
  },
};

function mapStateToProps(state) {
  return {
    dataSource: state.playlist,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    clearPlaylist: () => {
      dispatch({ type: 'CLEAR_PLAYLIST' });
    },
    closePlaylist: () => {
      dispatch({ type: 'SHOULD_NOT_SHOW_PLAYLIST' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
