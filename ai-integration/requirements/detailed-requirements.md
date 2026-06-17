# OrangeHRM Application - Detailed Testing Requirements

## 1. Login Page Requirements

### 1.1 Login Page Overview
- **Page URL**: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
- **Page Title**: OrangeHRM
- **Purpose**: User authentication and access to the OrangeHRM system

### 1.2 Login Form Elements

#### 1.2.1 Username Field
- **Type**: Text Input (non-standard type attribute)
- **Name Attribute**: `username`
- **Placeholder Text**: "Username"
- **Validation Requirements**:
  - Field should be required (cannot be empty on submission)
  - Should accept alphanumeric characters
  - Should accept special characters as username format may include them
  - Should display error message if left empty and form submitted

#### 1.2.2 Password Field
- **Type**: Password (masked input)
- **Name Attribute**: `password`
- **Placeholder Text**: "Password"
- **Validation Requirements**:
  - Field should be required (cannot be empty on submission)
  - Password characters should be masked/hidden from view
  - Should support various special characters in password
  - Should display error message if left empty and form submitted

#### 1.2.3 Security Token Field
- **Type**: Hidden
- **Name Attribute**: `_token`
- **Purpose**: CSRF (Cross-Site Request Forgery) protection
- **Validation Requirements**:
  - Token should be present in every login form request
  - Token should be validated server-side for security
  - Token should be unique per session/request

### 1.3 Login Button
- **Type**: Submit Button
- **Button Text**: "Login"
- **Action**: Submits login form to authenticate user

### 1.4 Login Validation Scenarios

#### 1.4.1 Valid Login Credentials
- **Input**: Username: "Admin", Password: "admin123"
- **Expected Behavior**:
  - Form should be submitted successfully
  - Browser should navigate to Dashboard page
  - URL should change to `/web/index.php/dashboard/index`
  - User should see authenticated dashboard with menu items visible
  - Session should be established with user credentials

#### 1.4.2 Invalid Username
- **Input**: Username: "InvalidUser", Password: "admin123"
- **Expected Behavior**:
  - Login should fail
  - Error message should be displayed
  - User should remain on login page
  - Session should not be created

#### 1.4.3 Invalid Password
- **Input**: Username: "Admin", Password: "wrongpassword"
- **Expected Behavior**:
  - Login should fail
  - Error message should be displayed
  - User should remain on login page
  - Session should not be created

#### 1.4.4 Empty Username
- **Input**: Username: "", Password: "admin123"
- **Expected Behavior**:
  - Form validation should prevent submission
  - Error message should indicate required field
  - User should remain on login page

#### 1.4.5 Empty Password
- **Input**: Username: "Admin", Password: ""
- **Expected Behavior**:
  - Form validation should prevent submission
  - Error message should indicate required field
  - User should remain on login page

#### 1.4.6 Both Fields Empty
- **Input**: Username: "", Password: ""
- **Expected Behavior**:
  - Form validation should prevent submission
  - Error messages should indicate required fields
  - User should remain on login page

#### 1.4.7 SQL Injection Attempt
- **Input**: Username: "' OR '1'='1", Password: any
- **Expected Behavior**:
  - Backend should properly escape/sanitize input
  - Login should fail with standard invalid credentials message
  - No database information should be exposed

#### 1.4.8 XSS Injection Attempt
- **Input**: Username: "<script>alert('XSS')</script>", Password: any
- **Expected Behavior**:
  - Backend should properly escape/sanitize input
  - No JavaScript should execute
  - Login should fail with standard invalid credentials message

---

## 2. Home Page (Dashboard) Requirements

### 2.1 Home Page Overview
- **Page URL**: https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index
- **Page Title**: OrangeHRM
- **Accessed After**: Successful login with valid credentials
- **Purpose**: Display user dashboard with quick access to main modules and actions

### 2.2 Dashboard Layout Components

#### 2.2.1 Main Navigation Sidebar
- **Location**: Left side of the page
- **Content**: Menu items for different modules
- **Validation Requirements**:
  - Should display all major modules accessible to logged-in user
  - Menu items should be clickable and functional
  - Active menu item should be highlighted/distinguished
  - Menu should persist across page navigation

