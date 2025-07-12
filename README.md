# 🌍 🚨 Community Alert System with AI & Role-Based Access


A real-time, location-aware **disaster and emergency alert platform** built using Spring Boot, with optional AI-powered 
responses via OpenAI. Designed for public safety, this system connects citizens, responders, and admins for efficient 
crisis communication.

A full-stack **Community Alert System** built with **Spring Boot**, **JavaScript**, and integrated with **OpenAI**. This platform allows users to raise emergency alerts, notify nearby users, and get real-time AI suggestions for safety — all while enforcing **role-based access**.


---

## 🌟 Features

- 🆘 **Raise Emergency Alerts** (Fire, Medical, Assault, etc.)
- 📍 **Geolocation Tracking** with Maps (Leaflet.js + OpenStreetMap)
- 🔔 **Real-Time Notifications** to Nearby Users
- 🧠 **AI Safety Suggestions** (via OpenAI)
- 📬 **AI Chat Interface** for Further Queries
- 🗺️ **Map View** of Alerts & Notifications
- 🧑‍🤝‍🧑 **Role-Based Dashboard**:
  - **Citizen**: View alerts, map, and notifications
  - **Responder**: Can mark alert status
  - **Admin**: Can update/delete alerts & notifications
- 👤 **User Registration/Login** with Email/Phone
- 🔐 **Secure Role Handling**

---

---

## 🧑‍💻 Tech Stack

| Layer         | Technology                         |
|--------------|-------------------------------------|
| Backend       | Java, Spring Boot, REST API        |
| Frontend      | HTML, CSS, JavaScript              |
| Database      | MySQL                              |
| AI Integration| OpenRouter/OpenAI API              |
| Maps          | Leaflet.js, Geolocation API        |
| Version Control| Git, GitHub                       |

---
## 🚀 How It Works

### 1. 🔐 User Authentication
- User registers using email/phone
- Role assigned as `CITIZEN`, `RESPONDER`, or `ADMIN`

### 2. 📍 Raise Emergency Alert
- User clicks "Emergency" button or "Raise Alert"
- Current location is fetched
- Alert is saved and nearby users are notified

### 3. 🔔 Nearby Notifications
- System fetches users within a 5km radius
- They receive real-time notifications with alert location
- Map displays shortest path from user to alert

### 4. 🧠 AI Suggestions
- After alert submission, user gets suggestions via OpenAI
- Follow-up questions can be asked via chat
- Text-to-speech available for accessibility

---



## 📦 Project Structure


community-alert-system/
├── backend/
│ └── src/main/java/com/safezone/...
├── frontend/
│ ├── login.html
│ ├── alert.html
│ ├── ai.html
│ ├── notifications.html
│ ├── userDashboard.html
│ └── style.css

---

## 🔐 Role-Based Access

| Role       | View Alerts | Mark as Seen | Update Status | Delete Alert |
|------------|-------------|---------------|----------------|---------------|
| Citizen    | ✅           | ❌             | ❌              | ❌             |
| Responder  | ✅           | ✅             | ✅              | ❌             |
| Admin      | ✅           | ✅             | ✅              | ✅             |

---


## 📡 API Endpoints (Spring Boot)

| Method | Endpoint                      | Description                            |
|--------|-------------------------------|----------------------------------------|
| POST   | `/api/auth/login`            | Login with email/phone & password      |
| POST   | `/api/alerts`                | Submit a new alert                     |
| GET    | `/api/alerts/nearby`         | Fetch alerts near a location           |
| GET    | `/api/notifications/{id}`    | Get notifications for user             |
| PUT    | `/api/notifications/{id}/seen` | Mark a notification as seen          |
| GET    | `/api/ai/ask?question=...`   | Ask AI a disaster-related question     |

---
## ⚙️ Setup Instructions

1. **Clone the Repo**

2. Backend (Spring Boot)

   Import as Maven/Gradle project

    Configure application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/community_alert
spring.datasource.username=root
spring.datasource.password=yourpassword

openai.api.key=sk-or-xxxxxx
openai.api.url=https://openrouter.ai/api/v1/chat/completions

Run the application

./mvnw spring-boot:run
3. Frontend

Open the frontend/ folder and launch the login.html in browser.

📸 Demo Video link of Project:
https://drive.google.com/file/d/1gLcXizFHyPmjvhO6lt6bPHaeDACeHNCj/view?usp=sharing

  📸 Screenshots

Login page
    <img width="1563" height="913" alt="image" src="https://github.com/user-attachments/assets/d09562b4-53a9-434a-86f6-7962774f361f" />                                      
Alert page
    <img width="1570" height="942" alt="image" src="https://github.com/user-attachments/assets/e059d159-ef8f-44a8-b080-3e519c0b4186" />
Registration Page
    <img width="1707" height="941" alt="image" src="https://github.com/user-attachments/assets/68dda898-8797-4d54-98c8-451a6902442d" />
User Dashboard page
    <img width="1623" height="904" alt="image" src="https://github.com/user-attachments/assets/eb394faa-c2d7-4cc0-b2cd-aaca09d4a3a0" />
Notification Page
    <img width="1889" height="948" alt="image" src="https://github.com/user-attachments/assets/4a781cc3-7a46-48c2-b733-e4be546bb053" />
Ai Response Page
    <img width="1216" height="867" alt="image" src="https://github.com/user-attachments/assets/4ad57c5b-a039-4bd7-9d55-b89179d637da" />
All Alerts Page
    <img width="1540" height="939" alt="image" src="https://github.com/user-attachments/assets/3f84374c-1129-43b4-ba37-6b7c579000a9" />

📢 Future Improvements
OTP-based login

SMS notification integration

Real-time WebSocket alerts

Firebase push notifications



📌 Author
Eshwar  – https://github.com/eshwarbkkkk


⭐ Give it a Star!
If this project helped you or you learned something from it, consider giving it a ⭐ on GitHub!
  
```

