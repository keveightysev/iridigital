// Fills background with random characters
const overallCont = document.getElementById('backgroundText');
const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`~!@#$%^&*()-=_+[]:;'<>/?.,"
const strLength = 100000;
let rString = '';
for (let i = 0; i < strLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    rString += (chars.substring(randomNumber, randomNumber + 1) + ' ');
}
overallCont.textContent = rString;
// End background text

// Gradient
const bgGradient = document.getElementById('backgroundGradient');
const ctx = bgGradient.getContext('2d');


const colors = (x, y, r, g, b) => {
  ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  ctx.fillRect(x, y, 1,1);
}

const red = (x, y, t) => {
  return( Math.floor(192 + 64*Math.cos( (x*x-y*y)/300 + t )) );
}

const green = (x, y, t) => {
  return( Math.floor(192 + 64*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
}

const blue = (x, y, t) => {
  return( Math.floor(192 + 64*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
}

let time = 0;

const run = () => {
  for(x=0;x<=35;x++) {
    for(y=0;y<=35;y++) {
      colors(x, y, red(x,y,time), green(x,y,time), blue(x,y,time));
    }
  }
  time = time + 0.04;
  window.requestAnimationFrame(run);
}

run();
// End Gradient



class NavLink {
    constructor(link) {
        this.link = link;
        this.data = link.dataset.section;
        this.linkContent = document.querySelector(`.nav-content[data-section=${this.data}]`);
        this.content = new LinkContent(this.linkContent);
        this.link.addEventListener('click', () => this.content.select());
    }
}

class LinkContent {
    constructor(item) {
        this.item = item;
    }

    select() {
        const items = document.querySelectorAll('.nav-content');
        items.forEach(item => item.classList.remove('active'));
        this.item.classList.add('active');
    }
}

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(navLink => new NavLink(navLink));