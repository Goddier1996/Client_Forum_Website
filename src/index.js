//Js React משמש כעקרון לעיבוד וניתוב של רכיבי = index.js

import React from 'react';
import ReactDOM from 'react-dom'; // חבילה המספקת שיטות 
import App from './App';

// אם התקשרות חוזרת אופציונלית מסופקת, היא תתבצע לאחר עיבוד או עדכון הרכיב  = render()
ReactDOM.render(
  // הוא כלי להדגשת בעיות פוטנציאליות באפליקציה = React.StricMode
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


