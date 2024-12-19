const options = document.querySelectorAll('.option');
const submitBtn = document.querySelector('.submit-btn');
const talkBtn = document.querySelector('.talk-btn');
const goBackBtn = document.querySelector('.go-back-btn');
const percentageDisplay = document.querySelector('.percentage');
const progressBar = document.querySelector('.progress');
const dynamicText = document.querySelector('.dynamic-text');

// Define 32 outcomes with unique percentages, default text, and placeholder CTAs
const outcomes = [
  { percentage: 0, text: "No solutions selected, no specific outcomes achieved.", cta: "#" },
  { percentage: 25, text: "Organizations struggle with extracting actionable insights from large datasets. By implementing Financial Insight, actionable insights can be efficiently extracted, helping businesses make data-driven decisions and uncover trends.", cta: "#" },
  { percentage: 40, text: "Organizations often miss identifying potential risks and opportunities from data. Procurement Insight provides advanced analytics that highlight risk areas and opportunities, helping to optimize procurement strategies.", cta: "#" },
  { percentage: 60, text: "25% of organizations face challenges in actionable insights, and 40% struggle with risk and opportunity identification. Combining Financial Insight and Procurement Insight enhances data-driven decisions and proactive risk management.", cta: "#" },
  { percentage: 35, text: "Organizations have difficulty predicting sales and revenue growth accurately. Human Resources Insight, leveraging workforce data and trends, can improve forecasting and enable better sales and growth predictions.", cta: "#" },
  { percentage: 50, text: "25% of organizations face challenges in actionable insights, and 35% struggle with revenue growth prediction. Financial Insight and Human Resources Insight together enhance sales forecasts and operational efficiency.", cta: "#" },
  { percentage: 60, text: "40% of organizations face procurement challenges, and 35% struggle with growth prediction. Procurement Insight and Human Resources Insight combine to improve data visibility and sales forecasts.", cta: "#" },
  { percentage: 75, text: "25% struggle with actionable insights, 40% with risk and opportunities, and 35% with sales prediction. Financial, Procurement, and Human Resources Insights offer a comprehensive approach to extracting and using critical data for growth.", cta: "#" },
  { percentage: 30, text: "Organizations face issues with data compliance and security. Compliance Insight addresses these concerns by ensuring data governance, security policies, and regulatory compliance are in place.", cta: "#" },
  { percentage: 45, text: "25% of organizations face actionable insights, and 30% struggle with compliance and security. Financial Insight combined with Compliance Insight ensures secure and actionable data management.", cta: "#" },
  { percentage: 50, text: "40% face procurement challenges, and 30% struggle with compliance. Procurement and Compliance Insights enhance data security while optimizing procurement workflows.", cta: "#" },
  { percentage: 65, text: "25% of organizations face actionable insights, 40% risk and opportunities, and 30% compliance issues. Financial, Procurement, and Compliance Insights streamline secure, data-driven decision-making.", cta: "#" },
  { percentage: 55, text: "35% of organizations struggle with sales prediction, and 30% with compliance. Human Resources and Compliance Insights ensure secure workforce data for predictive analytics and compliance.", cta: "#" },
  { percentage: 70, text: "25% face actionable insights, 35% revenue growth prediction, and 30% compliance concerns. Financial, Human Resources, and Compliance Insights ensure secure, actionable predictions and compliance.", cta: "#" },
  { percentage: 65, text: "40% face procurement challenges, 35% growth prediction, and 30% compliance issues. Procurement, Human Resources, and Compliance Insights provide comprehensive, secure data solutions.", cta: "#" },
  { percentage: 80, text: "25% struggle with actionable insights, 40% procurement challenges, 35% sales prediction, and 30% compliance concerns. Financial, Procurement, Human Resources, and Compliance Insights create a holistic, secure data framework.", cta: "#" },
  { percentage: 25, text: "Organizations face challenges in streamlining data storage and management. Grant Insight optimizes data storage, improving data organization and efficient management.", cta: "#" },
  { percentage: 45, text: "25% face actionable insights, and 25% struggle with data management. Financial Insight and Grant Insight enhance data storage and structured, actionable data extraction.", cta: "#" },
  { percentage: 55, text: "40% procurement challenges, and 25% data management issues. Procurement and Grant Insights improve structured data storage and efficient procurement workflows.", cta: "#" },
  { percentage: 65, text: "25% face actionable insights, 40% procurement issues, and 25% data management. Financial, Procurement, and Grant Insights streamline data storage and improve actionable insights.", cta: "#" },
  { percentage: 40, text: "35% struggle with sales prediction, and 25% data management challenges. Human Resources and Grant Insights help manage workforce data and structured storage.", cta: "#" },
  { percentage: 55, text: "25% face actionable insights, 35% sales prediction, and 25% data management. Financial, Human Resources, and Grant Insights ensure structured storage and predictions.", cta: "#" },
  { percentage: 50, text: "40% procurement challenges, 35% growth prediction, and 25% data management. Procurement, Human Resources, and Grant Insights improve structured storage and operational insights.", cta: "#" },
  { percentage: 70, text: "25% face actionable insights, 40% procurement challenges, 35% growth prediction, and 25% data management. Financial, Procurement, Human Resources, and Grant Insights ensure comprehensive, actionable data.", cta: "#" },
  { percentage: 20, text: "30% compliance concerns, and 25% data management challenges. Compliance and Grant Insights enhance secure, structured data storage.", cta: "#" },
  { percentage: 40, text: "25% face actionable insights, 30% compliance, and 25% data management. Financial, Compliance, and Grant Insights ensure secure data management.", cta: "#" },
  { percentage: 45, text: "40% procurement issues, 30% compliance, and 25% data management. Procurement, Compliance, and Grant Insights improve structured data storage and operational efficiency.", cta: "#" },
  { percentage: 60, text: "25% face actionable insights, 40% procurement challenges, 30% compliance, and 25% data management. Financial, Procurement, Compliance, and Grant Insights enhance secure, structured data.", cta: "#" },
  { percentage: 30, text: "35% growth prediction, 30% compliance, and 25% data management. Human Resources, Compliance, and Grant Insights ensure structured workforce data storage.", cta: "#" },
  { percentage: 50, text: "25% face actionable insights, 35% sales prediction, 30% compliance, and 25% data management. Financial, Human Resources, Compliance, and Grant Insights streamline data storage and secure predictions.", cta: "#" },
  { percentage: 40, text: "40% procurement issues, 35% growth prediction, 30% compliance, and 25% data management. Procurement, Human Resources, Compliance, and Grant Insights ensure structured data storage and data-driven operations.", cta: "#" },
  { percentage: 90, text: "25% of organizations face actionable insights, 40% procurement challenges, 35% sales prediction, 30% compliance, and 25% data management issues. Financial, Procurement, Human Resources, Compliance, Grant, and Planning & Budgeting Insights together provide a comprehensive, actionable, and secure data-driven framework for addressing these challenges.", cta: "#" },
];

