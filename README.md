# Traveller WebApp

## Description

**Traveller WebApp** is a school project built using React with JSX, utilizing the Vite tool for development. This web application allows users to make reservations at a fictional hotel, write reviews, create accounts, and log into existing ones. All data is stored in a SQL database, managed by XAMPP.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository** (or download the project files).
   ```bash
   git clone https://github.com/MrDuck241/traveller-webapp.git

2. Install dependencies. Navigate to the project folder and run:
npm install

3. Build the project: After installing the dependencies, build the project using Vite:
npm run build

4. Set up the backend (XAMPP):

Make sure that XAMPP is installed and running on port 80.
Copy the contents of the dist/ folder to the xampp/htdocs/ directory.
Copy the php/ folder from @serverFiles@/ to the xampp/htdocs/ directory.
Also, copy the .htaccess file from @serverFiles@/ into xampp/htdocs/.

5. Database Configuration:

Ensure that XAMPP is running with MySQL and PHP.
Import the SQL database (located in the @serverFiles@/ folder) into phpMyAdmin or your MySQL client.

6. Access the Application: 

Once all the above steps are completed, open your browser and navigate to:
http://localhost:80