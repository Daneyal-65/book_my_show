# **BookMyShow Movie Booking Website**

## **Project Overview**

The **BookMyShow Movie Booking Website** is a capstone project integrating key concepts of Full Stack Web Development. This project demonstrates proficiency in both front-end and back-end development by creating a movie booking system similar to the BookMyShow platform. The website allows users to book movie tickets online, and the project follows a structured, hands-on approach to ensure holistic learning.

## **Key Objectives**

1. **Team Collaboration**  
   Effective collaboration allows team members to pool different skills and knowledge to solve project challenges.
   
2. **Hands-on Work Experience**  
   By building a real-world project, learners will gain practical experience crucial for professional development.

3. **Holistic Understanding**  
   This project ensures mastery of Full Stack Web Development concepts through a comprehensive learning process.

## **Project Features**

1. **Backend Server**  
   The backend is built using **Express.js** and listens on port `8080`. It includes two endpoints for handling movie bookings:
   - **POST** `/api/booking`: Allows users to make a movie booking.
   - **GET** `/api/booking`: Retrieves the last movie booking details.
   
2. **Frontend Server**  
   The frontend is built using **React.js** and runs on port `3000`. It allows users to view available movies, choose a time slot, and book tickets by selecting seat types.

3. **Database Server**  
   The database stores booking details and connects via **mongoDB Atlas**. It uses a schema to ensure proper data storage.

## **Endpoints**

1. **POST** `/api/booking`
   - Request Body: 
     ```json
     {
       "movie": "Movie Name",
       "seats": { "A1": 2, "A2": 3, "D2": 1 },
       "slot": "10:00 AM"
     }
     ```
   - Response: Status `200` on successful booking.

2. **GET** `/api/booking`
   - Response: Retrieves the last booking with movie name, seat types, and time slot:
     ```json
     {
       "movie": "Last Movie Name",
       "seats": { "A1": 2, "A2": 3, "D2": 1 },
       "slot": "10:00 AM"
     }
     ```

## **Frontend Requirements**

1. **Movies, Slots, and Seats**  
   The client displays a list of movies, slots, and seat types, allowing users to make their selection. After submitting the booking, previous booking details are displayed.
   
2. **Form Handling**  
   Input fields are provided for seat types, and selection is persisted using `localStorage` to prevent loss of data on page reload.

3. **Submit Button**  
   A submit button initiates the booking process. On successful booking, the details are cleared, and the last booking is displayed without making an extra GET request.

## **Technology Stack**

- **Frontend:** React.js
- **Backend:** Express.js
- **Database:** mongodb Atlas
- **LocalStorage:** Used for temporary storage of booking selections.

## **Setup Instructions**
 **clone the repo:**
 - copy this:
     ```bash
     git clone https://github.com/Daneyal-65/book_my_show_server.git
     ```  
1. **Backend:**
   - Install the necessary modules:  
     ```bash
     npm install
     ```  
     in the backend folder.
   - Run the backend server:  
     ```bash
     npm start
     ```

2. **Frontend:**
    **clone the repo:**
 - copy this:
     ```bash
     git clone https://github.com/Daneyal-65/bookmyshow_client.git
     ``` 
   - Install the necessary modules:  
     ```bash
     npm install
     ```  
     in the frontend folder.
   - Run the frontend server:  
     ```bash
     npm start
     ```

5. **Database:**
   - Use the `connection.js` file to connect to the database.
   - Follow the `Schema.js` file for data structure.

## **UI Design**

The frontend interface allows users to select movies, slots, and seats, and submit their booking with a user-friendly UI.
