import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { firebaseConfig } from './firebase.js';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const submitButton = document.getElementById('submitButton');
const codeInput = document.getElementById('codeInput');
const storyContainer = document.getElementById('storyContainer');
const storyTitle = document.getElementById('storyTitle');
const storyText = document.getElementById('storyText');
const backButton = document.getElementById('backButton');
const storyImage = document.getElementById('storyImage');
const storyVideo = document.getElementById('storyVideo');
const videoSource = document.getElementById('videoSource');

gsap.to("#content", { opacity: 1, duration: 2 });
gsap.to("h1", { opacity: 1, y: -20, duration: 1.5, delay: 0.5 });
gsap.to("p", { opacity: 1, y: -20, duration: 1.5, delay: 1 });
gsap.to(".input-container", { opacity: 1, y: 20, duration: 1.5, delay: 1.5 });
gsap.to(".social-buttons", { opacity: 1, y: 20, duration: 1.5, delay: 2 });

submitButton.addEventListener('click', async () => {
    const code = codeInput.value.trim();
    const storyRef = ref(database, 'stories/' + code);

    try {
        const snapshot = await get(storyRef);
        if (snapshot.exists()) {
            const storyData = snapshot.val();

            storyTitle.textContent = storyData.title;
            storyText.textContent = storyData.text;

            if (storyData.image) {
                storyImage.src = storyData.image;
                storyImage.style.display = 'block';
            } else {
                storyImage.style.display = 'none';
            }

            if (storyData.video) {
                videoSource.src = storyData.video;
                storyVideo.load();
                storyVideo.style.display = 'block';
            } else {
                storyVideo.style.display = 'none';
            }

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
    } catch (error) {
        console.error(error);
        alert('حدث خطأ أثناء جلب القصة.');
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
