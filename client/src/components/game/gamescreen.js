import React, { Component } from "react";
import Engine from "./engine";

class GameScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			canvasHeight: 600,
			canvasWidth: 600
		};
		this.engine = null;
		//		this.canvasRef = React.createRef();
	}
	componentDidMount() {
		this.engine = new Engine();
		this.engine.generateTileMap()
		this.engine.mainLoop();
//		console.log(this.engine);
	}
	render() {
		return (
			<div>
				Canvas
				<canvas
					id="game-canvas"
					// ref={this.canvasRef}
					width={this.state.canvasWidth}
					height={this.state.canvasHeight}
					style={{
						width: `${this.state.canvasWidth}px`,
						height: `${this.state.canvasHeight}px`,
						border: '1px solid black'
					}}
				/>
			</div>
		);
	}
}

export default GameScreen;
