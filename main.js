const submitButton = document.getElementById('submitButton');
const codeInput = document.getElementById('codeInput');
const storyContainer = document.getElementById('storyContainer');
const storyTitle = document.getElementById('storyTitle');
const storyText = document.getElementById('storyText');
const backButton = document.getElementById('backButton');
const storyImage = document.getElementById('storyImage');
const storyVideo = document.getElementById('storyVideo');
const videoSource = document.getElementById('videoSource');

// إعداد الأنيميشن عند تحميل الصفحة
gsap.to("#content", { opacity: 1, duration: 2 });
gsap.to("h1", { opacity: 1, y: -20, duration: 1.5, delay: 0.5 });
gsap.to("p", { opacity: 1, y: -20, duration: 1.5, delay: 1 });
gsap.to(".input-container", { opacity: 1, y: 20, duration: 1.5, delay: 1.5 });
gsap.to(".social-buttons", { opacity: 1, y: 20, duration: 1.5, delay: 2 });

// التعامل مع الضغط على زر "إرسال"
submitButton.addEventListener('click', () => {
    const code = codeInput.value.trim();

    if (!code) {
        alert('من فضلك أدخل كود القصة');
        return;
    }

    // هنا يمكنك استخدام كود تجريبي لعرض بيانات القصة فقط بشكل ثابت
    // على سبيل المثال، يمكنك تعيين بيانات ثابتة هنا لاختبار واجهتك:
    const data = {
        title: "عنوان القصة",
        story: "هذه هي القصة الخاصة بك، استمتع بها!",
        imageUrl: "https://via.placeholder.com/300", // صورة تجريبية
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // فيديو تجريبي
    };

    // عرض القصة
    storyTitle.textContent = data.title;
    storyText.textContent = data.story;
    storyImage.src = data.imageUrl || ''; // إذا كان هناك صورة
    storyImage.style.display = data.imageUrl ? 'block' : 'none';
    videoSource.src = data.videoUrl || ''; // إذا كان هناك فيديو
    storyVideo.load();
    storyVideo.style.display = data.videoUrl ? 'block' : 'none';

    // إخفاء الصفحة الأصلية وعرض القصة
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
});

// التعامل مع الضغط على زر العودة
backButton.addEventListener('click', () => {
    storyContainer.style.display = 'none';
    document.getElementById('content').style.display = 'block';
    codeInput.value = '';
    storyImage.style.display = 'none';
    storyVideo.style.display = 'none';
    gsap.to("#content", { opacity: 1, duration: 1 });
});
