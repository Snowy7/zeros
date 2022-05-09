const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

let particlesArrayText = [];
let adjustX = 1;
let adjustY = -10;

//mouse2
let mouse2 = {
    x: undefined,
    y: undefined,
    radius: 100,
};

window.addEventListener("mousemove", function (event) {
    mouse2.x = event.x;
    mouse2.y = event.y + 150;
});

ctx2.fillStyle = 'White';
ctx2.font = '17px monospace';
ctx2.fillText('HBD Younes', 0, 30);
const textCoordinates = ctx2.getImageData(0, 0, 100, 100);

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
        ctx2.fillStyle = 'white';
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx2.closePath();
        ctx2.fill();
     }

     update(){
         let dx = mouse2.x - this.x;
         let dy = mouse2.y - this.y;
         let distance = Math.sqrt(dx * dx + dy * dy);
         let forceDirectionX = dx / distance;
         let forceDirectionY = dy / distance;
         let maxDistance = mouse2.radius;
         let force = (maxDistance - distance) / maxDistance;
         let directionX = forceDirectionX * force * this.density;
         let directionY = forceDirectionY * force * this.density;
         if (distance < mouse2.radius) {
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

function animate(){
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    for (let i = 0; i < particlesArrayText.length; i++){
        particlesArrayText[i].draw();
        particlesArrayText[i].update();
    }
    requestAnimationFrame(animate);
}

animate();