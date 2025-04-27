const stories = {
    "ABC123": {
        title: "انطلاقة البطل",
        text: "في ليلة شتوية ممطرة، قلب الفريق الطاولة بأداء أسطوري، وكان هذا القميص شاهدًا على المجد."
    },
    "XYZ789": {
        title: "اللمسة الأخيرة",
        text: "في الثواني الأخيرة من المباراة، سجّل اللاعب الهدف الذهبي مرتديًا هذا القميص الخالد."
    }
};

const container = document.getElementById('container');
const tshirts = [];

for (let i = 0; i < 8; i++) {
    const tshirt = document.createElement('div');
    tshirt.classList.add('tshirt');
    container.appendChild(tshirt);

    tshirt.style.top = Math.random() * (window.innerHeight - 30) + 'px';
    tshirt.style.left = Math.random() * (window.innerWidth - 30) + 'px';

    tshirt.style.backgroundImage = `url('/images/tshirt${i + 1}.png')`; // تغيير الكرات إلى صور التيشيرتات
    tshirt.style.backgroundSize = 'cover'; // تأكد من أن الصورة تغطي العنصر بالكامل
    tshirt.style.width = '50px'; // تحديد حجم الصورة
    tshirt.style.height = '50px'; // تحديد حجم الصورة
    tshirt.style.borderRadius = '50%'; // تأكد من أن الصورة تظهر دائرية

    tshirts.push({
        el: tshirt,
        x: parseFloat(tshirt.style.left),
        y: parseFloat(tshirt.style.top),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
    });

    gsap.to(tshirt, {
        opacity: 1,
        scale: 1,
        duration: 2,
        delay: Math.random() * 2,
        ease: "power2.out",
    });
}

function animate() {
    tshirts.forEach(ball => {
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x <= 0 || ball.x >= window.innerWidth - 50) ball.vx *= -1; // حجم الصورة الآن 50px
        if (ball.y <= 0 || ball.y >= window.innerHeight - 50) ball.vy *= -1; // حجم الصورة الآن 50px

        ball.el.style.left = ball.x + 'px';
        ball.el.style.top = ball.y + 'px';
    });
    requestAnimationFrame(animate);
}
animate();

setTimeout(() => {
    tshirts.forEach(tshirt => {
        gsap.to(tshirt.el, { opacity: 0, scale: 0, duration: 1.5, onComplete: () => tshirt.el.remove() });
    });

    gsap.to("#content", { opacity: 1, duration: 2 });
    gsap.to("h1", { opacity: 1, y: -20, duration: 1, delay: 0.3 });
    gsap.to("p", { opacity: 1, y: -20, duration: 1, delay: 0.8 });
    gsap.to(".input-container", { opacity: 1, y: 20, duration: 1, delay: 1.2 });
}, 6000);

const submitButton = document.getElementById('submitButton');
const codeInput = document.getElementById('codeInput');
const storyContainer = document.getElementById('storyContainer');
const storyTitle = document.getElementById('storyTitle');
const storyText = document.getElementById('storyText');
const backButton = document.getElementById('backButton');

submitButton.addEventListener('click', () => {
    const code = codeInput.value.trim();
    if (stories[code]) {
        storyTitle.textContent = stories[code].title;
        storyText.textContent = stories[code].text;

        gsap.to("#content", {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                document.getElementById('content').style.display = 'none';
                storyContainer.style.display = 'block';
                gsap.to("#storyContainer", { opacity: 1, duration: 2 });
                gsap.to(".story-page h2", { opacity: 1, y: -20, duration: 1, delay: 0.5 });
                gsap.to(".story-page p", { opacity: 1, y: -20, duration: 1, delay: 0.8 });
                backButton.style.display = 'inline-block';
            }
        });
    } else {
        alert('لم يتم العثور على قصة لهذا الكود!');
    }
});

backButton.addEventListener('click', () => {
    storyContainer.style.display = 'none';
    document.getElementById('content').style.display = 'block';
    codeInput.value = '';
    gsap.to("#content", { opacity: 1, duration: 1 });
});
