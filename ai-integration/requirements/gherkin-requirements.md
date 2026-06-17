# OrangeHRM Application - Gherkin BDD Requirements

## Feature: User Authentication and Login

### Scenario: Successful login with valid credentials
**Given** the user is on the OrangeHRM login page
**When** the user enters username "Admin"
**And** the user enters password "admin123"
**And** the user clicks the Login button
**Then** the user should be redirected to the dashboard page
**And** the dashboard URL should be "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
**And** the page title should display "OrangeHRM"
**And** the user should see the main navigation menu with all modules
**And** the user should see their name "test123 test123" displayed in the top right corner

### Scenario: Login attempt with invalid username
**Given** the user is on the OrangeHRM login page
**When** the user enters username "InvalidUser"
**And** the user enters password "admin123"
**And** the user clicks the Login button
**Then** the login should fail
**And** an error message should be displayed
**And** the user should remain on the login page
**And** no session should be created

### Scenario: Login attempt with invalid password
**Given** the user is on the OrangeHRM login page
**When** the user enters username "Admin"
**And** the user enters password "wrongpassword"
**And** the user clicks the Login button
**Then** the login should fail
**And** an error message should be displayed
**And** the user should remain on the login page

### Scenario: Login attempt with empty username
**Given** the user is on the OrangeHRM login page
**When** the user leaves the username field empty
**And** the user enters password "admin123"
**And** the user clicks the Login button
**Then** the form should show a validation error for the username field
**And** the user should remain on the login page

### Scenario: Login attempt with empty password
**Given** the user is on the OrangeHRM login page
**When** the user enters username "Admin"
**And** the user leaves the password field empty
**And** the user clicks the Login button
**Then** the form should show a validation error for the password field
**And** the user should remain on the login page

### Scenario: Login attempt with both fields empty
**Given** the user is on the OrangeHRM login page
**When** the user leaves both username and password fields empty
**And** the user clicks the Login button
**Then** the form should show validation errors for both fields
**And** the user should remain on the login page

### Scenario: Login form contains security token
**Given** the user navigates to the OrangeHRM login page
**When** the page loads
**Then** a hidden _token field should be present in the login form
**And** the token should have a non-empty value for CSRF protection

---

## Feature: Dashboard Home Page

### Scenario: User views the dashboard after login
**Given** the user has successfully logged in with valid credentials
**When** the user is on the dashboard page
**Then** the page URL should be "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
**And** the page title should display "OrangeHRM"
**And** the navigation sidebar should be visible on the left side
**And** the user name "test123 test123" should be displayed in the top right corner
**And** the dashboard widgets should be visible and loaded

### Scenario: Dashboard displays Time at Work widget
**Given** the user is on the dashboard page
**When** the page loads
**Then** a "Time at Work" widget should be visible
**And** the widget should show the current punch status (e.g., "Punched Out")
**And** the widget should display today's hours worked (e.g., "0h 10m Today")
**And** the widget should display the weekly hours summary (e.g., "Apr 27 - May 03")
**And** the widget should show the last punch action with timestamp

### Scenario: Dashboard displays My Actions widget
**Given** the user is on the dashboard page
**When** the page loads
**Then** a "My Actions" widget should be visible
**And** the widget should display count of pending items
**And** the widget should list items like "Pending Self Review"
**And** the widget should list items like "Candidate reviews pending"
**And** the widget items should be clickable and link to respective action pages

### Scenario: Dashboard shows all main menu items
**Given** the user is on the dashboard page
**When** the page loads
**Then** the navigation sidebar should display the following menu items:
  - Admin
  - PIM
  - Leave
  - Time
  - Recruitment
  - My Info
  - Performance
  - Dashboard
  - Directory
  - Maintenance
  - Claim
  - Buzz
**And** all menu items should be clickable

---

## Feature: Admin Module Navigation

### Scenario: Navigate to Admin module
**Given** the user is on the OrangeHRM dashboard
**When** the user clicks on the "Admin" menu item
**Then** the user should be navigated to the Admin module
**And** the destination URL should contain "/admin/viewSystemUsers"
**And** the page title should remain "OrangeHRM"
**And** the Admin page should display administrative options including:
  - User Management
  - Job
  - Organization
  - Qualifications
  - Nationalities
  - Corporate Branding
  - Configuration

### Scenario: Admin page displays System Users list
**Given** the user has navigated to the Admin module
**When** the System Users page loads
**Then** a list of system users should be displayed
**And** filter options should be available for Username and User Role
**And** the User Role dropdown should have a "--Select--" default option
**And** an Employee Name filter should be available

---

## Feature: PIM Module Navigation

### Scenario: Navigate to PIM module
**Given** the user is on the OrangeHRM dashboard
**When** the user clicks on the "PIM" menu item
**Then** the user should be navigated to the PIM module
**And** the destination URL should contain "/pim/viewEmployeeList"
**And** the page title should remain "OrangeHRM"
**And** the PIM page should display options including:
  - Configuration
  - Employee List
  - Add Employee
  - Reports

