# Application Features and Functionality

1. **Sign Up**
   - Enter name, university, year of study, spoken languages
   - Upload profile picture
   - Set username and password
   - If signing up as a tutor, upload transcript, personal bio, and take a short AI-powered interview

2. **Homepage**
   - View list of all tutors with the same language preferenses of the user
     
3. **Search for Tutors on Homepage**
   - Search for tutors based on course codes
     
4. **Filter Tutors on Homepage**
   - Narrow search by adding filters for hourly rate and rating of tutors

5. **Tutor Profile Settings**
   - Tutors can update their available times, and all other info (GPA, hourly rate, etc)

6. **Chat**
   - Send messages, view chat history, send images/upload files

7. **Voice/Video Call**
   - All users can voice/video call, and share screen when on call

8. **Tutor Rating**
   - Students can view tutor profiles and rate them and leave comments for feedback

9. **Booking Appointment with Tutor**
   - Students can view a calendar with the times that the tutor is available
   - Students can send an appointment request to the tutor, specifying the course they need help with, the type of help, the specific day and time range
   - Tutors can see a list of appointment requests and accept/decline each request

8. **Recording and AI Summary**
   - Users can record sessions with tutors and later view the recording along with an AI-summary transcript of the session


# User Stories

#### Signup
1. As a new user, I would like to enter my name, university, and user type (student or tutor), so that I can create an account.
   - Acceptance criteria: Given the user is signing up for a new account, when they click “sign up”, then they should be taken to a screen to input their full name, university, and select their user type (student or tutor).
   - Priority: High
2. As a user, I would like to input the languages I am comfortable speaking, so that I can communicate directly with other students or tutors who speak my language.  
   - Acceptance criteria: Given the user is signing up for a new account, when the user clicks “select languages”, then they should be able to choose their preferred language(s).
   - Priority: High
4. As a tutor, I would like to upload my transcript to be verified, so that I can be a tutor for that course.
   - Acceptance criteria: Given the user is signing up for a new account as a tutor, when the user is on the “Upload Your Documents” screen, they should be able to upload their transcript via the upload button.
   - Priority: High
5. As a user, I would like to upload an image of myself, so that others can recognize me and feel more connected during our interactions.
   - Acceptance criteria: Given the user is signing up for a new account and is on the “Set Up Your Account” page, when the user clicks on the upload image icon, then they should be able to upload their image.
   - Priority: High
6. As a tutor, I would like to select the courses I would like to teach, so that I can offer my expertise in subjects I am knowledgeable about and enjoy teaching.
   - Acceptance criteria: Given the tutor is signing up for a new account as a tutor, when the user is asked “What courses are you available to teach?”, then they should be able to type in the courses.
   - Priority: High
7. As a user, I would like to input my credentials (email and password), so that I can log in to my account.
   - Acceptance criteria: Given the user is on the login screen, when they input their username and password and click “login”, then they should be directed to the homepage.
   - Priority: High

#### Homepage
8. As a user I would like to view all the tutors avaiable in my language on the homepage, so that I can explore and discover tutors that meed my needs and requirements
   - Acceptance criteria: Given the user has created, when they log in to their account they should be able to view all avaibale tutors on the homepage of the application.
   - Priority: High

#### Finding a Tutor
9. As a student, I would like to search for the courses I need help with on the home page, so that I can find a tutor that matches my needs.
   - Acceptance criteria: Given the student is on the home page, when they input a course code, they should be able to select the course and then tutors who teach that course should appear.
   - Priority: High
10. As a student, I would like to filter my search based on hourly rate, so that I can find a tutor within my budget.
   - Acceptance criteria: Given the student is on the home page, when they click on the filter button and select a price sorting, then the tutors should be listed in order of low to high (or high to low given what the student chose).
   - Priority: Low
11. As a student, I would like to filter my search based on tutor rating, so that I receive the most qualified tutor.
    - Acceptance criteria: Given the student is on the home page, when they click on the filter button and check the rating sorting, then the tutors should be listed in order of high to low.
    - Priority: Low

#### Chat
12. As a user, I would like to be able to send a private message to any other user, so that I can ask my questions/respond to any question.
    - Acceptance criteria: Given the user is on the chats page, when they select a person, then they should be able to send that person a message and see their message history.
    - Priority: High
