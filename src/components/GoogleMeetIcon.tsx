import React from 'react';

export const GoogleMeetIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M15 8.5L20.5 4.5V19.5L15 15.5V8.5Z" fill="#00832D"/>
    <path d="M3 7C3 5.34315 4.34315 4 6 4H15V16H3V7Z" fill="#0066DA"/>
    <path d="M3 16H15V20H6C4.34315 20 3 18.6569 3 17V16Z" fill="#00AC47"/>
    <path d="M15 4H18C19.6569 4 21 5.34315 21 7V9.5L15 14V4Z" fill="#EA4335"/>
    <path d="M15 14L21 9.5V17C21 18.6569 19.6569 20 18 20H15V14Z" fill="#FFBA00"/>
  </svg>
);
