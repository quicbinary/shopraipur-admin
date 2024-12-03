"use client";
import { messaging } from "@/config/firebase";
import { useState } from "react";
import { getToken } from "firebase/messaging";

const PushNotification = () => {
  const [message, setMessage] = useState("");
  const [deviceToken, setDeviceToken] = useState("");

  // Fetch the FCM Token
  const fetchDeviceToken = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: "BHUvf_21-vIiddMCvtvYspELW5SCDyy9_29ODwnZWavTL9lnopt-4OXVwmJdncoB-YN6F3oyLhGqpo_T1jwRZiY ", // Replace with your Firebase VAPID key
        });

        if (token) {
          console.log("FCM Token:", token);
          setDeviceToken(token); // Store the token in state
        } else {
          console.error("No registration token available.");
        }
      } else {
        console.error("Notification permission not granted.");
      }
    } catch (error) {
      console.error("Error fetching device token:", error);
    }
  };

  const sendNotification = async () => {
    if (!message || !deviceToken) {
      console.error("Message or device token is missing.");
      return;
    }

    const notificationPayload = {
      notification: {
        title: "New Message",
        body: message,
      },
      to: deviceToken, // Use the dynamically fetched token
    };

    try {
      const response = await fetch(
        "https://fcm.googleapis.com/fcm/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `BHUvf_21-vIiddMCvtvYspELW5SCDyy9_29ODwnZWavTL9lnopt-4OXVwmJdncoB-YN6F3oyLhGqpo_T1jwRZiY `, // Replace with your Firebase server key
          },
          body: JSON.stringify(notificationPayload),
        }
      );

      const data = await response.json();
      console.log("Notification sent:", data);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchDeviceToken}>Get Device Token</button>
      <input
        type="text"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendNotification}>Send Notification</button>
    </div>
  );
};

export default PushNotification;
