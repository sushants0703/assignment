function launchBrowserAndLogin(browserName) {
    console.log("Launch the " + browserName + " Browser");
    console.log("Enter the URL: https://www.icici.com/");
    console.log("Enter the username as 'Bharath' and password as 'Bharath@123'");
    console.log("Click on the login button");
}

function logoutAndCloseBrowser() {
    console.log("Logout from the application");
    console.log("Close the browser");
}

function getAccountBalance() {
    console.log("Navigate to the account balance page");
    let accountBalance = 100000;
    return accountBalance;
}


// Test Case 1: verify the home page.
console.log("******************TEST CASE 1: VERIFY THE HOME PAGE******************");
launchBrowserAndLogin("Chrome");
console.log("Verify the home page is displayed or not");
logoutAndCloseBrowser();