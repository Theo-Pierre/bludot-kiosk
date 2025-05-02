// Firebase imports via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7vHIXA5hy1HHrpprP_GL6ND17c5QQUPc",
  authDomain: "bludotkiosk.firebaseapp.com",
  projectId: "bludotkiosk",
  storageBucket: "bludotkiosk.firebasestorage.app",
  messagingSenderId: "831602192236",
  appId: "1:831602192236:web:38b946c5e3fd0570ac8d49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// DOM elements
const videoPlayer = document.getElementById("videoPlayer");
const videoGallery = document.getElementById("videoGallery");
const status = document.getElementById("status");

// Load all .mp4 videos from the "videos/" folder in Firebase Storage
const videoRef = ref(storage, 'videos/');

listAll(videoRef)
  .then((res) => {
    if (res.items.length === 0) {
      status.textContent = "No videos found.";
      return;
    }

    videoGallery.innerHTML = "";
    res.items.forEach((itemRef, index) => {
      getDownloadURL(itemRef).then((url) => {
        const video = document.createElement('video');
        video.src = url;
        video.controls = true;
        video.width = 640;

        // Set the first video to be the main player
        if (index === 0) {
          videoPlayer.src = url;
          status.textContent = "Now playing the latest video...";
        }

        // Add videos to the gallery
        videoGallery.appendChild(video);
      });
    });
  })
  .catch((error) => {
    console.error("Error loading videos:", error);
    status.textContent = "Failed to load videos.";
  });