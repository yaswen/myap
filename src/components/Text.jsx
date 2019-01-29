import React, { Component } from 'react';
import { Button } from 'antd';
import { Icon } from 'antd';
import { Row, Col } from 'antd';

class Text extends Component{
	constructor() {
		super();
		this.state = {name:"react"};
	}
	klick(e){
		this.setState({name:e});
		console.log("klick按钮："+this.state.name);
	}
	render() {
		return (
			<div >
				<Row type="flex" align="middle" className="container">
					<Col xs={24} sm={6}>
						<div style={{ padding: '10px 0',height:'48px', }}>
							<Icon title={"24"} type="play-circle" />
						</div>
					</Col>
					<Col xs={24} sm={12}>
						大家好，我是{this.state.name}做出来的！
					</Col>
					<Col xs={24} sm={6}>
					</Col>
				</Row>

				<Row type="flex" align="middle" className="container">
					<Col xs={24} sm={12}>
						<Row  type="flex" align="middle"  className={"container"}>
							<Col xs={24} sm={12} ><Button type="primary" onClick={() => this.klick("react")} >react</Button></Col>
							<Col xs={24} sm={12}><Button type="primary" onClick={() => this.klick("shiwen")} >shiwen</Button></Col>
						</Row>
						<Row  type="flex" align="middle"  className={"container"}>
							<Col xs={24} sm={12}><Button type="primary" onClick={() => this.klick("react")} >react</Button></Col>
							<Col xs={24} sm={12}><Button type="primary" onClick={() => this.klick("shiwen")} >shiwen</Button></Col>
						</Row>
					</Col>
					<Col xs={24} sm={12}>
						<Button type="primary" onClick={() => this.klick("react")} >react</Button>
						<Button type="primary" onClick={() => this.klick("shiwen")} >shiwen</Button>
					</Col>
				</Row>
			</div>
		);
	}
}
export default Text;