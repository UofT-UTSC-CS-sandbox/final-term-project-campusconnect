# Application Features and Functionality

1. **Sign Up**
   - Enter name, university, year of study, spoken languages
   - Upload profile picture
   - Set username and password
   - If signing up as a tutor, upload transcript, personal bio, and take a short AI-powered interview

2. **Homepage and Search & Filter**
   - View all tutors, search based on course and narrow search by using filters

3. **Tutor Profile Settings**
   - Tutors can update their available times, and all other info (GPA, hourly rate, etc)

4. **Chat**
   - Send messages, view chat history, send images/upload files

5. **Voice/Video Call**
   - All users can voice/video call, and share screen when on call

6. **Tutor Rating**
   - Students can view tutor profiles and rate them and leave comments for feedback

7. **Booking Appointment with Tutor**
   - Students can view a calendar with the times that the tutor is available
   - Students can send an appointment request to the tutor, specifying the course they need help with, the type of help, the specific day and time range
   - Tutors can see a list of appointment requests and accept/decline each request

8. **Recording and AI Summary**
   - Users can record sessions with tutors and later view the recording along with an AI-summary transcript of the session


# User Stories

#### Signup
1. As a new user, I would like to enter my name and university, so that I can create an account.
   - Acceptance criteria: Given the user is signing up for a new account, when they click “sign up”, then they should be taken to a screen to input their full name and university.
   - Priority: High
2. As a new user, I would like to select my user type (student or tutor), so that I can continue to create the type of account I need.
   - Acceptance criteria: Given the user is signing up for a new account, when they are on the “Who Are You” page, then they should be able to select whether they are a student or tutor.
   - Priority: High
3. As a user, I would like to input the languages I am comfortable speaking, so that I can communicate directly with other students who speak my language.  
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

#### Finding a Tutor
8. As a student, I would like to search for the courses I need help with on the home page, so that I can find a tutor that matches my needs.
   - Acceptance criteria: Given the student is on the home page, when they input a course code, they should be able to select the course and then tutors who teach that course should appear.
   - Priority: High
9. As a student, I would like to filter my search based on hourly rate, so that I can find a tutor within my budget.
   - Acceptance criteria: Given the student is on the home page, when they click on the filter button and select a price sorting, then the tutors should be listed in order of low to high (or high to low given what the student chose).
   - Priority: Low
10. As a student, I would like to filter my search based on tutor rating, so that I receive the most qualified tutor.
    - Acceptance criteria: Given the student is on the home page, when they click on the filter button and check the rating sorting, then the tutors should be listed in order of high to low.
    - Priority: Low

#### Chat
11. As a user, I would like to be able to send a private message to any other user, so that I can ask my questions/respond to any question.
    - Acceptance criteria: Given the user is on the chats page, when they select a person, then they should be able to send that person a message and see their message history.
    - Priority: High
12. As a user, I would like to be able to send images and files via the chat, so that I can share any necessary documents needed for the tutoring session.
    - Acceptance criteria: Given the user is on the chats page and has a direct message open, when they click on the image upload button, then they should be able to select an image or file to upload.
    - Priority: Medium

#### Voice/Video Call
13. As a student, I would like to start a voice/video call with my tutor, so that we can have a live, interactive tutoring session.
    - Acceptance criteria: Given the student is on the chats page and has a direct message open, when they click on the call button, then they should start a video/voice call with the other user.
    - Priority: High
14. As a student, I would like to record tutoring sessions, so that I can re-watch them on my own time whenever I need to.
    - Acceptance criteria: Given the student is on a call screen, when they click the recording button, then their call should start being recorded.
    - Priority: Medium
15. As a student, I would like to view a list of my recordings on the ‘Recordings’ tab so that I can look back at any content that I require.
    - Acceptance criteria: Given the student is logged into the app, when they click the recording tab, they should be directed to a page with a list of all their past recordings.
    - Priority: Medium
16. As a student, I would like to be able to read an auto-generated summary/transcription of the contents of the recorded online sessions, so that I quickly skim through the material.
    - Acceptance criteria: Given the student is viewing a past recording, when they scroll down, they should see a transcription and summary of what is said in the recording.
    - Priority: Low
17. As a user, I would like to share my screen during tutoring sessions, so that answers to questions can be more personalized.
    - Acceptance criteria: Given the user is on a call screen, when they click the screenshare button, then their display should start being shown on the call screen.
    - Priority: High
18. As a tutor, I would like to utilize a whiteboard during tutoring sessions, so that I can provide in-depth visual explanations to student questions.
    - Acceptance criteria: Given the user is on a call screen, when they click open whiteboard tab, they should be able to access a screen to draw and write on.
    - Priority: Low

#### Book Appointments with Tutor
19. As a student, I would like to see a calendar of times that a selected tutor is available at, so that I can book a session at a time that suits my schedule.
    - Acceptance criteria: Given the student is viewing a tutor’s profile, when they click on the “Hours Available” link, it should open a week-view calendar highlighting available times.
    - Priority: Medium
20. As a student, I would like to request a tutoring session with a tutor by selecting a course, date, time, and description, so that the tutor knows that I am interested in learning from them.
    - Acceptance criteria: Given the student is viewing a tutor’s available hours, when they click the “Book Appointment” button, then a pending request should be sent to the tutor.
    - Priority: High
21. As a tutor, I would like to view a list of all my requested tutoring sessions, so that I know who would like to learn from me and when.
    - Acceptance criteria: Given the tutor is logged in, when they select the Appointment Requests tab, then they should see a list of pending tutoring requests from students.
    - Priority: High
22. As a tutor, I would like to accept or deny tutoring session requests, so that I can stay organized and manage my schedule effectively.
    - Acceptance criteria: Given the tutor is viewing their appointment requests, when they select accept or decline, it should remove that request and accept or decline the request.
    - Priority: High

#### Tutor Profile
23. As a tutor, I would like to be able to edit my availability throughout the week, so that students can more accurately select a time to book a session with me.
    - Acceptance criteria: Given the tutor is viewing their profile, when they click on the hours available link, they should be able to view and edit their week’s availability.
    - Priority: High
24. As a tutor, I would like to edit my hourly rate, GPA, and past courses so that I can attract more students.
    - Acceptance criteria: Given the tutor is on their profile, when they click the edit button, they should be able to change their hourly rate, GPA, and past courses.
    - Priority: High

#### Tutor Rating
25. As a student, I would like to be able to rate and give feedback on my tutor, so that I can support my tutor and inform other students of the tutor’s teaching.
    - Acceptance criteria: Given the student is viewing the tutor’s profile, when they click the give feedback button, they should be able to rate (out of 5 stars) and write feedback for the tutor.
    - Priority: Medium

