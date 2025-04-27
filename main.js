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
    tshirts.forEach(tshirt => {
        tshirt.x += tshirt.vx;
        tshirt.y += tshirt.vy;
        if (tshirt.x <= 0 || tshirt.x >= window.innerWidth - 30) tshirt.vx *= -1;
        if (tshirt.y <= 0 || tshirt.y >= window.innerHeight - 30) tshirt.vy *= -1;
        tshirt.el.style.left = tshirt.x + 'px';
        tshirt.el.style.top = tshirt.y + 'px';
    });
    requestAnimationFrame(animate);
}
animate();

setTimeout(() => {
    // تغيير الكرات إلى صور التيشيرتات
    const tshirtImages = [
        'images/tshirt1_image.png',
        'images/tshirt2_image.png',
        'images/tshirt3_image.png',
        'images/tshirt4_image.png',
        'images/tshirt5_image.png',
        'images/tshirt6_image.png',
        'images/tshirt7_image.png',
        'images/tshirt8_image.png'
    ];

    document.querySelectorAll('.tshirt').forEach((tshirt, index) => {
        tshirt.style.backgroundImage = `url(${tshirtImages[index]})`;
        tshirt.style.backgroundSize = 'cover';
        tshirt.style.backgroundPosition = 'center';
        tshirt.style.borderRadius = '15px';
    });

    document.querySelectorAll('.tshirt').forEach(tshirt => tshirt.style.display = 'none');
    gsap.to("#content", { opacity: 1, duration: 2 });
}, 6000);

document.getElementById('submitButton').addEventListener('click', function () {
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

document.getElementById('backButton').addEventListener('click', function () {
    document.getElementById('storyContainer').style.display = 'none';
    document.getElementById('content').style.display = 'block';
});
