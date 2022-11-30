export default class Priticle {
	x: number;
	y: number;
	sx: number;
	sy: number;
	tx: number;
	ty: number;
	color: string;
	age: number;
	ctx: CanvasRenderingContext2D;
	constructor(x: number, y: number, tx: number, ty: number, ctx: CanvasRenderingContext2D, color = 'gray',) {
		this.x = x;
		this.y = y;
		this.sx = (tx - x) / 100;
		this.sy = (ty - y) / 100;
		this.tx = tx;
		this.ty = ty;
		this.color = color;
		this.age = 100;
		this.ctx = ctx;
	}
	update() {
		this.age--;
		if (this.age >= 0) {
			this.x += this.sx;
			this.y += this.sy;
		}
	}
	draw() {
		this.ctx.beginPath();
		this.ctx.fillStyle = this.color;
		this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
		this.ctx.fill();
	}
}