### Scenario: PIM page displays Employee List with filters
**Given** the user has navigated to the PIM module
**When** the Employee List page loads
**Then** employee records should be displayed in a table
**And** filter options should be available for:
  - Employee Name
  - Employee ID
  - Employment Status
  - Include/Exclude options
  - Supervisor Name
**And** an "Add Employee" button should be visible and functional

---

## Feature: Leave Module Navigation

### Scenario: Navigate to Leave module
**Given** the user is on the OrangeHRM dashboard
**When** the user clicks on the "Leave" menu item
**Then** the user should be navigated to the Leave module
**And** the destination URL should contain "/leave/viewLeaveList"
**And** the page title should remain "OrangeHRM"
**And** the Leave page should display options including:
  - Apply
  - My Leave
  - Entitlements
  - Reports
  - Configure

### Scenario: Leave page displays Leave List with filters
**Given** the user has navigated to the Leave module
**When** the Leave List page loads
**Then** leave records should be displayed
**And** filter options should be available for:
  - From Date
  - To Date
  - Leave Status (e.g., "Pending Approval")
  - Leave Type
**And** an "Assign Leave" option should be available

---

## Feature: Time Module Navigation

### Scenario: Navigate to Time module
**Given** the user is on the OrangeHRM dashboard
**When** the user clicks on the "Time" menu item
**Then** the user should be navigated to the Time module
**And** the destination URL should contain "/time/viewEmployeeTimesheet"
**And** the page title should remain "OrangeHRM"
**And** the Time page should display options including:
  - Timesheets
  - Attendance
  - Reports
  - Project Info

### Scenario: Time page displays Employee Timesheet form
**Given** the user has navigated to the Time module
**When** the Employee Timesheet page loads
**Then** an Employee Name selector should be displayed (marked as required with *)
**And** a View button should be visible
**And** a "Timesheets Pending Action" section should show pending timesheets
**And** the pending timesheets count should be displayed (e.g., "(4) Records Found")

---

## Feature: Recruitment Module Navigation

### Scenario: Navigate to Recruitment module
**Given** the user is on the OrangeHRM dashboard
**When** the user clicks on the "Recruitment" menu item
**Then** the user should be navigated to the Recruitment module
**And** the destination URL should contain "/recruitment/viewCandidates"
**And** the page title should remain "OrangeHRM"
**And** the Recruitment page should display options including:
  - Candidates
  - Vacancies

### Scenario: Recruitment page displays Candidates list with filters
**Given** the user has navigated to the Recruitment module
**When** the Candidates page loads
**Then** candidate records should be displayed
**And** filter options should be available for:
  - Job Title
  - Vacancy
  - Hiring Manager
  - Status
  - Candidate Name
  - Keywords
  - Date of Application

---

## Feature: My Info Module Navigation

### Scenario: Navigate to My Info module
**Given** the user is on the OrangeHRM dashboard
**When** the user clicks on the "My Info" menu item
**Then** the user should be navigated to their personal information page
**And** the destination URL should contain "/pim/viewPersonalDetails/empNumber/7"
**And** the page title should remain "OrangeHRM"
**And** the user's name "test123 test123" should be displayed

### Scenario: My Info page displays all user information tabs
**Given** the user has navigated to the My Info section
**When** the Personal Details page loads
**Then** tabbed interface should be available with tabs for:
  - Personal Details
  - Contact Details
  - Emergency Contacts
  - Dependents
  - Immigration
  - Job
  - Salary
  - Report-to
  - Qualifications
  - Memberships
**And** the Personal Details tab should be active by default
**And** user information should be displayed for the current user (employee number 7)

---

## Feature: Performance Module Navigation

### Scenario: Navigate to Performance module
**Given** the user is on the OrangeHRM dashboard
**When** the user clicks on the "Performance" menu item
**Then** the user should be navigated to the Performance module
**And** the destination URL should contain "/performance/searchEvaluatePerformanceReview"
**And** the page title should remain "OrangeHRM"
**And** the Performance page should display options including:
  - Configure
  - Manage Reviews
  - My Trackers
  - Employee Trackers
  - Employee Reviews

### Scenario: Performance page displays performance review search
**Given** the user has navigated to the Performance module
**When** the performance review search page loads
**Then** filter options should be available for:
  - Employee Name
  - Job Title
  - Sub Unit
  - Include/Exclude options
**And** performance review records should be displayed in a table format

---

## Feature: Dashboard Module Navigation (Home)

### Scenario: Navigate back to Dashboard from other modules
**Given** the user is on any module page (e.g., Admin, PIM, Leave)
**When** the user clicks on the "Dashboard" menu item
**Then** the user should be navigated to the main dashboard
**And** the destination URL should be "/web/index.php/dashboard/index"
**And** the dashboard widgets should be visible and updated
**And** the page title should remain "OrangeHRM"

---

## Feature: Directory Module Navigation

