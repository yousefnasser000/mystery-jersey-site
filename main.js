const submitButton = document.getElementById('submitButton');
const codeInput = document.getElementById('codeInput');
const storyContainer = document.getElementById('storyContainer');
const storyTitle = document.getElementById('storyTitle');
const storyText = document.getElementById('storyText');
const backButton = document.getElementById('backButton');
const storyImage = document.getElementById('storyImage');
const storyVideo = document.getElementById('storyVideo');
const videoSource = document.getElementById('videoSource');

const stories = {
    "DELP2006": {
        title: "هدف ديل بييرو الخالد",
        text: "في نصف نهائي كأس العالم 2006 ضد ألمانيا، أليساندرو ديل بييرو سجل هدفًا خرافيًا بالدقيقة 120 بعد تمريرة ساحرة من فابيو جروسو، ليؤكد تأهل الآتزوري للنهائي أمام فرنسا.",
        video: "https://ia802905.us.archive.org/30/items/goal-del-piero-vs-germany-2006/goal-del-piero-vs-germany-2006.mp4",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/41/Del_Piero_celebration_2006.jpg"
    }
};

gsap.to("#content", { opacity: 1, duration: 2 });
gsap.to("h1", { opacity: 1, y: -20, duration: 1.5, delay: 0.5 });
gsap.to("p", { opacity: 1, y: -20, duration: 1.5, delay: 1 });
gsap.to(".input-container", { opacity: 1, y: 20, duration: 1.5, delay: 1.5 });
gsap.to(".social-buttons", { opacity: 1, y: 20, duration: 1.5, delay: 2 });

submitButton.addEventListener('click', () => {
    const code = codeInput.value.trim();
    if (stories[code]) {
        storyTitle.textContent = stories[code].title;
        storyText.textContent = stories[code].text;

        storyImage.src = stories[code].image;
        storyImage.style.display = 'block';

        videoSource.src = stories[code].video;
        storyVideo.load();
        storyVideo.style.display = 'block';

        gsap.to("#content", {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                document.getElementById('content').style.display = 'none';
                storyContainer.style.display = 'block';
                gsap.to("#storyContainer", { opacity: 1, duration: 2 });
                gsap.to(".story-page h2", { opacity: 1, y: -20, duration: 1.5, delay: 0.5 });
                gsap.to(".story-page p", { opacity: 1, y: -20, duration: 1.5, delay: 1 });
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
    storyImage.style.display = 'none';
    storyVideo.style.display = 'none';
    gsap.to("#content", { opacity: 1, duration: 1 });
});
