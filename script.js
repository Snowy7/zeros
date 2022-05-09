const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stage = 0;

let particlesArray = [];
let particlesArrayText = [];
let adjustX = 0;
let adjustY = 5;
//mouse
let mouse = {
  x: undefined,
  y: undefined,
  radius: 100,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

const png = new Image();
function drawImg(){
  png.src = "data:image/jpeg;base64,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"
  png.addEventListener("load", ()=> {
    drawImage()
  })

}
function drawImage() {
  console.log("GG");
  ctx.drawImage(png, 0, 0);

  let imageWidth = png.width;
  let imageHeight = png.height;

  const data = ctx.getImageData(0, 0, imageWidth, imageHeight);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  class Particle {

    constructor(x, y, color, size) {
      var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      this.x = x + canvas.width / 2 - png.width * 2;
      this.y = y + canvas.height / 2 - png.height * 2;
      this.x = this.x * Math.random() * plusOrMinus * -100 + 2;
      this.y = this.y * Math.random() * (plusOrMinus) * 100 + 2;
      this.size = size;
      this.color = color;
      this.baseX = x + canvas.width / 2 - png.width * 2;
      this.baseY = y + canvas.height / 2 - png.height * 2;
      this.density = Math.random() * 10 + 2;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }

    update() {
      ctx.fillStyle = this.color;

      // collision detection
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;

      // max distance, past that the force will be 0
      let maxDistance = 3000;
      let force = (maxDistance - distance) / maxDistance;
      if (force < 0) {
        force = 0;
      }

      let directionX = forceDirectionX * force * this.density * 2;
      let directionY = forceDirectionY * force * this.density * 2;

      if (distance < mouse.radius + this.size) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.baseX - this.x;
          this.x += dx / 20;
        }
        if (this.y !== this.baseY) {
          let dy = this.baseY - this.y;
          this.y += dy / 20;
        }
      }
      this.draw();
    }
  }

  function init() {
    for (let y = 0, y2 = data.height; y < y2; y++) {
      for (let x = 0, x2 = data.width; x < x2; x++) {
        if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
          let positionX = x - 30;
          let positionY = y - 30;
          let color = "rgb(" +
              data.data[(y * 4 * data.width) + (x * 4)] +
              ", " +
              data.data[(y * 4 * data.width) + (x * 4) + 1] +
              ", " +
              data.data[(y * 4 * data.width) + (x * 4) + 2] +
              ")";
          particlesArray.push(
              new Particle(positionX * 10, positionY * 10, color, 5)
          );
        }
      }
    }
  }

  init();

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });
}

function drawText(text, fontSize){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'White';
  ctx.font = fontSize + 'px monospace';
  ctx.fillText(text, 0, 30);
  const textCoordinates = ctx.getImageData(0, 0, 100, 100);

  class ParticleText {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 3;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = (Math.random() * 40) + 5;
    }

    draw (){
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update(){
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = mouse.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * this.density;
      let directionY = forceDirectionY * force * this.density;
      if (distance < mouse.radius) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.baseX - this.x;
          this.x += dx / 10;
        }
        if (this.y !== this.baseY) {
          let dy = this.baseY - this.y;
          this.y += dy / 10;
        }
      }
    }
  }

  function init(){
    particlesArrayText = [];
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
      for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
        if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
          let positionX = x + adjustX;
          let positionY = y + adjustY;
          particlesArrayText.push(
              new ParticleText(positionX * 20, positionY * 20)
          );
        }
      }
    }
  }

  init();

}

function nextStage(){
  switch (stage){
    case 0:
      drawText("Happy Birthday", 12);
      setTimeout(nextStage, 3000)
      break;
    case 1:
      drawText("Welcome TO 16", 12);
      setTimeout(nextStage, 2000);
      break;
    case 2:
      drawText("ZEROS", 28);
      setTimeout(nextStage, 2000)
      break;
    case 3:
      drawText("UR MOM", 28);
      setTimeout(nextStage, 2000);
      break;
    case 4:
      drawText('');
      drawImg();
      break;
  }
  stage++;
}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArrayText.length; i++){
    particlesArrayText[i].draw();
    particlesArrayText[i].update();
  }
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  requestAnimationFrame(animate);

}

animate();

window.addEventListener("load", function () {
  //  drawText("HBD Younes");
  nextStage();
});



