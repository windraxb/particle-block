import Ring from './Ring';
import Priticle from './Priticle';

export default class Clock {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	rings: Ring[];
	priticles: Priticle[];
	numbers: {}[];
	last: string;
	colors: string[];
	constructor() {
		this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = innerWidth;
		this.canvas.height = innerHeight;
		this.rings = [];
		this.priticles = [];
		this.numbers = [];
		this.last = '';
		this.colors = ['#1e90ff', '#1e90ff', '#ffa502', '#ffa502', '#2ed573', '#2ed573'];

		this.init();
	}
	init() {
		for (let i = 0; i < 200; i++) {
			this.rings.push(new Ring(this.canvas.width, this.canvas.height, this.ctx));
		}
		this.initText();
		this.animate();
		this.startTime();
	}
	initText() {
		for (let i = 0; i < 10; i++) { //循环0-9
			this.ctx.font = "24px Arial"; //设置字体及字型
			let span = document.createElement("span") as HTMLElement; //创建span元素
			span.style.fontSize = "24px"; //根据设置的字体和字型设置span样式
			span.style.fontFamily = "Arial";
			span.innerHTML = i.toString(); //将数字写入span
			document.body.appendChild(span); //将span作为子元素插入页面
			let width = span.offsetWidth; //获取span的尺寸
			let height = span.offsetHeight;
			span.remove(); //移除span
			this.ctx.fillText(i.toString(), 0, height); //根据获得的字型高度写入画布
			let data = this.ctx.getImageData(0, 0, width, height).data; //根据获得的span尺寸截取画布信息
			let len = data.length; //获取数组长度
			let tdata = []; //创建储存单个字符的数组
			for (let j = 0; j < len / 4; j++) { //按照每四个数字对应一个像素信息的方法遍历所有像素
				if (data[j * 4 + 3] != 0) { //如果这个像素不是全透明的话则记录像素的坐标
					let x = j % width | 0;
					let y = j / width | 0;
					tdata.push({ //将像素坐标作为对象存入数组
						x: x,
						y: y
					});
				}
			}
			this.numbers.push(tdata); //将对应字符的坐标数据存入数组
			this.ctx.clearRect(0, 0, width, height); //清理画布
		}
	}
	initClock() {
		let now: any = this.currentClock();
		for (let i in now) {
			const color = this.colors[i];
			for (let j in this.numbers[now[i]]) {
				let n = this.numbers[now[i]][j];
				let r = this.rings[j];
				if (now[i] !== this.last[i]) {
					this.priticles.push(
						new Priticle(
							r.dx,
							r.dy,
							n.x * 4 + (this.canvas.width / 2 - 180 + 60 * +i),
							n.y * 4 + this.canvas.height / 2 - 60,
							this.ctx,
							color,
						)
					)
				} else {
					this.priticles.push(
						new Priticle(
							n.x * 4 + (this.canvas.width / 2 - 180 + 60 * +i),
							n.y * 4 + this.canvas.height / 2 - 60,
							n.x * 4 + (this.canvas.width / 2 - 180 + 60 * +i),
							n.y * 4 + this.canvas.height / 2 - 60,
							this.ctx,
							color,
						)
					)
				}
			}
		}
		this.last = now;
	}
	draw() {
		this.ctx.fillStyle = `rgba(0, 0, 0, 0.1)`;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		for (let i in this.rings) {
			const r = this.rings[i];
			r.update();
			r.draw();
		}
		for (let i in this.priticles) {
			const p = this.priticles[i];
			p.update();
			p.draw();
			if (p.age === -50) {
				this.priticles.splice(+i, 1);
			}
		}
	}
	startTime() {
		setInterval(() => this.initClock(), 1000);
	}
	animate() {
		requestAnimationFrame(() => this.animate());
		this.draw();
	}
	currentClock() {
		const d = new Date();
		return ('0' + d.getHours()).slice(-2) + ('0' + d.getMinutes()).slice(-2) + ('0' + d.getSeconds()).slice(-2);
	}
}
