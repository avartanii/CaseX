# 5.0	Requirements Specification


## 5.1	Introduction

This Software Requirements Specification (SRS) documents the requirements for the CaseX Database Website Application. CaseX is an open source web application and database optimized for the management of physical data. This system is uniquely customized as a data management solution for the Los Angeles Police Department Homicide Library Unit, however it can be used for any enterprise seeking physical data management.

At the core of the CaseX application is the Case Record, which contains metadata about a particular homicide case. CaseX has three main functions: efficient upload of Case Record metadata, interactive visualization and query of Case Record Data, and customizable data export into reports or spreadsheets.

The CaseX system architecture is comprised of a web browser-based user interface (front-end), a server (backend), and a database. The frontend consists of various webpages which allows users to accomplish the three main functions of CaseX. The server backend and database will be designed to allow for concurrent access, efficient query, and data validation. 


## 5.2	CSCI Component Breakdown

CSCI CaseX is composed of the following CSCs:

- 5.2.1 Frontend CSC -- web-based GUI for CaseX
    - 5.2.1.1 About Page CSU -- page to display information about CaseX to the public
        - 5.2.1.1.1 Login module -- button to take user to the Login Page CSU
    - 5.2.1.2 Login Page CSU -- page for users to log in to accounts
        - 5.2.1.2.1 Login input module -- input fields for username and password
        - 5.2.1.2.2 Login submit button module -- button send inputs to server
    - 5.2.1.3 Header CSU -- top console to display on each of the following pages
        - 5.2.1.3.1 Menu module -- row of buttons to take user to each of the following pages
        - 5.2.1.3.2 User info module -- displays basic information on user currently logged in
            - 5.2.1.3.2.1 Username module -- text display of user’s username
            - 5.2.1.3.2.2 Permissions module -- icon representing user’s access tier
        - 5.2.1.3.3 Current page module -- text display of currently opened page
        - 5.2.1.3.4 Logout button module -- button to log user out and return to Login Page
    - 5.2.1.4 Home Dashboard Page CSU -- central control page for users
        - 5.2.1.4.1 Links module -- array of buttons to take user to each of the following pages
    - 5.2.1.5 Input Form Page CSU -- page for adding case entries to the database
        - 5.2.1.5.1 Form select module -- interface for selecting which form format to use
        - 5.2.1.5.2 Manual input module -- interface where users can type data into the form
        - 5.2.1.5.3 Form upload module -- button to upload scanned form to server for automatic data parsing
        - 5.2.1.5.4 Submit module -- button to submit completed case entry to the database
    - 5.2.1.6 Data Explorer Page CSU -- page for querying data and viewing query results
        - 5.2.1.6.1 Query module -- section for making queries on database
            - 5.2.1.6.1.1 Search conditions module -- array of conditions for query
        - 5.2.1.6.2 Table display module -- section that displays the returned case entries
            - 5.2.1.6.2.1 Display filter module -- allows users to see only certain columns
            - 5.2.1.6.2.2 Table module -- two-dimensional array display of data
        - 5.2.1.6.3 Graphic display module -- section for visualizing data
    - 5.2.1.7 Case Page CSU -- page for displaying all available data for a single case
        - 5.2.1.7.1 Case selector module -- choose case by DR number
        - 5.2.1.7.2 Display selector module -- choose display as table or form layout
        - 5.2.1.7.3 Toggle edit module -- button to enable / disable editing of case data
        - 5.2.1.7.4 Data display module -- displays case data in selected layout
    - 5.2.1.8 Admin Console Page CSU -- page for management of database and users
        - 5.2.1.8.1 Users management module -- section for modifying users
        - 5.2.1.8.2 Case database management module -- section for modifying case database
- 5.2.2 Server CSC -- Description
    - 5.2.2.1 NodeJS CSU - modules for handling connections and serving web application
    - 5.2.2.2 API Routes CUS -- modules for handling requests to the server
- 5.2.3 Database CSC -- database components that will store the data
    - 5.2.3.1 Queries CSU -- modules will run queries on the stored data

## 5.3	Functional Requirements by CSC

The CaseX Web App will allow members of the LAPD Homicide Library Unit to record case data that will be stored in the system’s database. In the requirements that follow, “user” is understood to be members of the Unit (detectives and officers). Users will have the ability to retrieve and query this same information on demand as well as generate reports on stored data. The system will also have the ability to easily import pre-formatted data. 

### 5.3.1	Frontend 

- 5.3.1.1 The Frontend shall display an about page to provide information about CaseX to
the public.
- 5.3.1.2 The Frontend shall display a login page for the user.
    - 5.3.1.2.1 The Frontend shall provide instructions for how to use the login page.
    - 5.3.1.2.2 The Frontend shall provide text entry fields into which the user may type values.
    - 5.3.1.2.3 The Frontend shall provide error checking on the text entry fields such that the user is provided immediate feedback in case of erroneous entry.