#### 2.2.2 User Profile Section
- **Location**: Top right corner
- **Display**: User greeting "test123 test123" (logged-in user)
- **Components**: 
  - User name display
  - Logout link/button
  - Potentially profile settings access
- **Validation Requirements**:
  - Should display correct logged-in user name
  - Logout should terminate user session
  - Profile menu should be accessible

#### 2.2.3 Dashboard Widgets
- **Time at Work Widget**: Shows punch in/out status and hours worked
  - **Validation Requirements**:
    - Should display current punch status (Punched In/Out)
    - Should show current day hours worked
    - Should show weekly hours summary (Apr 27 - May 03)
    - Last action should be "Punched Out: Today at 05:32 PM (GMT 5)"

- **My Actions Widget**: Shows pending actions requiring user attention
  - **Content Examples**: 
    - (1) Pending Self Review
    - (1) Candidate reviews pending
  - **Validation Requirements**:
    - Should display count of pending actions
    - Should link to respective action pages
    - Should update when actions are completed

#### 2.2.4 Dashboard Title/Header
- **Display**: Page title should indicate Dashboard
- **Validation Requirements**:
  - Should match page purpose
  - Should be visible and clear

### 2.3 Dashboard Accessibility Requirements
- **Session Validation**:
  - Validation: Dashboard should only be accessible to authenticated users
  - If user is not logged in, should redirect to login page
- **Performance**:
  - Validation: Dashboard should load within reasonable time
  - Validation: All widgets should display properly without missing content

---

## 3. Menu Navigation Requirements

### 3.1 Main Menu Items Overview

The OrangeHRM application has **12 main menu items** accessible from the dashboard sidebar. Below are detailed requirements for each menu item including navigation validation and expected destination pages.

### 3.2 Menu Item: Admin

#### 3.2.1 Menu Item Details
- **Menu Item Name**: Admin
- **Navigation Link**: `/web/index.php/admin/viewAdminModule`
- **Destination URL**: `https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers`
- **Page Title**: OrangeHRM
- **Module Type**: Administrative Management

#### 3.2.2 Admin Page Elements and Sections
The Admin page provides access to system administration features:
- **Main Options**:
  - User Management (System Users)
  - Job
  - Organization
  - Qualifications
  - Nationalities
  - Corporate Branding
  - Configuration

#### 3.2.3 Key Features Observed
- User Management: System Users list with filtering by Username and User Role
- User Role dropdown selector with "--Select--" default option
- Employee Name filtering/search capability

#### 3.2.4 Validation Requirements
- **Navigation Validation**: Clicking "Admin" menu item should successfully navigate to Admin module
- **URL Validation**: Final destination URL should contain "/admin/" path segment
- **Page Title Validation**: Page title should remain "OrangeHRM"
- **Content Validation**: Page should display "Admin" heading or title
- **Submenu Validation**: Sub-menu items (User Management, Job, Organization, etc.) should be visible and accessible
- **User Management Access**: System Users page should be accessible and display user list
- **Error Handling**: Admin access should work without throwing errors or exceptions

---

### 3.3 Menu Item: PIM (Personnel Information Management)

#### 3.3.1 Menu Item Details
- **Menu Item Name**: PIM
- **Navigation Link**: `/web/index.php/pim/viewPimModule`
- **Destination URL**: `https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList`
- **Page Title**: OrangeHRM
- **Module Type**: Employee Records Management

#### 3.3.2 PIM Page Elements and Sections
- **Configuration Section**: Access to PIM settings
- **Employee List**: View all employee records
- **Add Employee**: Create new employee record
- **Reports**: Employee-related reports

#### 3.3.3 Key Features Observed
- Employee Information search with filters:
  - Employee Name
  - Employee ID
  - Employment Status dropdown
  - Include/Exclude options (e.g., "Current Employees Only")
  - Supervisor Name filter
- List of employee records displayed in table format

