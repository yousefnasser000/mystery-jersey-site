const stories = {
  "A123": { text: "في ليلة ممطرة...", media: "" },
  "B456": { text: "تحت أضواء المدينة...", media: "" }
};

const container = document.getElementById('container');
const tshirts = [];

// كود الكرات المتحركة
for (let i = 0; i < 8; i++) {
  const tshirt = document.createElement('div');
  tshirt.classList.add('tshirt');
  container.appendChild(tshirt);
  tshirt.style.top = Math.random() * (window.innerHeight - 30) + 'px';
  tshirt.style.left = Math.random() * (window.innerWidth - 30) + 'px';
  tshirts.push({
    el: tshirt,
    x: parseFloat(tshirt.style.left),
    y: parseFloat(tshirt.style.top),
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2
  });
  gsap.to(tshirt, { opacity: 1, duration: 3, delay: Math.random() * 2, scale: 1, ease: "sine.out" });
}

function animate() {
  tshirts.forEach(ball => {
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.x <= 0 || ball.x >= window.innerWidth - 30) ball.vx *= -1;
    if (ball.y <= 0 || ball.y >= window.innerHeight - 30) ball.vy *= -1;
    ball.el.style.left = ball.x + 'px';
    ball.el.style.top = ball.y + 'px';
  });
  requestAnimationFrame(animate);
}
animate();

setTimeout(() => {
  document.querySelectorAll('.tshirt').forEach(tshirt => tshirt.style.display = 'none');
  gsap.to("#content", { opacity: 1, duration: 2 });
}, 6000);

document.getElementById('submitButton').addEventListener('click', function() {
  const code = document.getElementById('codeInput').value.trim();
  if (stories[code]) {
    document.getElementById('content').style.display = 'none';
    document.getElementById('storyContainer').style.display = 'block';
    document.getElementById('storyText').innerText = stories[code].text;
    const mediaContainer = document.getElementById('mediaContainer');
    mediaContainer.innerHTML = stories[code].media || '';
  } else {
    alert("الكود غير صحيح!");
  }
});

document.getElementById('backButton').addEventListener('click', function() {
  document.getElementById('storyContainer').style.display = 'none';
  document.getElementById('content').style.display = 'block';
});
