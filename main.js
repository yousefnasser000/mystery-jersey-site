// ---- تهيئة Firebase ----
const firebaseConfig = {
    apiKey: "AIzaSyCrvVMMBEs5DvJ4fe7eoMoXO8RFNh4sXY0",
    authDomain: "mystery-jersey-ac144.firebaseapp.com",
    projectId: "mystery-jersey-ac144",
    storageBucket: "mystery-jersey-ac144.firebasestorage.app",
    messagingSenderId: "873172525436",
    appId: "1:873172525436:web:0db9e9c283d3fbf78684f9"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ---- الحصول على العناصر ----
const submitButton = document.getElementById('submitButton');
const codeInput = document.getElementById('codeInput');
const contentDiv = document.getElementById('content');
const storyContainer = document.getElementById('storyContainer');
const storyTitle = document.getElementById('storyTitle');
const storyText = document.getElementById('storyText');
const backButton = document.getElementById('backButton');
const storyImage = document.getElementById('storyImage');
const storyVideo = document.getElementById('storyVideo');

// ---- أنيميشن الظهور عند تحميل الصفحة ----
document.addEventListener('DOMContentLoaded', () => {
    gsap.to(contentDiv, { opacity: 1, duration: 2 });
    gsap.to("h1", { opacity: 1, y: -20, duration: 1.5, delay: 0.5 });
    gsap.to("p", { opacity: 1, y: -20, duration: 1.5, delay: 1 });
    gsap.to(".input-container", { opacity: 1, y: 20, duration: 1.5, delay: 1.5 });
    gsap.to(".social-buttons", { opacity: 1, y: 20, duration: 1.5, delay: 2 });
});

// ---- عند الضغط على "إكتشف" ----
submitButton.addEventListener('click', () => {
    const code = codeInput.value.trim().toLowerCase();  // تحويل الكود المدخل إلى حروف صغيرة
    if (!code) {
        alert('من فضلك أدخل كود القصة');
        return;
    }

    const codeRef = database.ref('codes/' + code); // البحث عن الكود في قاعدة البيانات
    codeRef.once('value')
        .then(snapshot => {
            const data = snapshot.val();
            if (!data) {
                alert("لم يتم العثور على القصة لهذا الكود.");
                return;
            }

            // تعبئة المحتوى
            storyTitle.textContent = data.title || "عنوان القصة";
            storyText.textContent = data.story || "لا توجد تفاصيل للقصة.";

            if (data.imageUrl) {
                storyImage.src = data.imageUrl;
                storyImage.style.display = 'block';
            } else {
                storyImage.style.display = 'none';
            }

            if (data.videoUrl) {
                const isYouTube = data.videoUrl.includes("youtube.com") || data.videoUrl.includes("youtu.be");

                if (isYouTube) {
                    let videoId = '';
                    if (data.videoUrl.includes("youtu.be")) {
                        videoId = data.videoUrl.split("youtu.be/")[1];
                    } else {
                        const urlParams = new URLSearchParams(new URL(data.videoUrl).search);
                        videoId = urlParams.get("v");
                    }

                    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    storyVideo.innerHTML = `
                        <iframe width="100%" height="315" src="${embedUrl}" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    `;
                } else {
                    storyVideo.innerHTML = `
                        <video controls width="100%" style="border-radius: 10px;">
                            <source src="${data.videoUrl}" type="video/mp4">
                            المتصفح لا يدعم تشغيل الفيديو.
                        </video>
                    `;
                }
                storyVideo.style.display = 'block';
            } else {
                storyVideo.innerHTML = '';
                storyVideo.style.display = 'none';
            }

            // أنيميشن الانتقال للشاشة الثانية
            gsap.to(contentDiv, {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    contentDiv.style.display = 'none';
                    storyContainer.style.display = 'block';
                    gsap.to(storyContainer, { opacity: 1, duration: 1.5 });
                    backButton.style.display = 'inline-block';
                }
            });
        })
        .catch(error => {
            console.error("Error fetching data from Firebase:", error);
            alert("حدث خطأ في تحميل القصة.");
        });
});

// ---- عند الضغط على "رجوع" ----
backButton.addEventListener('click', () => {
    gsap.to(storyContainer, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            storyContainer.style.display = 'none';
            contentDiv.style.display = 'block';
            gsap.to(contentDiv, { opacity: 1, duration: 1 });
            codeInput.value = '';
            storyImage.style.display = 'none';
            storyVideo.style.display = 'none';
            backButton.style.display = 'none';
            storyVideo.innerHTML = '';
            storyVideo.style.display = 'none';
        }
    });
});

const scrollContainer = document.querySelector('.content') || window;

scrollContainer.addEventListener('wheel', function (e) {
    // فقط إذا كنا في داخل .content
    if (e.target.closest('.content')) {
        e.preventDefault();
        scrollContainer.scrollBy({
            top: e.deltaY * 2,    // سرعة مضمّنة
            behavior: 'smooth'
        });
    }
}, { passive: false });

// ---- عند الضغط على زر Enter ----
codeInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();  // لمنع التصرف الافتراضي
        submitButton.click();    // محاكاة النقر على زر "إكتشف"
    }
});