13. As a user, I would like to be able to send images and files via the chat, so that I can share any necessary documents needed for the tutoring session.
    - Acceptance criteria: Given the user is on the chats page and has a direct message open, when they click on the image upload button, then they should be able to select an image or file to upload.
    - Priority: Medium

#### Voice/Video Call
14. As a student, I would like to start a voice/video call with my tutor, so that we can have a live, interactive tutoring session.
    - Acceptance criteria: Given the student is on the chats page and has a direct message open, when they click on the call button, then they should start a video/voice call with the other user.
    - Priority: High
15. As a student, I would like to record tutoring sessions, so that I can re-watch them on my own time whenever I need to.
    - Acceptance criteria: Given the student is on a call screen, when they click the recording button, then their call should start being recorded.
    - Priority: Medium
16. As a student, I would like to view a list of my recordings on the ‘Recordings’ tab so that I can look back at any content that I require.
    - Acceptance criteria: Given the student is logged into the app, when they click the recording tab, they should be directed to a page with a list of all their past recordings.
    - Priority: Medium
17. As a student, I would like to be able to read an auto-generated summary/transcription of the contents of the recorded online sessions, so that I quickly skim through the material.
    - Acceptance criteria: Given the student is viewing a past recording, when they scroll down, they should see a transcription and summary of what is said in the recording.
    - Priority: Low
18. As a user, I would like to share my screen during tutoring sessions, so that answers to questions can be more personalized.
    - Acceptance criteria: Given the user is on a call screen, when they click the screenshare button, then their display should start being shown on the call screen.
    - Priority: High
19. As a tutor, I would like to utilize a whiteboard during tutoring sessions, so that I can provide in-depth visual explanations to student questions.
    - Acceptance criteria: Given the user is on a call screen, when they click open whiteboard tab, they should be able to access a screen to draw and write on.
    - Priority: Low

#### Book Appointments with Tutor
20. As a student, I would like to see a calendar of times that a selected tutor is available at, so that I can book a session at a time that suits my schedule.
    - Acceptance criteria: Given the student is viewing a tutor’s profile, when they click on the “Hours Available” link, it should open a week-view calendar highlighting available times
    - Priority: Medium
21. As a student, I would like to request a tutoring session with a tutor by selecting a course, date, time, and description, so that the tutor knows that I am interested in learning from them.
    - Acceptance criteria: Given the student is viewing a tutor’s available hours, when they click the “Book Appointment” button, then a pending request should be sent to the tutor.
    - Priority: High
22. As a tutor, I would like to view a list of all my requested tutoring sessions, so that I know who would like to learn from me and when.
    - Acceptance criteria: Given the tutor is logged in, when they select the Appointment Requests tab, then they should see a list of pending tutoring requests from students
    - Priority: High
23. As a tutor, I would like to accept or deny tutoring session requests, so that I can stay organized and manage my schedule effectively.
    - Acceptance criteria: Given the tutor is viewing their pending requests, when they select the ‘check’ button it should move the request to the Appointments tab and update their availability. When they select the 'X' button it should remove the request from the page.
    - Priority: High

#### Tutor Profile
24. As a tutor, I would like to be able to add and/or edit my availability throughout the week, so that students can more accurately select a time to book a session with me.
    - Acceptance criteria: Given the tutor is viewing their profile, when they click on the hours available link, they should be able to view, add, and edit their week’s availability
    - Priority: High
25. As a tutor, I would like to edit my hourly rate, GPA, and past courses so that I can attract more students.
    - Acceptance criteria: Given the tutor is on their profile, when they click the edit button, they should be able to change their hourly rate, GPA, and past courses.
    - Priority: High

#### Tutor Rating
26. As a student, I would like to be able to rate and give feedback on my tutor, so that I can support my tutor and inform other students of the tutor’s teaching.
    - Acceptance criteria: Given the student has completed the call with a tutor, when they end the call and view the give feedback page, they should be able to rate (out of 5 stars) and write feedback for the respective tutor. 
    - Priority: Medium

# Non-Functional Requirements and System Constraints

#### Non-Functional Requirements

1. AI transcription should be fast and 99% accurate
2. Chat should be real-time
3. Video/audio calls should be high-quality 

#### System Constraints

1. Transcript uploads should be allowed in either PDF format


