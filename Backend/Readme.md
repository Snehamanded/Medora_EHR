# Medora EHR Backend

A robust **Electronic Health Record (EHR) backend** built with **Node.js**, **Sequelize**, and **Express.js**, supporting JWT authentication, role-based access, FCM notifications, real-time WebRTC calls, NLP insights via Gemini/BioBERT, and payment integrations with Razorpay and PhonePe.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Modules](#modules)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running with Docker](#running-with-docker)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Notifications](#notifications)
- [WebRTC Calls](#webrtc--calls)
- [Payments](#payments)
- [NLP Integration](#nlp-integration)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- JWT-based authentication and role-based permissions (fine-grained ACL)
- Google Sign-In and OTP-based authentication
- Session tracking and activity logs
- Multi-Factor Authentication (optional)
- CRUD APIs for Patients, Doctors, Appointments, Billing, Insurance, Labs, Prescriptions, and more
- Push notifications via Firebase Cloud Messaging
- File uploads with S3 integration
- Real-time audio/video calls (WebRTC or )
- Payment integration: Razorpay & PhonePe (single & subscription)
- NLP insights via Gemini & BioBERT

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL (via Sequelize ORM)
- **Authentication:** JWT, OAuth2 (Google Sign-In), OTP via WhatsApp
- **Notifications:** Firebase Cloud Messaging
- **File Storage:** AWS S3
- **Real-Time Communication:** WebRTC / 
- **NLP / AI:** Gemini, BioBERT via HuggingFace
- **Payments:** Razorpay, PhonePe
- **Containerization:** Docker

---

## System Architecture

```

Android/iOS Client
│
▼
Express.js Backend
│
┌────────────┐
│ Sequelize  │
│  Models    │
└────────────┘
│
▼
MySQL/PostgreSQL DB
│
┌─────────────┐
│ AWS S3      │
│ File Storage│
└─────────────┘
│
┌─────────────┐
│ FCM         │
│ Notifications│
└─────────────┘
│
┌─────────────┐
│ Gemini/BioBERT│
│ NLP Insights │
└─────────────┘

````

---

## Modules

| Module                  | Description |
|-------------------------|-------------|
| Users                   | Authentication, role-based access, MFA |
| Patients                | Patient CRUD, medical records |
| Doctors                 | Doctor CRUD, availability |
| Appointments            | Booking, status tracking |
| Billing & Payments      | Invoices, Razorpay, PhonePe |
| Insurance               | Records, policies, renewals |
| Lab Orders              | Tests, results, doctor access |
| Prescriptions           | Creation and access by doctors/staff |
| Notifications           | FCM push notifications |
| WebRTC/ Calls      | Audio/video consultations |
| NLP Insights            | Send text/file to Gemini/BioBERT for actionable insights |
| Activity Logs           | Track user actions and sessions |
| Admin                   | Admin operations, statistics, announcements |

---

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/your-org/medora-ehr.git
cd medora-ehr
````

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file**

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=medora
DB_DIALECT=mysql

JWT_SECRET=your_super_secret_key
JWT_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_secret

AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_S3_BUCKET=medora-files

FIREBASE_SERVER_KEY=xxx

RAZORPAY_KEY_ID=xxx
RAZORPAY_KEY_SECRET=xxx
PHONEPE_MERCHANT_ID=xxx
```

4. **Run migrations / seeders** (if any)

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

5. **Start the server**

```bash
npm start
```

---

## Running with Docker

```bash
docker build -t medora-ehr .
docker run -p 3000:3000 --env-file .env medora-ehr
```

Optionally, use **docker-compose** for DB + Redis + backend stack.

---

## API Documentation

* Base URL: `{{host}}` (`http://localhost:3000/api`)
* **v1 routes:** `/api/v1/...`
* Each route has full CRUD endpoints for models:

  * `POST /add`
  * `GET /list`
  * `GET /list/:id`
  * `PUT /update/:id`
  * `DELETE /delete/:id`
* Examples and body schema are defined in the Postman collection.

---

## Authentication

* **Signup / User creation:** `/api/v1/user/add`
* **Sign-in:** JWT Bearer token returned
* **Token refresh:** Automatic on login / request
* **Google Sign-In & WhatsApp OTP**
* **Role-based access:** Verified using `auth.middleware.js`
* **Forgot / Reset password:** Email with nodemailer

---

## Notifications

* FCM middleware supports:

  * **Single notification**
  * **Bulk notifications**
  * **Saving device tokens** for Android/iOS/Web
* Call `fcm.middleware.js` from any controller

---

## WebRTC /  Calls

* Create audio/video calls using `/api/v1/call/add`
* Call type: audio / video
* /WebRTC URL generation handled via `webrtc.middleware.js`
* Options to mute/unmute audio and video per call

---

## Payments

* Razorpay and PhonePe single payments & subscriptions supported
* Webhooks integrated for subscription updates
* Call `payments.middleware.js` from payment controller

---

## NLP Integration

* **Gemini:** Send text or file; returns actionable insights
* **BioBERT:** Text-based NLP classification
* File upload handled via `s3.middleware.js` before sending to Gemini

---

## Security & Logging

* JWT auth for all routes except user creation/login
* Session tracking and activity logs
* Optional MFA (high-security accounts)
* Role-based ACL checks for each model

---

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

---

## License

MIT License © 2025 Medora Health

---

## Notes

* All environment secrets should be stored securely (AWS Secrets Manager or Docker secrets)
* Use **Postman collection** provided for all API testing
* Follow **alphabetical folder structure** for controllers and models for maintainability