let selectedOptions = [];

// Replace the old options event listeners and getOutcomeIndex function with this:
function getOutcomeIndex(selectedOptions) {
  // Sort the selected indices to ensure consistent ordering
  const sortedIndices = selectedOptions
    .map(Number)
    .sort((a, b) => a - b);
  
  // Create a string representation of selected options
  const selectionPattern = sortedIndices.join(',');
  
  // Map the selection pattern to the correct outcome number
  const outcomeMap = {
    '': 1,                    // None selected
    '1': 2,                   // Option 1
    '2': 3,                   // Option 2
    '1,2': 4,                 // Options 1 and 2
    '3': 5,                   // Option 3
    '1,3': 6,                 // Options 1 and 3
    '2,3': 7,                 // Options 2 and 3
    '1,2,3': 8,               // Options 1, 2, and 3
    '4': 9,                   // Option 4
    '1,4': 10,                // Options 1 and 4
    '2,4': 11,                // Options 2 and 4
    '1,2,4': 12,              // Options 1, 2, and 4
    '3,4': 13,                // Options 3 and 4
    '1,3,4': 14,              // Options 1, 3, and 4
    '2,3,4': 15,              // Options 2, 3, and 4
    '1,2,3,4': 16,            // Options 1, 2, 3, and 4
    '5': 17,                  // Option 5
    '1,5': 18,                // Options 1 and 5
    '2,5': 19,                // Options 2 and 5
    '1,2,5': 20,              // Options 1, 2, and 5
    '3,5': 21,                // Options 3 and 5
    '1,3,5': 22,              // Options 1, 3, and 5
    '2,3,5': 23,              // Options 2, 3, and 5
    '1,2,3,5': 24,            // Options 1, 2, 3, and 5
    '4,5': 25,                // Options 4 and 5
    '1,4,5': 26,              // Options 1, 4, and 5
    '2,4,5': 27,              // Options 2, 4, and 5
    '1,2,4,5': 28,            // Options 1, 2, 4, and 5
    '3,4,5': 29,              // Options 3, 4, and 5
    '1,3,4,5': 30,            // Options 1, 3, 4, and 5
    '2,3,4,5': 31,            // Options 2, 3, 4, and 5
    '1,2,3,4,5': 32           // All options selected
  };
  
  return outcomeMap[selectionPattern] || 1;
}

// Option selection event listeners
options.forEach((option, index) => {
  option.addEventListener('click', () => {
    const circle = option.querySelector('.circle');
    const value = index + 1; // Use 1-based position

    if (circle.classList.contains('selected')) {
      circle.classList.remove('selected');
      selectedOptions = selectedOptions.filter(opt => opt !== value);
    } else {
      circle.classList.add('selected');
      selectedOptions.push(value);
    }
  });
});

// Keep the submit button logic
submitBtn.addEventListener('click', () => {
  if (selectedOptions.length > 0) {
    const outcomeIndex = getOutcomeIndex(selectedOptions);
    const outcome = outcomes[outcomeIndex - 1]; // Subtract 1 because array is 0-based

    document.getElementById('first-page').style.display = 'none';
    document.getElementById('second-page').style.display = 'block';
    percentageDisplay.textContent = `${outcome.percentage}%`;
    progressBar.style.width = `${outcome.percentage}%`;
    dynamicText.textContent = outcome.text;
    talkBtn.href = outcome.cta;
  }
});

// Keep the go back button logic
goBackBtn.addEventListener('click', () => {
  document.getElementById('second-page').style.display = 'none';
  document.getElementById('first-page').style.display = 'block';

  options.forEach(option => {
    option.querySelector('.circle').classList.remove('selected');
  });
  selectedOptions = [];
});
