// Assignment-2 (Conditional Statements)

// Customer Details
let customerName: string = "John Doe";
let creditScore: number = 720;
let income: number = 55000.0;
let isEmployed: boolean = true;
let debtToIncomeRatio: number = 35.0;


// Common Function
function checkLoanEligibility(
    customerName: string,
    creditScore: number,
    income: number,
    isEmployed: boolean,
    debtToIncomeRatio: number
): void {

    console.log("Checking loan eligibility for:", customerName);
    console.log("-------------------------------------------");

    // 1. Credit Score Check
    if (creditScore > 750) {
        console.log("Credit Score:", creditScore);
        console.log("Loan Automatically Approved ✅");
    }

    else if (creditScore >= 650 && creditScore <= 750) {
        console.log("Credit Score:", creditScore);
        console.log("Credit score requires additional checks...");

        // 2. Income Check
        if (income >= 50000) {
            console.log("Income:", income);
            console.log("Income criteria satisfied.");

            // 3. Employment Check
            if (isEmployed) {
                console.log("Employment Status: Employed");

                // 4. Debt-to-Income Ratio Check
                if (debtToIncomeRatio < 40) {
                    console.log("DTI Ratio:", debtToIncomeRatio + "%");
                    console.log("Loan Approved ✅");
                } else {
                    console.log("DTI Ratio:", debtToIncomeRatio + "%");
                    console.log("Loan Denied ❌ (High DTI Ratio)");
                }

            } else {
                console.log("Employment Status: Unemployed");
                console.log("Loan Denied ❌ (Customer is unemployed)");
            }

        } else {
            console.log("Income:", income);
            console.log("Loan Denied ❌ (Income less than $50,000)");
        }
    }

    else {
        console.log("Credit Score:", creditScore);
        console.log("Loan Denied ❌ (Low Credit Score)");
    }
}


// Function Call
checkLoanEligibility(customerName, creditScore, income, isEmployed, debtToIncomeRatio);
