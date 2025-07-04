# 🌍 Community Alert System 🔔

A real-time, location-aware **disaster and emergency alert platform** built using Spring Boot, with optional AI-powered 
responses via OpenAI. Designed for public safety, this system connects citizens, responders, and admins for efficient 
crisis communication.

---

## 🚀 Features

- 📌 **Location-Based Alerts** — Get alerts within 5 km radius.
- 🧠 **AI-Powered Recommendations** — Ask safety questions using OpenRouter AI.
- 👤 **Role-Based Users** — Citizens, Responders, Admins.
- 🔄 **Alert Status Updates** — Track alert statuses: `OPEN`, `RESOLVED`, `IGNORED`.
- 📂 **Category Filtering** — Filter alerts by `Fire`, `Flood`, `Medical`, etc.
- 🔒 **User Management** — Register, update, and delete user profiles.
- 🌐 **REST API Ready** — Integrates easily with frontend frameworks like React.

---

## 🛠️ Tech Stack

- **Backend**: Java 21, Spring Boot 3, Spring Data JPA
- **Database**: MySQL
- **AI Integration**: OpenRouter/OpenAI API
- **Build Tool**: Maven
- **API Documentation**: Swagger 

---

## 📦 Project Structure


community-alert-system/
│
├── model/ # JPA Entities (User, Alert, etc.)
├── controller/ # REST API endpoints
├── service/ # Business logic layer
├── repository/ # Spring Data JPA Repositories
├── dto/ # DTOs for request/response
├── config/ # Configuration classes (API Keys etc.)
├── exception/ # Global & Custom Exception Handling
└── resources/
├── application.properties
└── data.sql (optional)

---

## 🔗 Important Endpoints (Swagger)
GET /api/alerts — Get all alerts
GET /api/alerts/nearby — Get alerts near a location
GET /api/alerts/category — Filter alerts by category
GET /api/alerts?status=OPEN — Filter by status
POST /api/alerts — Create a new alert
PUT /api/alerts/{id}/status — Update status
DELETE /api/alerts/{id} — Delete alert
GET /api/ai/ask?question=... — Ask disaster-related question to AI


---

## 💡 How AI Works

The system connects to OpenAI-compatible API (like OpenRouter) using `RestTemplate`. You can ask safety-related questions like:
> "What to do during a flood?"

The AI responds based on the latest safety knowledge.

---

## 🧪 Sample Prompt for AI

> **User:** What precautions should I take during an earthquake?

> **AI:** Drop, Cover, and Hold On. Avoid windows. Stay indoors until the shaking stops...

---



## 👨‍💻 How to Run

```bash

./mvnw spring-boot:run 
  ///or//
mvn spring-boot:run

🔑 Configure API Key
Before running the project, make sure to set your OpenAI or OpenRouter API key in 
src/main/resources/application.properties:
openai.api.key=sk-your-api-key-here
openai.api.url=https://openrouter.ai/api/v1/chat/completions

📌 TODO (Future Scope)
Add real-time WebSocket alerts 🔴

SMS/Email Notifications

React.js frontend dashboard

Admin panel for alert monitoring

## 👥 Contributing

If you'd like to contribute, please fork the repo, create a new branch, make your changes, and open a pull request. You can also request access as a collaborator.


📌 Author
Eshwar  – https://github.com/eshwarbkkkk

