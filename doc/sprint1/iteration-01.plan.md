
# Product/Team Name: ULearn/CampusConnect

## Sprint One Iteration Plan

June 3rd 2024

## 1. Process

Start date: Mon June 3, 2024

End date: Fri June 14, 2024

  

### 1.1 Roles & responsibilities

  

To enhance our team's collaboration, we have assigned each member a specific task or responsibility. Additionally, we're implementing pair programming to foster better integration between backend and frontend development. This means team members working on backend tasks will collaborate closely with those handling frontend and other functionalities.

  

#### 1.  Michael Walker: Scrum Master
    

-   Create final set of user stories
    
-   Break down user stories to be more granular for each sprint
    
-   Setup database and help teammates communicate with the database when needed
    
-   Organize general flow of pages and code structure
    
-   Facilitate team meetings
    
-   Maintain JIRA board and assign tasks on JIRA
    
-   Page(s): Login and verification with email (frontend + connection to database)
    

#### 2.  Aarushi Doshi: Developer + tester
    

-   Assist in breakdown of user stories to be more granular for each sprint
    
-   Check/Approve all Pull Requests before merging to dev branch
    
-   Test application after each merge to ensure code is working
    
-   Inform teammates of new merges
    
-   Deploy to main branch
    
-   Page(s): Personal Info, and Who Are You Pages (frontend + connection to database)
    

#### 3.  Arina Azmi: Developer + Designer
    

-   Take meeting minutes and keep team updated on new developments
    
-   Check/Approve all Pull Requests before merging to dev branch
    
-   Confirm final UI before merging branches with dev
    
-   Assist in breakdown of user stories to be more granular for each sprint
    
-   Page(s): Sign up page and profile picture upload functionality (frontend + connection to database)
    

#### 4.  Miri Huang: Developer
    

-   Assist in breakdown of user stories to be more granular for each sprint
    
-   Page(s): Develop pdf transcript verification functionality with toast messages (connection to database)
    

#### 5.  Anusha Karkhanis: Developer
    

-   Assist in breakdown of user stories to be more granular for each sprint
    
-   Page(s): Tutor Info Page including PDF uploading (frontend + connection to database)
    

  

In addition to their specific roles, all team members are responsible to assist other teammates when needed.

  
  
  
  

### 1.2 Events

  

**1.  Daily Standups**: These meetings will take place online (Discord or Slack) and occasionally in-person, at 6pm EST every weekday. During each standup meeting, each team member will have the opportunity to discuss what they have completed since the last meeting, what they are planning to complete by the next meeting, and if they are having any issues and require assistance. This will also be the time to make any larger team decisions, such as changing UI, using a different API, etc.
    
**2.  Weekly Scrum Meeting**: For the next 2 Saturday’s at 11am EST, the entire team will meet to discuss the final pages that have been made and the complete weekly progress. During these meetings we will merge our individual codes onto the dev branch and discuss any larger blockers that any teammates are having
    
**3.  Final Sprint 1 Meeting**: On Thurs June 13th, the entire team will meet online at 3pm to go over the final steps and ensure that all code is working. During this meeting all code on the dev branch will be thoroughly tested.
    

  

## 2. Product: Goals and Tasks

  

### 2.1 Sign Up

One of our main priorities is to allow users to easily sign up and create an account on ULearn. Users should be able to register with the full name, email, and a password along with additional personal information, such as University, year, and spoken languages.

  

-   Users should be able to register with their first and last name, and password.
    
-   During this account creation process, it is important to validate the provided arguments and ensure that the user does not already exist in the system.
    
-   Once the information is entered, a 6-digit verification code will be sent to their email
    
-   Another screen will appear where users will have to enter this 6-digit code
    
-   This will be done using the Clerk API
    
-   After the code is entered successfully, the user will be navigated to the Personal Info page.
    
-   On the Personal Info page, new users must select their University, year of study, and the languages they speak, from 3 different dropdown menus.
    
-   On this page, new users must also upload a profile picture. This can be of type .png, .jpg, or .jpeg
    
-   Then, users can click Next and they will be navigated to the Who Are You page, where they can select between 2 Vector image buttons, to choose if they are signing up as a Student or Tutor.
    
