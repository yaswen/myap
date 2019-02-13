import React, { Component } from 'react';

export default class Footer extends Component {
	render() {
		return (
			<div style={styles.footer}>
				<p>
					shiwen&nbsp;模仿&nbsp;铜钟&nbsp;项目<br/>
					<a style={{ color: '#99f' }} href="http://120.132.29.41/#">
						主页链接
					</a>
				</p>
			</div>
		);

	}
}

const styles = {
	footer: {
		margin: '30px 0',
		paddingBottom : '64px',
		color: '#99F',
		textAlign: 'center'
	}
};