#### 3.3.4 Validation Requirements
- **Navigation Validation**: Clicking "PIM" menu item should successfully navigate to PIM module
- **URL Validation**: Final destination URL should contain "/pim/" path segment
- **Employee List Display**: Employee list page should load and display employee records
- **Filter Fields Validation**: All filter fields should be functional and present
- **Employee Count**: Should display total number of employees or records found
- **Search Functionality**: Search/filter options should work correctly
- **Add Employee Option**: "Add Employee" link/button should be visible and accessible

---

### 3.4 Menu Item: Leave

#### 3.4.1 Menu Item Details
- **Menu Item Name**: Leave
- **Navigation Link**: `/web/index.php/leave/viewLeaveModule`
- **Destination URL**: `https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList`
- **Page Title**: OrangeHRM
- **Module Type**: Leave Management

#### 3.4.2 Leave Page Elements and Sections
- **Apply**: Submit new leave request
- **My Leave**: View personal leave applications
- **Entitlements**: View leave balance/entitlements
- **Reports**: Leave-related reports
- **Configure**: Leave configuration settings

#### 3.4.3 Key Features Observed
- Leave List page with search/filter options:
  - From Date selector
  - To Date selector
  - Status filter with options:
    - "Pending Approval"
    - Other status options
  - Leave Type dropdown selector
- Assign Leave functionality available
- Leave records displayed in table format

#### 3.4.4 Validation Requirements
- **Navigation Validation**: Clicking "Leave" menu item should successfully navigate to Leave module
- **URL Validation**: Final destination URL should contain "/leave/" path segment
- **Leave List Display**: Leave list page should load with leave records
- **Date Filters**: From Date and To Date selectors should function properly
- **Status Filters**: Status dropdown should display available leave statuses
- **Leave Type Filter**: Leave type dropdown should show available leave types
- **Leave Records**: Should display existing leave applications
- **Apply Leave Option**: Should be able to apply for new leave requests

---

### 3.5 Menu Item: Time

#### 3.5.1 Menu Item Details
- **Menu Item Name**: Time
- **Navigation Link**: `/web/index.php/time/viewTimeModule`
- **Destination URL**: `https://opensource-demo.orangehrmlive.com/web/index.php/time/viewEmployeeTimesheet`
- **Page Title**: OrangeHRM
- **Module Type**: Time and Attendance Management

#### 3.5.2 Time Page Elements and Sections
- **Timesheets**: View and manage employee timesheets
- **Attendance**: Manage attendance records
- **Reports**: Time and attendance reports
- **Project Info**: Project-related time tracking

#### 3.5.3 Key Features Observed
- Employee Timesheet page with:
  - Employee Name selector (required field marked with *)
  - View button to display timesheet data
  - Timesheets Pending Action section showing (4) records found
  - Timesheet records displayed in table format
- Status: "Timesheets Pending Action (4) Records Found"

#### 3.5.4 Validation Requirements
- **Navigation Validation**: Clicking "Time" menu item should successfully navigate to Time module
- **URL Validation**: Final destination URL should contain "/time/" path segment
- **Employee Selection**: Employee Name field should be required and functional
- **Timesheet Display**: Should be able to view employee timesheets
- **Pending Actions**: Should display pending timesheet actions accurately
- **Records Count**: Should display correct count of pending timesheets
- **Data Display**: Timesheet data should display correctly in table format

---

### 3.6 Menu Item: Recruitment

#### 3.6.1 Menu Item Details
- **Menu Item Name**: Recruitment
- **Navigation Link**: `/web/index.php/recruitment/viewRecruitmentModule`
- **Destination URL**: `https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates`
- **Page Title**: OrangeHRM
- **Module Type**: Recruitment Management

#### 3.6.2 Recruitment Page Elements and Sections
- **Candidates**: View job candidates
- **Vacancies**: Manage job vacancies
- **Candidates List**: Main candidates display page

#### 3.6.3 Key Features Observed
- Candidates page with filter options:
  - Job Title dropdown
  - Vacancy dropdown
  - Hiring Manager dropdown
  - Status dropdown with various candidate statuses
  - Candidate Name search field
  - Keywords search field
  - Date of Application filter
