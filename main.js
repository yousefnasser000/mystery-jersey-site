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

submitButton.addEventListener('click', async () => {
    const code = codeInput.value.trim();

    if (!code) {
        alert('من فضلك أدخل كود القصة');
        return;
    }

    // إرسال الكود إلى API Notion
    try {
        const response = await fetch('/api/get-story', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code }),
        });

        const data = await response.json();

        if (response.ok) {
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
        } else {
            alert(data.message || 'حدث خطأ غير متوقع!');
        }
    } catch (error) {
        console.error(error);
        alert('حدث خطأ في الاتصال بالـ API');
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
