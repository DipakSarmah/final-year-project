# Project Management System for Tezpur University

This project management system is a digital solution developed specifically for the School of Engineering at Tezpur University. It aims to streamline the management and tracking of academic projects by leveraging the power of the MERN stack along with MySQL for database management. The system facilitates effective communication and collaboration among students, faculty, and administration.

## Abstract

Traditional offline project management systems often suffer from inefficient communication, delayed updates, and difficulty in tracking progress. Our digital solution overcomes these drawbacks by enhancing seamless communication and providing comprehensive oversight tools, thus streamlining the project management process and enhancing the educational experience.

## Features

### General Features
- Three user roles: Admin, Guide, and Student
- User registration and authentication with JWT
- Encrypted passwords using bcrypt for security
- Role-based redirection to specific dashboards

### Student Features
- View classmates and team details
- Set project preferences (leader only)
- Create teams with guidelines
- view appointments schedule by guide
- Access a centralized resource center

### Guide Features
- CRUD operations on students and projects within their department
- Manual project allocation to students
- Appointment scheduling and management
- Upload and manage resources for teams

### Admin Features
- Manage CRUD operations for students and project guides
- Oversee project details across all departments
- Handle team management task

## Technology Stack

### Frontend
- **HTML**
- **Tailwind CSS** for styling
- **React**: For building the user interface

### Backend
- **Node.js** with **Express.js**: Server-side logic
- **JSON Web Token (JWT)**: For user authentication
- **bcrypt**: For hashing passwords

### Database
- **MySQL**: Relational data storage
- **MySQL Workbench**: Database administration

### Development Tools
- **Visual Studio Code**: Code editing
- **Postman**: API development and testing
- **Git**: Version control, hosted on GitHub

## Installation and Setup



```
git clone https://github.com/DipakSarmah/final-year-project.git
cd backend
cd frontend
# install dependencies
npm install
# start the server
npm start
```


### Additional Notes:
- **Screenshots and Diagrams**:
![ER-diagram of Project management system(PMS)](https://github.com/DipakSarmah/final-year-project/assets/92313801/c15c0258-3c1e-4a5c-b106-b0a789767af1)

![DFD LEVEL 1](https://github.com/DipakSarmah/final-year-project/assets/92313801/fa9466e6-3b03-4610-9e85-f84e5a3f637a)

![DFD Level 2(a)](https://github.com/DipakSarmah/final-year-project/assets/92313801/e61a7551-2ed1-4994-8dca-48c71ea70e92)

![DFD Level 2(b)](https://github.com/DipakSarmah/final-year-project/assets/92313801/8d0669ff-f81f-4e3f-a5d8-b17c2ed3e4f4)

![Landing page pms-1](https://github.com/DipakSarmah/final-year-project/assets/92313801/f8f0c04a-aac4-40ff-a297-e2a792113fea)

![Login Page pms-2](https://github.com/DipakSarmah/final-year-project/assets/92313801/4371f091-4a80-4618-8572-9b7842e5c695)

![Registration pms-3](https://github.com/DipakSarmah/final-year-project/assets/92313801/b054dcf7-c2e0-46a3-8e58-1c0d2552f78c)

![student page pms-4](https://github.com/DipakSarmah/final-year-project/assets/92313801/4c0f3ed4-d881-4378-b55e-1a3988d926db)

![Team Details pms-5](https://github.com/DipakSarmah/final-year-project/assets/92313801/73ea8247-548d-4bc6-8eed-3506e683f8c5)

![Project Preference pms-6](https://github.com/DipakSarmah/final-year-project/assets/92313801/c4a919c2-4b8f-4de3-99f2-08b57dde1ac4)

![List of Classmates pms-7](https://github.com/DipakSarmah/final-year-project/assets/92313801/07c1ad89-92a6-40c2-9121-16935e5abc94)

![Guide Dashboard pms-9](https://github.com/DipakSarmah/final-year-project/assets/92313801/b092fd34-cbac-4eaa-a658-739700679fe6)

![G_Student management pms-10](https://github.com/DipakSarmah/final-year-project/assets/92313801/4508858f-ff57-4ede-8788-2945498ccfc6)

![Add Student pms-11](https://github.com/DipakSarmah/final-year-project/assets/92313801/7a537943-1098-4413-92f9-2ca8024927e9)

![Remove student details pms-12](https://github.com/DipakSarmah/final-year-project/assets/92313801/403b75ff-45e3-4ab7-8b01-6d74c5309899)

![Project Details Management pms-13](https://github.com/DipakSarmah/final-year-project/assets/92313801/22f6c3e1-98cc-43b6-b495-b145ed3f2365)

![Add Projeect Details pms-14](https://github.com/DipakSarmah/final-year-project/assets/92313801/6c65d0a5-885c-4168-aa93-deeaf8ee5a8d)

![Team Management pms-15](https://github.com/DipakSarmah/final-year-project/assets/92313801/582308c2-a8b8-4941-b8ff-99632121d00c)

![Appointment scheduling pms-16](https://github.com/DipakSarmah/final-year-project/assets/92313801/66f2b5a1-c9da-4e96-866e-e67822d55f08)

![Appointment Details pms-17](https://github.com/DipakSarmah/final-year-project/assets/92313801/a091f5cd-251f-46fa-801d-5656cdd566aa)

![Resource center pms-18](https://github.com/DipakSarmah/final-year-project/assets/92313801/d9304ab1-432f-4fb9-8b09-42d1e7de9911)

![Admin Dashboard pms-19](https://github.com/DipakSarmah/final-year-project/assets/92313801/76617392-a6e1-4a8d-bdd6-65ced0bcd51f)

![Guide Management pms-20](https://github.com/DipakSarmah/final-year-project/assets/92313801/80ed3a0b-bb39-4ac5-be7d-66109f734e08)

![Update Guide Details pms-21](https://github.com/DipakSarmah/final-year-project/assets/92313801/eefda4eb-ecc4-48a4-8d8a-232ee7575a3b)

![Create Guides pms-22](https://github.com/DipakSarmah/final-year-project/assets/92313801/f894a01d-d0db-43c1-91e7-6c7bba40a550)








