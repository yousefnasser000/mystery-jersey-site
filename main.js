// استيراد الأشياء اللي جهزناها من firebase.js
import { database, ref, get, child } from "./firebase.js";

// عناصر الصفحة
const codeInput = document.getElementById("codeInput");
const submitButton = document.getElementById("submitButton");
const content = document.getElementById("content");
const storyContainer = document.getElementById("storyContainer");
const storyTitle = document.getElementById("storyTitle");
const storyText = document.getElementById("storyText");
const storyImage = document.getElementById("storyImage");
const storyVideo = document.getElementById("storyVideo");
const videoSource = document.getElementById("videoSource");
const backButton = document.getElementById("backButton");

// الضغط على زر تأكيد الكود
submitButton.addEventListener("click", async () => {
    const code = codeInput.value.trim().toUpperCase();
    if (!code) {
        alert("الرجاء إدخال كود.");
        return;
    }

    try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, `stories/${code}`));

        if (snapshot.exists()) {
            const data = snapshot.val();

            // عرض العنوان
            storyTitle.textContent = data.title || "قصة بدون عنوان";

            // عرض نص القصة لو موجود
            if (data.story) {
                storyText.textContent = data.story;
            } else {
                storyText.textContent = "";
            }

            // عرض الصورة لو موجودة
            if (data.imageUrl) {
                storyImage.src = data.imageUrl;
                storyImage.style.display = "block";
            } else {
                storyImage.style.display = "none";
            }

            // عرض الفيديو لو موجود
            if (data.videoUrl) {
                videoSource.src = data.videoUrl;
                storyVideo.load();
                storyVideo.style.display = "block";
            } else {
                storyVideo.style.display = "none";
            }

            content.style.display = "none";
            storyContainer.style.display = "block";
        } else {
            alert("الكود غير صحيح أو لا توجد قصة مرتبطة به.");
        }
    } catch (error) {
        console.error(error);
        alert("حدث خطأ أثناء جلب البيانات. حاول مرة أخرى.");
    }
});

// زر الرجوع
backButton.addEventListener("click", () => {
    content.style.display = "block";
    storyContainer.style.display = "none";
});