-   If they sign up as a student, they will be redirected to their home page. If the user signs up as a tutor, they will be navigated to the Tutor Info page.
    
-   On the Tutor Info page, users will need to enter other information such as the courses they want to teach (this will be done by a dropdown menu), their hourly rate (which will be an input field) and any additional information they would like to display about themselves. Once this is complete, users will need to upload their pdf transcript.
    

  
  
  
  
  
  

### 2.2 Transcript Verification

It is crucial that only qualified tutors are accepted to teach. We have decided that only those with a grade above 80 in the course should be eligible to teach.

  

-   Once users upload their transcript, their grades for each course will automatically be verified using a pdf scanner
    
-   It will be ensured that the user has a mark above 80 for each of the courses the user has stated that they would like to teach.
    
-   Once the verification is complete, users will receive a toast message on their screen indicating if they are or aren’t eligible to teach the courses they have selected. If they are eligible to teach all their courses, users can select the next button and their account setup will have been completed. Else, users will have to remove the courses that they are not eligible to teach, before being able to proceed to their home page.
    

  

### 2.3 Login

Once an account has successfully been created, users must easily be able to login to their account with their email and password.

  

-   When on the homepage of the application, existing users should be able to enter their email and password and click Login to be navigated to their homepage if they have completed the entire sign up process.
    
-   If users still have not completed the sign up process, they will be redirected to the Personal Info page, where they will have to continue finishing the sign up process.
    

  

## 3. Product: Artifacts

  

### 3.1 Division of Responsibilities

  

Tasks are assigned based on similarity between user stories, difficulty of the task, and personal preference/familiarity with technologies. For example, since the first 2 pages (Personal Info and Who Are You) are very co-related, those pages will be assigned to one person, and since one of our teammates has had experience with MongoDB, they will take on the task to allow users to login/sign up, and add their info to the database. The team member taking on this task will not take on any other tasks, because this is quite difficult and time consuming to do.

  

We also prioritized each task based on flow of pages. The sign up should come first, then personal info, and last tutor info with transcript verification. If tasks are done in a sequential order, we will be able to test the app in an orderly manner, to check that pages are being navigated correctly and ensure that pages flow smoothly.

  

### 3.2 JIRA Management

  

We will keep track of user stories in our JIRA backlog for the sprint and assign points to each user story to estimate how difficult a task is. We will reassess the points after each week to ensure that we have taken on an appropriate amount of work for the sprint. Once a user story is completed, the ticker will be marked as complete on our JIRA board. If time permits, that user will take on 1 of the 2-3 user stories that we will keep in our sprint wishlist, which we will decide on at the beginning of each sprint.

  

[JIRA Board](https://cscc01-campusconnect.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?atlOrigin=eyJpIjoiZmRlY2IxNzRhMmI4NGQyMDkyNzUzYmZlYjg5MDcwMWIiLCJwIjoiaiJ9)

  

### 3.3 Team Organization

  

At the beginning of each sprint, the team will fill out a when-to-meet to indicate the times that they will be available over the following 2 weeks. This way, we can set specific times for our standups and even know when other teammates may be available to help with a blocker.

  

To ensure that the team is always on the same page, after each standup, Arina will make a short to-do listing the tasks that are yet to be completed for the sprint, alongside who needs to complete each task and which ones require collaborative effort. This will help all team members be aware of which tasks are left, and we will be able to plan out our schedule more effectively.

  

### 3.4 Sprint Retrospective

  

Once this Sprint is complete, our team will meet to go over all aspects of the sprint and discuss what went well, what could be improved and what didn’t go well for the sprint. This will help us improve for the upcoming sprints.

  

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXeyATVVai9nUH1Qezxo6jmCrgvTORfV9PQHNrhJ31CLy2T0exAFN5HPE2rrZdWw6piXxNN0Q5iTMwz98-qBRt3wCCPItssEIXcCf_sRRrF7_xUyMqhQgp91Ekfj57wYB2qU0Kidtw3g_yiuCk4l2VZ0KgJ0?key=HfT6ilJiyZWgTsdVbQNQcA)