- Candidate records displayed in table format

#### 3.6.4 Validation Requirements
- **Navigation Validation**: Clicking "Recruitment" menu item should successfully navigate to Recruitment module
- **URL Validation**: Final destination URL should contain "/recruitment/" path segment
- **Candidates Display**: Candidates list page should load and display candidate records
- **Filter Functionality**: All filter fields should be functional
- **Filter Options**: Dropdowns should display correct options for filtering
- **Search Functionality**: Search fields should work for finding specific candidates
- **Vacancies Link**: Should be able to access vacancies from recruitment module

---

### 3.7 Menu Item: My Info

#### 3.7.1 Menu Item Details
- **Menu Item Name**: My Info
- **Navigation Link**: `/web/index.php/pim/viewMyDetails`
- **Destination URL**: `https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPersonalDetails/empNumber/7`
- **Page Title**: OrangeHRM
- **Module Type**: Personal Information Management

#### 3.7.2 My Info Page Elements and Sections
- **Personal Details**: Current user's personal information
  - Employee Full Name (displays "test123 test123")
  - Personal details form fields
  - Employee identification (empNumber/7)
- **Contact Details**: Contact information section
- **Emergency Contacts**: Emergency contact persons
- **Dependents**: Dependent family members information
- **Immigration**: Immigration and visa information
- **Job**: Current job position and details
- **Salary**: Salary information (access based on permissions)
- **Report-to**: Reporting manager/supervisor information
- **Qualifications**: Educational and professional qualifications
- **Memberships**: Professional memberships

