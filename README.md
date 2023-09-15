## Project Name: Website tim kiem viec lam tren toan quoc

## Link source backend: (https://github.com/sybuivan/tim-kiem-viec-lam-backend).
## Link deploy frontend: (https://tim-kiem-viec-lam-frontend.vercel.app/).
   ## Link admin: (https://tim-kiem-viec-lam-frontend.vercel.app/auth/admin/login)
   ## Info account:
      - company: 
         + email: nguyenhoaiduc@gmail.com
         + password: admin@danateq.vn
      - admin
         + email: admin123@gmail.com
         + password: admin@danateq.vn
      - user
         + email: sybuivan1429@gmail.com
         + password: admin@danateq.vn
## Description:

The website provides various features for job seekers, including the ability to create an account and log in, save job listings, follow or unfollow employers, submit job applications, communicate with employers via messaging, and receive notifications from employers. These features make it easy for job seekers to stay updated on job opportunities and connect with potential employers.

## Technologies Used:

Front-end: React(Typescript), Redux-toolkit, Material UI, socket.io.
Back-end: NodeJS, Express.js, MySQL, socket.io.

## Features:

# 1.For Guests:

- View general information about the website
- Browse job postings
- Learn about companies

# 2.For Registered Users:

- Create an account and log in
- Save job listings
- Follow or unfollow employers
- Submit job applications
- Communicate with employers via messaging
- Update personal profile.
- Update personal CV.
- Receive notifications from employers

# 3.For Employers:

- Create an account and log in
- Post job listings
- Manage job postings
- View candidate resumes
- Communicate with candidates via messaging
- Purchase priority job posting packages

# 4.For System Administrators:

- Access to all user accounts
- Approve employer registration requests
- Manage user and job posting statistics
- Resolve technical issues
- Setting system

## Installation

## Front end

1. Clone the repository:
   <code>git clone https://github.com/sybuivan/tim-kiem-viec-lam-frontend</code>
2. Clone the repository:
   <code>cd tim-kiem-viec-lam-frontend</code>
3. Install the dependencies:
   <code>Yarn or npm install</code>
4. Config env
   <code>
   Change file .env
   REACT_APP_NODE_ENV= development
   </code>
5. Start the application:
   <code>Yarn start or npm start</code>

   The application will run at (https://localhost:3000)

## Backend

6. Install source backend
   <code>git clone https://github.com/sybuivan/tim-kiem-viec-lam-backend</code>
7. Clone the repository:
   <code>cd tim-kiem-viec-lam-backend</code>
8. Download file db_tim-kiem-viec-lam.sql.
   <code>https://drive.google.com/file/d/1vrp5-qDYZHlVx1IN9vOaQJaJNGLCudNL/view?usp=sharing</code>
9. Using SQL in XAMPP
   <code>

   - Open a web browser and navigate to http://localhost/phpmyadmin.
   - On the MySQL database management interface (phpMyAdmin), click on the "Database" tab.
   - Enter the new database name as "db_tim-kiem-viec-lam" in the "Create database" field.
   - Click on the "Create" button to create the new database.
   - import database
     </code>

10. Config env
    <code>
    Change file .env
    NODEJS_APP_NODE_ENV= development
    </code>

11. Start server:
    <code>
    npm run dev
    </code>

## Demo

 <p>
   <strong>Người dùng:</strong>

   <img src="https://i.imgur.com/3nj9qYM.jpg" width = "1000"/>
   <img src="https://i.imgur.com/3RbRRkZ.jpg" width = "1000"/>
   <img src="https://i.imgur.com/bFn6wuj.jpg" width = "1000"/>
   <hr>
   <img src="https://i.imgur.com/bmpcrLo.jpg" width = "1000"/>
   <hr>
   <img src="https://i.imgur.com/K6tI53q.jpg" width = "1000"/>
  <hr>
   <img src="https://i.imgur.com/N9tDEhO.jpg" width = "1000"/>
   <hr>
   <img src="https://i.imgur.com/ApAf50w.jpg" width = "1000"/>
  <hr>
   <img src="https://i.imgur.com/SlNmwPN.jpg" width = "1000"/>
  <hr>
   <img src="https://i.imgur.com/eQSgUJB.jpg" width = "1000"/>
   <img src="https://i.imgur.com/NDzIhkw.jpg" width = "1000"/>
  <hr>

   <img src="https://i.imgur.com/mS6QfR7.jpg" width = "1000"/>
   <hr>

   <img src="https://i.imgur.com/xtLdOPw.jpg" width = "1000"/>

<strong>Nhà tuyển dụng:</strong>  
 <img src="https://i.imgur.com/EJoKGHj.jpg" width = "1000"/>
<img src="https://i.imgur.com/nEFdJwd.jpg" width = "1000"/>
<img src="https://i.imgur.com/bQp9KGS.jpg" width = "1000"/>
<img src="https://i.imgur.com/ZMwb6mA.jpg" width = "1000"/>
<img src="https://i.imgur.com/YpIJekA.jpg" width = "1000"/>
<img src="https://i.imgur.com/ITSFy1O.jpg" width = "1000"/>
<img src="https://i.imgur.com/OOs1Vwt.jpg" width = "1000"/>
<img src="https://i.imgur.com/AUut4m2.jpg" width = "1000"/>

</p>
