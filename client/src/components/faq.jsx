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
