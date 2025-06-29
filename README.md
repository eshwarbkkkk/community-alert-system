# 🛡️ Community Alert System – Life-Saving Proximity-Based Emergency Platform

A smart community-driven emergency alert system built with Java and Spring Boot.  
Citizens can report incidents like medical emergencies, assaults, or accidents, and the system instantly notifies **nearby users** based on location — allowing help to arrive even before authorities do.

---

## 🚀 Features

- ✅ Raise emergency alerts with location and incident type
- 📍 Notify nearby users within a defined radius (using location matching)
- 👨‍⚕️ Role-based users: Citizens, Responders, Admins
- 🔐 User authentication and basic access control
- 🗺️ (Optional) Map integration for live location view
- ✉️ Notification via email / SMS (coming soon)
- 📊 Admin dashboard to view and manage alerts

---

## 🛠️ Tech Stack

- **Java 17+**
- **Spring Boot** (Web, JPA, Security)
- **MySQL** for database
- **HTML/CSS / Thymeleaf** or React (frontend optional)
- **Git + GitHub** for version control
- **Postman / Insomnia** for API testing

---

## 📂 Project Structure
community-alert-system/
├── src/
│ ├── main/
│ │ ├── java/com/safezone/community_alert_system/
│ │ │ ├── controller/
│ │ │ ├── model/
│ │ │ ├── repository/
│ │ │ └── service/
│ │ └── resources/
│ │ └── application.properties
├── pom.xml


---

## 🔧 How to Run

1. Clone the repo:
   ```bash
   git clone https://github.com/eshwarbkkkk/community-alert-system.git

2. Configure application.properties with your database and mail settings.

3. Run the project:
   mvn spring-boot:run

📸 Screenshots (coming soon...)

📌 Author
Eshwar  – https://github.com/eshwarbkkkk

💡 Future Enhancements
🔔 WebSocket/Real-time push alerts

🗺 Google Maps API for visual location alerts

📱 Mobile app (React Native or Flutter)

📊 Admin analytics dashboard

## ✅ Project Progress

- [x] Day 1: Project setup and GitHub integration
- [x] Day 2: Database schema and ER design
- [x] Day 3: Entity and repository layer complete
