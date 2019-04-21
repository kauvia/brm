const ranN = num => Math.floor(Math.random() * num); //return random number from 0 to num-1
const getTanFromDegree = degrees => Math.tan((degrees * Math.PI) / 180);

class Engine {
	constructor(width = 600, height = 600, tilesX = 50, tilesY = 50) {
		this.canvas = document.getElementById("game-canvas");
		this.width = width;
		this.height = height;

		this.displaySize = { x: tilesX, y: tilesY };

		this.tileMap = [];

		this.oldTime = new Date();
		this.dt = 0;
		//		this.display = [];
	}

	generateTileMap = () => {
		const c = this.canvas.getContext("2d");

		for (let j = 0; j < this.displaySize.y; j++) {
			this.tileMap[j] = [];
			for (let i = 0; i < this.displaySize.x; i++) {
				this.tileMap[j][i] = new Tile(i, j, this.width / this.displaySize.x);
				this.tileMap[j][i].drawTile(c);
			}
		}
	};

	mainLoop = () => {
		const newTime = Date.now();
		const dt = newTime - this.oldTime;
		this.dt += dt;
		this.oldTime = newTime;

		//this.dt runs every whatever msec
		if (this.dt > 100) {
			this.draw();
			this.dt = 0;
		}

		requestAnimationFrame(this.mainLoop);
	};

	draw = () => {
		const c = this.canvas.getContext("2d");
		//	c.clearRect(0, 0, this.width, this.height);

		for (let j = 0; j < this.displaySize.y; j++) {
			for (let i = 0; i < this.displaySize.x; i++) {
				this.tileMap[j][i].updateTile(c);
			}
		}
	};
}

class Tile {
	constructor(x, y, size) {
		this.posX = x * size;
		this.posY = y * size;
		this.tileSize = size;

		this.fillStyle = "rgba(0,0,200,0.78)";

		this.type = 0;

		this.r = 100;
		this.g = 100;
		this.b = 100;
		this.a = 0;
	}
	updateTileA = c => {
		const prevFillStyle = this.fillStyle;
		this.type = ranN(5);
		this.type == 0
			? (this.fillStyle = "rgba(0,0,200,0.78)")
			: this.type == 1
			? (this.fillStyle = "rgba(0,200,200,0.78)")
			: this.type == 2
			? (this.fillStyle = "rgba(200,0,200,0.78)")
			: this.type == 3
			? (this.fillStyle = "rgba(0,200,200,0.78)")
			: this.type == 4
			? (this.fillStyle = "rgba(250,0,0,0.78)")
			: (this.fillStyle = "rgba(25,140,0,0.78)");

		if (prevFillStyle !== this.fillStyle) {
			this.drawTile(c);
		}
	};
	updateTileB = c => {
		this.fillStyle = `rgba(${ranN(255)},${ranN(255)},${ranN(
			255
		)},${Math.random()})`;

		this.drawTile(c);
	};
	updateTile = c => {
		this.r < 50
			? (this.r = 50)
			: this.r > 200
			? (this.r = 200)
			: (this.r += ranN(29) - 14);
		this.g < 50
			? (this.g = 50)
			: this.g > 200
			? (this.g = 200)
			: (this.g += ranN(29) - 14);
		this.b < 50
			? (this.b = 50)
			: this.b > 200
			? (this.b = 200)
			: (this.b += ranN(29) - 14);

		this.a += Math.random();
		this.a < 0 ? (this.a = 0) : this.a > 1 ? (this.a = 1) : this.a=this.a;

		this.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.a})`;

		this.drawTile(c);
	};
	drawTile = c => {
		c.fillStyle = this.fillStyle;
		c.strokeStyle = "rgba(0,0,0,.1)";
		c.lineWidth = 1;

		c.fillRect(this.posX, this.posY, this.tileSize, this.tileSize);
		c.strokeRect(this.posX, this.posY, this.tileSize, this.tileSize);
	};
}

export default Engine;
