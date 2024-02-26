importScripts(
    "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
    "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

self.addEventListener("install", function (e) {
    self.skipWaiting();
});

self.addEventListener("activate", function (e) {
    console.log("fcm service worker가 실행되었습니다.");
});

const firebaseConfig = {
    apiKey: "AIzaSyCPRlsbgEi4bZ-c5w7BcrqoClbpCBB-DFo",
    authDomain: "idrop-44945.firebaseapp.com",
    projectId: "idrop-44945",
    storageBucket: "idrop-44945.appspot.com",
    messagingSenderId: "119228547531",
    appId: "1:119228547531:web:90023e8088c6b62a8ab64e",
    measurementId: "G-ZHTZ0F2M65"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("background", payload);
    const notificationTitle = payload.title;
    const notificationOptions = {
        body: payload.body
        // icon: payload.icon
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
