import axios from "axios";

const API = "http://localhost:5000/api";
const PUBLIC_VAPID_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);

  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export const registerPushNotifications = async (token) => {
  try {
    if (!("serviceWorker" in navigator)) {
      console.log("Service Worker not supported.");
      return;
    }

    if (!("PushManager" in window)) {
      console.log("Push API not supported.");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied.");
      return;
    }

    const registration = await navigator.serviceWorker.register(
      "/service-worker.js"
    );

    console.log("Service Worker Registered");

    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
      });
    }

    await axios.post(
      `${API}/push/subscribe`,
      {
        subscription,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Push subscription saved.");
  } catch (err) {
    console.error("Push Registration Error:", err);
  }
};