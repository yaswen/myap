// import {ic_ondemand_video} from "react-icons-kit/md/ic_ondemand_video";
import React, { Component } from 'react';
// import Icon from 'react-icons-kit';
//react-icons-kit待安装
import {Icon} from 'antd';



class MVIcon extends Component {
	render(){
		return (
		<a
			href={this.props.link}
			target="_blank"
			title="MV"
		>
			<Icon type="play-circle" />
			{/*<Icon*/}
				{/*icon={ic_ondemand_video}*/}
				{/*size={22}*/}
				{/*style={{ verticalAlign: 'middle', color: this.props.fontColor }}*/}
			{/*/>*/}
		</a>
	);
	}
}
export default MVIcon;