### Scenario: Navigate to Directory module
**Given** the user is on the OrangeHRM dashboard
**When** the user clicks on the "Directory" menu item
**Then** the user should be navigated to the Directory section
**And** the destination URL should contain "/directory/viewDirectory"
**And** the page title should remain "OrangeHRM"

### Scenario: Directory page displays employee search
**Given** the user has navigated to the Directory section
**When** the Directory page loads
**Then** a comprehensive employee directory should be displayed
**And** total records count should be displayed (e.g., "(139) Records Found")
**And** search and filter options should be available for:
  - Employee Name
  - Job Title
  - Location
**And** a Reset button should clear all filters
**And** a Search button should execute the search with selected filters

---

## Feature: Maintenance Module Navigation

### Scenario: Navigate to Maintenance module requires re-authentication
**Given** the user is on the OrangeHRM dashboard
**When** the user clicks on the "Maintenance" menu item
**Then** the user should be presented with an administrator re-authentication dialog
**And** the dialog should display message: "You have requested to access a critical Administrator function in OrangeHRM and are required to validate your credentials below"
**And** a Username field should be visible
**And** a Password field should be visible
**And** Cancel and Confirm buttons should be available

### Scenario: Complete Maintenance access with valid re-authentication
**Given** the administrator re-authentication dialog is displayed
**When** the user enters their username "Admin"
**And** the user enters their password "admin123"
**And** the user clicks the Confirm button
**Then** the user should be navigated to the Maintenance module
**And** the destination URL should contain "/maintenance/purgeEmployee"
**And** maintenance operations should be accessible

### Scenario: Cancel Maintenance access
**Given** the administrator re-authentication dialog is displayed
**When** the user clicks the Cancel button
**Then** the dialog should close
**And** the user should remain on the previous page
**And** the Maintenance module should not be accessed

---

## Feature: Claim Module Navigation

### Scenario: Navigate to Claim module
**Given** the user is on the OrangeHRM dashboard
**When** the user clicks on the "Claim" menu item
**Then** the user should be navigated to the Claim module
**And** the destination URL should contain "/claim/viewAssignClaim"
**And** the page title should remain "OrangeHRM"
**And** the Claim page should display options including:
  - Configuration
  - Submit Claim
  - My Claims
  - Employee Claims

### Scenario: Claim page displays Employee Claims with filters
**Given** the user has navigated to the Claim module
**When** the Employee Claims page loads
**Then** claim records should be displayed
**And** filter options should be available for:
  - Employee Name
  - Reference ID
  - Event Name
  - Status
  - From Date
  - To Date
**And** the Event Name dropdown should have a "--Select--" default option
**And** the Status dropdown should have a "--Select--" default option

---

## Feature: Buzz Module Navigation

### Scenario: Navigate to Buzz module
**Given** the user is on the OrangeHRM dashboard
**When** the user clicks on the "Buzz" menu item
**Then** the user should be navigated to the Buzz section
**And** the destination URL should contain "/buzz/viewBuzz"
**And** the page title should remain "OrangeHRM"

### Scenario: Buzz page displays social newsfeed
**Given** the user has navigated to the Buzz section
**When** the Buzz newsfeed page loads
**Then** a social feed interface should be displayed
**And** tabs for different post views should be visible:
  - Most Recent Posts
  - Most Liked Posts
  - Most Commented Posts
**And** posts should be displayed with:
  - User name
  - Timestamp
  - Post content
**And** functionality to create new posts should be available
**And** options to share photos should be visible
**And** options to share videos should be visible

---

## Feature: Session Management

### Scenario: Logout ends user session
**Given** the user is logged into the OrangeHRM application
**When** the user clicks the logout link
**Then** the user session should be terminated
**And** the user should be redirected to the login page
**And** accessing protected pages should redirect to login

### Scenario: Direct access to protected page without session redirects to login
**Given** the user is not logged into the OrangeHRM application
**When** the user attempts to access a protected page directly (e.g., /dashboard/index)
**Then** the user should be redirected to the login page
**And** the login form should be displayed

---

## Feature: Error Handling and Validation

### Scenario: Invalid menu navigation shows error
**Given** the user is on the OrangeHRM application
**When** the user navigates to an invalid URL
**Then** an appropriate error message or 404 page should be displayed
**And** the navigation menu should remain accessible
**And** the user should be able to navigate back to valid pages

### Scenario: SQL injection attempt is prevented
**Given** the user is on the login page
**When** the user enters SQL injection payload in a field (e.g., "' OR '1'='1")
**And** the user attempts to submit the form
**Then** the injection should be prevented
**And** login should fail with standard invalid credentials message
**And** no database information should be exposed

### Scenario: XSS injection attempt is prevented
**Given** the user is on the login page
**When** the user enters XSS payload in a field (e.g., "<script>alert('XSS')</script>")
**And** the user attempts to submit the form
**Then** the script should not execute
**And** the input should be properly escaped/sanitized
**And** login should fail with standard invalid credentials message
