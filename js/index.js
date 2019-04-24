// Fills background with random characters
const overallCont = document.getElementById('backgroundText');
const chars =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`~!@#$%^&*()-=_+[]:;'<>/?.,";
const strLength = 100000;
let rString = '';
for (let i = 0; i < strLength; i++) {
  let randomNumber = Math.floor(Math.random() * chars.length);
  rString += chars.substring(randomNumber, randomNumber + 1) + ' ';
}
overallCont.textContent = rString;
// End background text

// Gradient
const bgGradient = document.getElementById('backgroundGradient');
const ctx = bgGradient.getContext('2d');

const colors = (x, y, r, g, b) => {
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fillRect(x, y, 1, 1);
};

const red = (x, y, t) => {
  return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t));
};

const green = (x, y, t) => {
  return Math.floor(
    192 +
      64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300),
  );
};

const blue = (x, y, t) => {
  return Math.floor(
    192 +
      64 *
        Math.sin(
          5 * Math.sin(t / 9) +
            ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100,
        ),
  );
};

let time = 0;

const run = () => {
  for (x = 0; x <= 35; x++) {
    for (y = 0; y <= 35; y++) {
      colors(x, y, red(x, y, time), green(x, y, time), blue(x, y, time));
    }
  }
  time = time + 0.04;
  window.requestAnimationFrame(run);
};

run();
// End Gradient

// Tab functionality
class NavLink {
  constructor(link) {
    this.link = link;
    this.data = link.dataset.link;
    this.linkContent = document.querySelector(
      `.nav-content[data-link=${this.data}]`,
    );
    this.closeBtn = document.querySelector(`.close[data-link=${this.data}]`);
    this.link.addEventListener('click', () => this.selectLink());
    this.closeBtn.addEventListener('click', () => this.closeContent());
    this.toContactBtn = document.querySelectorAll('.to-contact');
    this.toContactBtn.forEach(btn =>
      btn.addEventListener('click', () => this.toContact()),
    );
    this.toWorkBtn = document.querySelectorAll('.to-work');
    this.toWorkBtn.forEach(btn =>
      btn.addEventListener('click', () => this.toWork()),
    );
  }

  toContact() {
    this.closeBtn.style.display = 'none';
    this.link.classList.remove('active-link');
    this.link.classList.add('nav');
    this.fadeOut(this.linkContent);
    const contactClose = document.querySelector('.close[data-link="contact"]');
    const contactContent = document.querySelector(
      '.nav-content[data-link="contact"]',
    );
    const contactLink = document.querySelector(
      '.nav-link[data-link="contact"]',
    );
    contactLink.classList.add('active-link');
    contactClose.style.display = 'block';
    setTimeout(() => {
      this.fadeIn(contactContent);
    }, 145);
  }

  toWork() {
    this.closeBtn.style.display = 'none';
    this.link.classList.remove('active-link');
    this.link.classList.add('nav');
    this.fadeOut(this.linkContent);
    const workClose = document.querySelector('.close[data-link="work"]');
    const workContent = document.querySelector(
      '.nav-content[data-link="work"]',
    );
    const workLink = document.querySelector('.nav-link[data-link="work"]');
    workLink.classList.add('active-link');
    workClose.style.display = 'block';
    setTimeout(() => {
      this.fadeIn(workContent);
    }, 145);
  }

  fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
      if ((el.style.opacity -= 0.1) < 0) {
        el.style.display = 'none';
        el.classList.add('is-hidden');
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }

  fadeIn(el, display) {
    if (el.classList.contains('is-hidden')) {
      el.classList.remove('is-hidden');
    }
    el.style.opacity = 0;
    el.style.display = display || 'flex';

    (function fade() {
      let val = parseFloat(el.style.opacity);
      if (!((val += 0.1) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }

  closeContent() {
    this.closeBtn.style.display = 'none';
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => link.classList.remove('active-link'));
    links.forEach(link => link.classList.add('nav'));
    this.fadeOut(this.linkContent);
  }

  selectLink() {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.nav-content');

    if (this.link.classList.contains('active-link')) {
      this.closeBtn.style.display = 'none';
      links.forEach(link => link.classList.remove('active-link'));
      links.forEach(link => link.classList.add('nav'));
      this.fadeOut(this.linkContent);
    } else {
      links.forEach(link => link.classList.remove('active-link'));
      links.forEach(link => link.classList.add('nav'));
      sections.forEach(section => {
        section.classList.add('is-hidden');
        section.style.display = 'none';
      });
      this.link.classList.add('active-link');
      this.closeBtn.style.display = 'block';
      this.fadeIn(this.linkContent);
    }
  }
}

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(navLink => new NavLink(navLink));

// End Tabs

// Start Carousel
class Carousel {
  constructor(carousel) {
    this.carousel = carousel;
    this.left = this.carousel.querySelector('.left-btn');
    this.right = this.carousel.querySelector('.right-btn');
    this.slides = this.carousel.querySelectorAll('.card');
    this.index = 0;
    this.slides[this.index].classList.add('active-card');
    this.left.addEventListener('click', () => this.moveLeft());
    this.right.addEventListener('click', () => this.moveRight());
  }

  moveLeft() {
    if (this.index === 0) {
      this.index = this.slides.length - 1;
    } else {
      this.index--;
    }
    this.slides.forEach((slide, index) => {
      if (index !== this.index) {
        slide.classList.remove('active-card');
      }
    });
    this.slides[this.index].classList.add('active-card');
  }

  moveRight() {
    if (this.index === this.slides.length - 1) {
      this.index = 0;
    } else {
      this.index++;
    }
    this.slides.forEach((slide, index) => {
      if (index !== this.index) {
        slide.classList.remove('active-card');
      }
    });
    this.slides[this.index].classList.add('active-card');
  }
}

const carousel = new Carousel(document.querySelector('.card-carousel'));

// End Carousel
