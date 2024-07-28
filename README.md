ATS Application :: IMPULSE
This project consists of a backend API built with Node.js and Express, and a frontend application built with React. The purpose of the application is to compare text input with the text content of a PDF file, identify main keywords from the text input, and return the match percentage, which is useful for creating an Applicant Tracking System (ATS).

Table of Contents
Installation
Backend
Endpoints
Frontend
Usage
Screenshots
License
Installation
Prerequisites
Node.js and npm installed on your machine.
A modern web browser.
Backend
Clone the repository:

sh
Copy code
git clone https://github.com/yourusername/ats-api.git
cd ats-api
Install dependencies:

sh
Copy code
npm install
Start the server:

sh
Copy code
npm start
The server will start on http://localhost:4000.

Frontend
Navigate to the frontend directory:

sh
Copy code
cd frontend
Install dependencies:

sh
Copy code
npm install
Start the React application:

sh
Copy code
npm start
The application will start on http://localhost:3000.

Backend
The backend API is built with Node.js and Express. It provides endpoints to compare text input with the text content of a PDF file and returns the match percentage.

Endpoints
GET /: Welcome message for the ATS API.
POST /compare: Compares text input with the text content of a PDF file and returns the match percentage.
POST /compare
Request

textInput: String containing the text to be compared.
pdfFile: PDF file to compare the text input with.
Response

matchPercentage: Percentage of the text input that matches the text content of the PDF file.
Frontend
The frontend is built with React and provides a user interface to upload a PDF file and input text for comparison.

Components
CompareForm: The main form for uploading a PDF and inputting text for comparison.
Dashboard: Displays the result of the text comparison.
Usage
Start the backend server and the frontend application as described in the installation section.
Open http://localhost:3000 in your web browser.
Upload a PDF file and input the text you want to compare.
Click the "Scan" button to perform the comparison.
The match percentage will be displayed on the dashboard.
Screenshots
Main Screen

Dashboard

License
This project is licensed under the MIT License. See the LICENSE file for details.

Feel free to customize this README file according to your project needs. Make sure to update the repository URL and any other relevant information.