- 5.3.1.3 The Frontend shall direct users to the home dashboard page after successful login.
- 5.3.1.4 The Frontend shall restrict users, without admin access, from the admin console page.
- 5.3.1.5 The Frontend shall include a header bar at the top of the page.
- 5.3.1.6 The Frontend shall have buttons for navigating between pages.
- 5.3.1.7 The Frontend shall display real-time data.
- 5.3.1.8 The Frontend shall react to mouse clicks on displayed buttons.
- 5.3.1.9 The Frontend shall display status indicators for case records, or “murder books”.
- 5.3.1.10 The Frontend shall display a menu module with buttons leading to different pages.
- 5.3.1.11 The Frontend shall have an input form(s) page.
    - 5.3.1.11.1 The Frontend shall provide an interface for selecting which input form format to use.
    - 5.3.1.11.2 The Frontend shall provide text entry fields into which the user may type values.
    - 5.3.1.11.3 The Frontend shall provide the ability to upload scanned forms as an alternative form-filling method.
- 5.3.1.12 The Frontend shall have a data explorer page.
    - 5.3.1.12.1 The Frontend shall provide the ability to make queries on a database.
    - 5.3.1.12.2 The Frontend shall have case entries displayed as a table of columns and rows.
- 5.3.1.13 The Frontend shall have an individual case page.
    - 5.3.1.13.1 The Frontend shall allow the user to choose a case by a DR number.
    - 5.3.1.13.2 The Frontend shall provide the option to display case data as a table or form layout.
    - 5.3.1.13.3 The Frontend shall allow editing of case data for users with administrative access.
- 5.3.1.14 The Frontend shall have an admin console page.
    - 5.3.1.14.1 The Frontend shall have a section for modifying users.
    - 5.3.1.14.2 The Frontend shall have a section for modifying case database.
    
### 5.3.2	Backend 

- 5.3.2.1 The Backend shall respond to HTTP requests from the Frontend.
- 5.3.2.2 The Backend shall make a network connection with the database.
- 5.3.2.3 The Backend shall forward queries from the Frontend to the Database.
- 5.3.2.4 The Backend shall forward results of database queries to the Frontend.
- 5.3.2.5 The Backend shall authenticate users.
- 5.3.2.6 The Backend shall grant read and write access in accordance with the access level of the user.
- 5.3.2.7 The Backend shall perform data validation before sending queries to the database.
- 5.3.2.8 The Backend shall timeout the network connection to the database after the user is idle for 5 minutes.
- 5.3.2.9 The Backend shall maintain a network log.
- 5.3.2.10 The Backend network log shall track successful HTTP requests.
- 5.3.2.11 The Backend network log shall track failed HTTP requests.
- 5.3.2.12 The Backend shall respond with a 404 error code when a page or route is not found.
- 5.3.2.13 The Backend shall respond with a 503 error code if the server is overloaded or under maintenance.
- 5.3.2.14 The Backend shall respond with a 504 error code if the server is not receiving a response from the backend servers within the allotted time period.
- 5.3.2.15 The Backend shall respond with a 200 code when an HTTP request is successfully made.
- 5.3.2.16 The Backend shall have a REST API that can be called by the Frontend through an HTTP request.

### 5.3.3	Database 

- 5.3.3.1 The Database shall use MongoDB as the database system.
- 5.3.3.2 The Database shall perform queries on stored data.
- 5.3.3.3 The Database shall store case records.
- 5.3.3.4 The Database shall store user profile information.
- 5.3.3.5 The Database shall prevent errors from concurrent data modification.
- 5.3.3.6 The Database shall be hosted on a cloud service.
- 5.3.3.7 The Database shall perform statistical analysis on queried data.
- 5.3.3.8 The Database shall be accessible only through the CaseX Web Application API.

## 5.4	Performance Requirements by CSC

- 5.4.1 After inputting login credentials, and successfully passing verification, a user should not have to wait a significant amount of time before he or she is redirected to the home dashboard page.
- 5.4.2 Users should not experience delays while navigating between pages.
- 5.4.3 The graphical user interface shall be user-friendly and intuitive.
- 5.4.4 Users should see results of a search within seconds of initiating the search.
- 5.4.5 The system design should allow for easy incorporation and modification by other developers.
- 5.4.6 The system should be able to deal with network crashes.

## 5.5	Project Environment Requirements

### 5.5.1	Development Environment Requirements

| Category | Requirement |
|---|---|
| Front End | Bootstrap, Moment, d3.js | 
| Server | Node.js, npm, Express, Mocha, Jade, ESLint, Istanbul, Mocha, Nodemon, Mongoose, parallelshell, Nodemon |
| Database | MongoDB |

### 5.5.2	Execution Environment Requirements

| Category | Requirement |
|---|---|
| Front End | Web Browser | 
| Server | Cloud-hosted server |
| Database | Cloud-hosted database |