#### 3.7.3 Key Features Observed
- Tabbed interface with multiple sections
- Employee Number: 7 (Admin user's employee number)
- Comprehensive personal information display
- All employee-related information in one centralized location

#### 3.7.4 Validation Requirements
- **Navigation Validation**: Clicking "My Info" menu item should successfully navigate to personal details
- **URL Validation**: URL should contain "/pim/viewPersonalDetails/empNumber/" with current user's employee number
- **User Identification**: Should display correct user name (test123 test123)
- **Employee Number**: Should correctly identify employee number (7 for Admin user)
- **Tab Navigation**: All tabs (Personal Details, Contact Details, etc.) should be accessible
- **Data Display**: Personal information should display correctly
- **Edit Capability**: Users should be able to edit their personal information
- **Data Integrity**: Changes should be saved correctly

---

### 3.8 Menu Item: Performance

#### 3.8.1 Menu Item Details
- **Menu Item Name**: Performance
- **Navigation Link**: `/web/index.php/performance/viewPerformanceModule`
- **Destination URL**: `https://opensource-demo.orangehrmlive.com/web/index.php/performance/searchEvaluatePerformanceReview`
- **Page Title**: OrangeHRM
- **Module Type**: Performance Management

#### 3.8.2 Performance Page Elements and Sections
- **Configure**: Performance management configuration settings
- **Manage Reviews**: Manage employee performance reviews
- **My Trackers**: Personal performance trackers
- **Employee Trackers**: Tracker information for employees
- **Employee Reviews**: Performance reviews for employees

#### 3.8.3 Key Features Observed
- Employee performance review search page with filters:
  - Employee Name search field
  - Job Title dropdown selector
  - Sub Unit dropdown selector
  - Include/Exclude options (e.g., "Current Employees")
- Performance review records displayed in table format

#### 3.8.4 Validation Requirements
- **Navigation Validation**: Clicking "Performance" menu item should successfully navigate to Performance module
- **URL Validation**: Final destination URL should contain "/performance/" path segment
- **Review Search**: Should display performance review search/filter page
- **Filter Functionality**: All filter fields should be functional and operational
- **Filter Options**: Dropdowns should display available job titles and sub units
- **Search Functionality**: Employee name search should work correctly
- **Review Records**: Should display performance review records in table
- **Review Management**: Should be able to view and manage performance reviews

---

### 3.9 Menu Item: Dashboard

#### 3.9.1 Menu Item Details
- **Menu Item Name**: Dashboard
- **Navigation Link**: `/web/index.php/dashboard/index`
- **Destination URL**: `https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index`
- **Page Title**: OrangeHRM
- **Module Type**: Dashboard/Home

#### 3.9.2 Dashboard Page Elements (as previously detailed in Section 2)
- Time at Work widget
- My Actions widget with pending items
- Quick access to various modules
- User profile and logout option

#### 3.9.3 Validation Requirements
- **Navigation Validation**: Clicking "Dashboard" menu item should successfully navigate to dashboard
- **URL Validation**: URL should be `/web/index.php/dashboard/index`
- **Dashboard Display**: Main dashboard should load and display all widgets
- **Widget Functionality**: Time at Work and My Actions widgets should display correctly
- **Quick Links**: Quick access to modules should be available
- **Current Status**: Dashboard should reflect current punch/time status

---

### 3.10 Menu Item: Directory

#### 3.10.1 Menu Item Details
- **Menu Item Name**: Directory
- **Navigation Link**: `/web/index.php/directory/viewDirectory`
- **Destination URL**: `https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory`
- **Page Title**: OrangeHRM
- **Module Type**: Employee Directory

#### 3.10.2 Directory Page Elements and Sections
- **Employee Directory**: Searchable employee directory
- **Search and Filter Options**:
  - Employee Name search
  - Job Title dropdown selector
  - Location dropdown selector
  - Reset button to clear filters
  - Search button to execute search

#### 3.10.3 Key Features Observed
- Comprehensive employee directory search
- Records display: "(139) Records Found" indicating total employee count
- Employee list displayed in table/card format
- Search results showing employee identifiers and information

#### 3.10.4 Validation Requirements
- **Navigation Validation**: Clicking "Directory" menu item should successfully navigate to Directory
- **URL Validation**: URL should contain "/directory/viewDirectory"
- **Directory Display**: Directory page should load and display employee records
- **Search Functionality**: Employee name search should work correctly
- **Filter Options**: Job Title and Location dropdowns should display available options
- **Filter Application**: Filters should correctly narrow down results
- **Records Count**: Should display total number of employees in system
- **Reset Functionality**: Reset button should clear all filters and show all records
- **Search Results**: Should display employee information correctly

---

### 3.11 Menu Item: Maintenance

#### 3.11.1 Menu Item Details
- **Menu Item Name**: Maintenance
- **Navigation Link**: `/web/index.php/maintenance/viewMaintenanceModule`
- **Destination URL**: `https://opensource-demo.orangehrmlive.com/web/index.php/maintenance/purgeEmployee`
- **Page Title**: OrangeHRM
- **Module Type**: System Maintenance (Admin Only)

#### 3.11.2 Maintenance Page Elements and Sections
- **Administrator Access Protection**: Requires credential re-validation
- **Purge Employee**: Delete/archive employee records (critical function)
- System maintenance operations

#### 3.11.3 Key Features Observed
- **Security Feature**: Administrator re-authentication dialog
  - Message: "You have requested to access a critical Administrator function in OrangeHRM and are required to validate your credentials below"
  - Username field for re-entry
  - Password field for re-entry
  - Cancel button to abort
  - Confirm button to proceed
- Security confirmation: "OrangeHRM OS 5.8"

#### 3.11.4 Validation Requirements
- **Navigation Validation**: Clicking "Maintenance" menu item should successfully navigate to Maintenance section
- **URL Validation**: URL should contain "/maintenance/" path segment
- **Security Verification**: Administrator re-authentication dialog should appear
- **Credential Re-entry**: Should require username and password re-entry for security
- **Confirmation**: Cancel and Confirm buttons should function correctly
- **Access Control**: Only admin users should be able to access maintenance functions
- **Sensitive Operations**: Maintenance functions should be restricted and logged
- **Error Handling**: Invalid credentials re-entry should show appropriate error messages

---

### 3.12 Menu Item: Claim

#### 3.12.1 Menu Item Details
- **Menu Item Name**: Claim
- **Navigation Link**: `/web/index.php/claim/viewClaimModule`
- **Destination URL**: `https://opensource-demo.orangehrmlive.com/web/index.php/claim/viewAssignClaim`
- **Page Title**: OrangeHRM
- **Module Type**: Claim Management

#### 3.12.2 Claim Page Elements and Sections
- **Configuration**: Claim system configuration
- **Submit Claim**: Submit new expense/claim request
- **My Claims**: View personal claim submissions
- **Employee Claims**: View employee claims (admin view)
- **Assign Claim**: Assign claims to employees

#### 3.12.3 Key Features Observed
- Employee Claims page with filter options:
  - Employee Name field/dropdown
  - Reference ID search field
  - Event Name dropdown selector (with "--Select--" option)
  - Status dropdown selector (with "--Select--" option)
  - From Date and To Date range selectors
- Claim records displayed in table format

#### 3.12.4 Validation Requirements
- **Navigation Validation**: Clicking "Claim" menu item should successfully navigate to Claim module
- **URL Validation**: Final destination URL should contain "/claim/" path segment
- **Claims Display**: Claims list page should load and display claim records
- **Filter Functionality**: All filter fields should be functional
- **Date Range Selection**: From Date and To Date pickers should work correctly
- **Status Filtering**: Status dropdown should display available claim statuses
- **Event Name Filtering**: Event dropdown should show available claim event types
- **Employee Selection**: Employee name field should allow filtering by employee
- **Reference ID Search**: Should be able to search claims by reference ID
- **Submit Claim**: Users should be able to submit new claims

---

### 3.13 Menu Item: Buzz

#### 3.13.1 Menu Item Details
- **Menu Item Name**: Buzz
- **Navigation Link**: `/web/index.php/buzz/viewBuzz`
- **Destination URL**: `https://opensource-demo.orangehrmlive.com/web/index.php/buzz/viewBuzz`
- **Page Title**: OrangeHRM
- **Module Type**: Social/Collaboration Feed

#### 3.13.2 Buzz Page Elements and Sections
- **Most Recent Posts**: Latest posts in the feed
- **Most Liked Posts**: Popular posts based on likes
- **Most Commented Posts**: Active discussions
- **Buzz Newsfeed**: Main social feed
- **Post Functionality**:
  - Create new posts
  - Share Photos capability
  - Share Video capability

#### 3.13.3 Key Features Observed
- Active social feed with user interactions
- Posts display with:
  - User name (e.g., "test123 akhil test123")
  - Timestamp (e.g., "2020-08-10 09:08 AM")
  - Post content
  - Example post: "Hi All; Linda has be..." (truncated)
- Tab navigation for viewing posts by recency, likes, and comments
- Rich media sharing (photos and videos)

#### 3.13.4 Validation Requirements
- **Navigation Validation**: Clicking "Buzz" menu item should successfully navigate to Buzz section
- **URL Validation**: URL should contain "/buzz/viewBuzz"
- **Feed Display**: Buzz newsfeed should load and display posts
- **Tab Navigation**: All tabs (Recent, Liked, Commented) should be functional
- **Post Creation**: Users should be able to create new posts
- **Photo Sharing**: Should be able to share photos in posts
- **Video Sharing**: Should be able to share videos in posts
- **Post Display**: Posts should display with timestamp and user information
- **User Interaction**: Posts should show engagement metrics (likes, comments)
- **Post Content**: Full post content should be visible and readable

---

## 4. Complete Menu Navigation Map

| # | Menu Item | Navigation Link | Destination URL | Page Title | Key Features |
|---|-----------|-----------------|-----------------|-----------|--------------|
| 1 | Admin | `/web/index.php/admin/viewAdminModule` | `/web/index.php/admin/viewSystemUsers` | OrangeHRM | User Management, Job, Organization, Qualifications, Nationalities, Corporate Branding, Configuration |
| 2 | PIM | `/web/index.php/pim/viewPimModule` | `/web/index.php/pim/viewEmployeeList` | OrangeHRM | Employee List, Add Employee, Reports, Employee Information Search |
| 3 | Leave | `/web/index.php/leave/viewLeaveModule` | `/web/index.php/leave/viewLeaveList` | OrangeHRM | Leave List, Apply Leave, My Leave, Entitlements, Reports, Configure |
| 4 | Time | `/web/index.php/time/viewTimeModule` | `/web/index.php/time/viewEmployeeTimesheet` | OrangeHRM | Timesheets, Attendance, Reports, Project Info, Employee Timesheet Selection |
| 5 | Recruitment | `/web/index.php/recruitment/viewRecruitmentModule` | `/web/index.php/recruitment/viewCandidates` | OrangeHRM | Candidates, Vacancies, Candidate Search and Filtering |
| 6 | My Info | `/web/index.php/pim/viewMyDetails` | `/web/index.php/pim/viewPersonalDetails/empNumber/7` | OrangeHRM | Personal Details, Contact Details, Emergency Contacts, Dependents, Immigration, Job, Salary, Qualifications |
| 7 | Performance | `/web/index.php/performance/viewPerformanceModule` | `/web/index.php/performance/searchEvaluatePerformanceReview` | OrangeHRM | Performance Reviews, Trackers, Employee Reviews, Configuration |
| 8 | Dashboard | `/web/index.php/dashboard/index` | `/web/index.php/dashboard/index` | OrangeHRM | Time at Work Widget, My Actions Widget, Quick Access to Modules |
| 9 | Directory | `/web/index.php/directory/viewDirectory` | `/web/index.php/directory/viewDirectory` | OrangeHRM | Employee Directory, Search, Filter by Job Title and Location (139 Records) |
| 10 | Maintenance | `/web/index.php/maintenance/viewMaintenanceModule` | `/web/index.php/maintenance/purgeEmployee` | OrangeHRM | Purge Employee, Administrator Re-authentication Required |
| 11 | Claim | `/web/index.php/claim/viewClaimModule` | `/web/index.php/claim/viewAssignClaim` | OrangeHRM | Employee Claims, Claim Assignment, Submit Claim, My Claims |
| 12 | Buzz | `/web/index.php/buzz/viewBuzz` | `/web/index.php/buzz/viewBuzz` | OrangeHRM | Social Feed, Post Creation, Photo/Video Sharing, Engagement Metrics |

---

## 5. General Application Validation Points

### 5.1 Session Management
- Valid session should be maintained after successful login
- Session should be terminated on logout
- Session should be protected against CSRF attacks (token validation)
- Session timeout should work appropriately
- Accessing protected pages without session should redirect to login

### 5.2 Navigation Consistency
- All menu items should be accessible from any page in the application
- Navigation should not throw errors or exceptions
- URLs should follow consistent URL structure patterns
- Page titles should remain consistent (OrangeHRM)
- Breadcrumbs or navigation indicators should help user understand current location

### 5.3 Data Display
- Pages should load without errors or broken elements
- Tables/lists should display data correctly
- Filter and search functionality should work as expected
- Pagination should work if more records exist
- No sensitive data should be visible to unauthorized users

### 5.4 Error Handling
- Invalid operations should show clear error messages
- No stack traces or technical errors should be visible to users
- Error messages should be user-friendly and actionable
- 404/500 errors should be handled gracefully

### 5.5 Security
- All forms should be CSRF protected
- Sensitive operations should require re-authentication (e.g., Maintenance)
- User inputs should be properly validated and sanitized
- No sensitive information in URLs (except where necessary like empNumber)
- HTTPS should be used for all communication

### 5.6 Performance
- Pages should load within acceptable timeframe (<5 seconds)
- Dashboard widgets should update without full page reload
- Search and filter operations should respond promptly
- No memory leaks or excessive resource usage

### 5.7 Accessibility
- Forms should have proper labels and placeholders
- Required fields should be clearly marked with asterisks (*)
- Error messages should be clearly associated with problematic fields
- Color should not be the only indicator of status
- Screen reader compatibility should be considered
