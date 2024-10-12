import React from 'react';

const DateComponent = () => {
  const now = new Date(Date.now());

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const day = now.getDate();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();

  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year} - ${hours}:${minutes}`;

  return <span className='text-xs sm:text-sm md:text-md lg:text-lg'>{formattedDate}</span>;
};

export default DateComponent;