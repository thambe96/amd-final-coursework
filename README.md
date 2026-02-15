# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


# 📚 Extesi-Lifter
**Elevate Your Knowledge.**

Extesi-Lifter is a high-performance mobile flashcard application designed for students and life-long learners. Built with **React Native (Expo)**, **Firebase**, and **NativeWind**, it provides a seamless, intuitive experience for creating and mastering study sets with fluid 3D animations and real-time synchronization.

---

## ✨ Features

* **Secure Authentication:** User-friendly Login and Registration flow powered by Firebase Auth.
* **Intuitive Study Mode:** Interactive 3D flip-card mechanic using React Native Reanimated.
* **Real-time Data:** Sync your exam categories and flashcard sets across devices instantly via Firestore.
* **Modern UI/UX:** A clean, "indigo-theme" interface designed with Tailwind CSS (NativeWind) for maximum scannability and focus.
* **Progress Tracking:** Visual progress bars to keep you motivated during study sessions.

---

## 🛠️ Tech Stack

* **Framework:** [Expo](https://expo.dev/) (React Native)
* **Styling:** [NativeWind](https://www.nativewind.dev/) (Tailwind CSS)
* **Database & Auth:** [Firebase](https://firebase.google.com/) (Firestore & Auth)
* **Animations:** [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
* **Icons:** [Ionicons](https://ionic.io/icons) via `@expo/vector-icons`

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** installed on your machine.
* An **Expo account**.
* The **Expo Go** app installed on your physical device (iOS or Android).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/extesi-lifter.git](https://github.com/your-username/extesi-lifter.git)
    cd extesi-lifter
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Firebase:**
    * Create a project in the [Firebase Console](https://console.firebase.google.com/).
    * Add a **Web App** to your project and copy your configuration object.
    * Create a `services/firebase.js` (or `.ts`) file in your project.
    * Initialize your app using your credentials:
    
    ```javascript
    // Example services/firebase.js
    import { initializeApp } from "firebase/app";
    // ... add your config here
    ```

4.  **Start the development server:**
    ```bash
    npx expo start -c
    ```

---

## 📱 Usage
* Open the **Expo Go** app on your phone.
* Scan the QR code displayed in your terminal.
* Log in or Register to start "lifting" your knowledge!

