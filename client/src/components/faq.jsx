// FAQ.jsx

import React from 'react';
import '../components/faq.css';

const FAQ = () => {
  const faqData = [
    {
      question: 'What is this page about?',
      answer: 'This page is a personal finance tracker that allows users to manage their budgets and expenses.',
    },
    {
      question: 'How do I create a new user account?',
      answer: 'You can create a new user account by visiting the registration page and providing a username and password.',
    },
    {
      question: 'How can I add a new expense?',
      answer: 'To add a new expense, go to the Expenses page and use the provided form to enter the details of your expense.',
    },
    {
      question: 'What information do I need to provide to create a budget?',
      answer: 'To create a budget, you need to provide your user ID, monthly pay, and savings goal on the Budgets page. This information helps in managing your finances effectively.',
    },
    {
      question: 'Can I edit or update my budget details?',
      answer: 'Yes, you can edit your budget details. Navigate to the Budgets page, find the budget you want to modify, and use the provided options to update your monthly pay or savings goal.',
    },
    {
      question: 'How do I track my budget progress?',
      answer: 'On the Budgets page, you can view a summary of your monthly income, expenses, and remaining balance. This allows you to track your budget progress and make informed financial decisions.',
    },
    {
      question: 'Is there a limit to the number of expenses I can add?',
      answer: 'No, there is no specific limit to the number of expenses you can add. Feel free to add all your expenses to get a comprehensive view of your spending habits and manage your finances more effectively.',
    },
    {
      question: 'Can I categorize my expenses?',
      answer: 'Yes, you can categorize your expenses. On the Expenses page, you have the option to specify the category of each expense (e.g., groceries, utilities, entertainment) to better understand and analyze your spending patterns.',
    },
    {
      question: 'How do I delete an expense?',
      answer: 'To delete an expense, go to the Expenses page, locate the expense you want to remove, and use the provided options to delete it. This helps in keeping your expense records up to date.',
    },
    {
      question: 'How can I view a summary of my overall financial health?',
      answer: 'To view a summary of your overall financial health, check the Monthly Budget Overview section on the homepage. It provides details such as total income, total expenses, and the remaining balance for the current month.',
    },
    {
      question: 'Is my financial data secure on this platform?',
      answer: 'Yes, we take the security of your financial data seriously. Our platform employs encryption and follows industry best practices to ensure the confidentiality and integrity of your personal and financial information.',
    },
    {
      question: 'Can I export my budget and expense data for external analysis?',
      answer: 'Yes, you can export your budget and expense data. Navigate to the Settings page, where you\'ll find an option to export your data in a downloadable format (e.g., CSV). This allows you to perform external analysis or keep a backup of your financial records.',
    },
    {
      question: 'Are there any mobile apps available for this personal finance tracker?',
      answer: 'Currently, we do not have dedicated mobile apps. However, our website is designed to be mobile-friendly, allowing you to access and manage your finances conveniently on various devices, including smartphones and tablets.',
    },
    {
      question: 'How often should I update my budget and expense details?',
      answer: 'It\'s recommended to update your budget and expense details regularly, especially when there are changes in your financial situation. This ensures that the information reflects your current financial status and helps you make informed decisions about your spending and saving habits.',
    },
  ];

  return (
    <div className="container">
      <h2>Frequently Asked Questions (FAQ)</h2>

      <ul>
        {faqData.map((faqItem, index) => (
          <li key={index}>
            <h3>{faqItem.question}</h3>
            <p>{faqItem.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
