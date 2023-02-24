import { Application, Sprite, Container, TextStyle, Text, ParticleContainer, Texture } from 'pixi.js'

const canvas = document.getElementById("pixi-canvas") as HTMLCanvasElement;
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.bottom = "0";
canvas.style.right = "0";
canvas.style.margin = "auto";

const app = new Application({
	view: canvas,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: '#695BD1',
	width: 800,
	height: 480
});

document.body.appendChild(canvas);

// little click and scoretext

const style: TextStyle = new TextStyle({
	dropShadow: true,
	dropShadowAngle: 0.5,
	dropShadowBlur: 3,
	dropShadowColor: "#14c8b3",
	dropShadowDistance: 4,
	fill: "#c4e713",
	fontFamily: "Georgia, serif",
	fontSize: 32,
	stroke: "#6ba207",
	strokeThickness: 2
});

const texty: Text = new Text('cloud click', style);
texty.anchor.set(0.5);
texty.x = app.view.width / 4;
texty.y = 50;

app.stage.addChild(texty);

const style2: TextStyle = new TextStyle({
    dropShadow: true,
    dropShadowAngle: 0.5,
    dropShadowBlur: 2,
    dropShadowColor: "#986fae",
    dropShadowDistance: 3,
    fill: "#570881",
    fontFamily: "Georgia, serif",
    fontSize: 24,
    stroke: "#a08ccf"
});

// mouse pointer

const mouse: Sprite = Sprite.from("pixel_wand_1.gif");
mouse.scale.set(0.2);
mouse.anchor.set(0.5);

app.stage.addChild(mouse);

app.stage.interactive = true;
app.stage.on("pointermove", movePlayer);

function movePlayer(e: any) {
  let pos = e.data.global;

  mouse.x = pos.x;
  mouse.y = pos.y;
}

// graphic shapes and onclick

let score = 0;
const scoreText: Text = new Text(`score: ${score}`, style2);
scoreText.anchor.set(0.5);
scoreText.x = app.view.width / 4;
scoreText.y = 90;
app.stage.addChild(scoreText);

const graphos: Array<Container> = [];


let counter = 0;
function createGrapho(): void {

  const grapho = new Container();

  const cloud: Sprite = Sprite.from("pixel_cloud_2.png");
  cloud.scale.set(0.2);
  cloud.anchor.set(0.5);

  graphos.push(grapho);

  if (counter % 7 === 6) {
    cloud.tint = 0xFF69B4;
  }

  counter++;

  grapho.addChild(cloud);

  grapho.interactive = true;

  let x, y;
  do {
    x = Math.random() * (app.renderer.width - cloud.width * cloud.scale.x);
    y = Math.random() * (app.renderer.height - cloud.height * cloud.scale.y);
  } while (x < cloud.width * cloud.scale.x * 0.5 || y < cloud.height * cloud.scale.y * 0.5);

  grapho.position.set(x, y);

  grapho.on("click", () => {
    score++;
    scoreText.text = `score: ${score}`;
    graphos.splice(graphos.indexOf(grapho), 1);
    app.stage.removeChild(grapho);
  });

  app.stage.addChild(grapho);
}

function update(deltaTime: number): void {
  if (Math.random() < deltaTime / 12) {
    createGrapho();
  }
}

app.ticker.add((deltaTime) => {
  update(deltaTime);
});

// particle container for background

const particleContainer = new ParticleContainer(1000, {
    scale: true,
    position: true,
    rotation: true,
    uvs: true,
    alpha: true,
});

const sparkleTexture = Texture.from("sparkle.png");
const sparkleArray = [];

for (let i = 0; i < 100; i++) {
    const sparkle = new Sprite(sparkleTexture);
    sparkle.x = Math.random() * app.renderer.width;
    sparkle.y = Math.random() * app.renderer.height;
    sparkle.tint = 0xd4af37;
    sparkle.scale.set(0.1 + Math.random() * 0.5);
    sparkle.alpha = 0.5 + Math.random() * 0.5;
    sparkleArray.push(sparkle);
    particleContainer.addChild(sparkle);
}

app.stage.addChildAt(particleContainer, 0);

// container with clampy

// const conty: Container = new Container();
// app.stage.addChild(conty);

// const clampy: Sprite = Sprite.from("clampy.png");
// clampy.scale.set(0.5);
// clampy.anchor.set(0.5);
// clampy.x = app.view.width / 4;
// clampy.y = app.view.height / 4;
// conty.addChild(clampy);

// function animate() {
//   conty.rotation += 0.001;
//   requestAnimationFrame(animate);
// }

// animate();
