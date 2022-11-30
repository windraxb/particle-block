export default class Ring {
	x: number;
	y: number;
	deg: number;
	r: number;
	vd: number;
	color: string;
	dx: number;
	dy: number;
	ctx: CanvasRenderingContext2D;
	constructor(w: number, h: number, ctx: CanvasRenderingContext2D) {
		this.x = w / 2;
		this.y = h / 2;
		this.deg = Math.random() * Math.PI * 2;
		this.r = 200 + Math.random() * 10 | 0;
		this.vd = Math.random() * Math.PI * 2 / 360 + 0.01;
		this.color = `hsl(${Math.random() * 360 | 0}, 80%, 50%)`;
		this.dx = this.r * Math.cos(this.deg) + this.x;
		this.dy = this.r * Math.sin(this.deg) + this.y;
		this.ctx = ctx;
	}
	update() {
		this.deg += this.vd;
		this.deg = this.deg % (Math.PI * 2);
		this.dx = this.r * Math.cos(this.deg) + this.x;
		this.dy = this.r * Math.sin(this.deg) + this.y;
	}
	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.dx, this.dy, 1, 0, Math.PI * 2);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
	}
}
