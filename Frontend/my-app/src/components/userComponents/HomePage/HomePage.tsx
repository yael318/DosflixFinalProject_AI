import React, { FC, useEffect, useState } from 'react';
import './HomePage.scss';
import TypingText from '../../TypingText';

interface StatCounterProps {
  label: string;
  value: number;
  duration?: number; // משך האנימציה במילישניות
}

const StatCounter: FC<StatCounterProps> = ({ label, value, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <div className="stat-counter">
      <div className="stat-value">{count.toLocaleString()}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const HomePage: FC = () => {
  return (
    <div className="HomePage">
      <section className="stats-container">
        <StatCounter label="משתמשים פעילים" value={12000} />
        <StatCounter label="צפיות יומיות" value={8500} />
        <StatCounter label="ערים שונות ברחבי העולם" value={12} />
      </section>
      <section className="intro-text">
        <h1>
          בעולם שבו הצפייה הפכה לכלי שמרחיק את האדם מעצמו –
        </h1>
        <h1>
          DosFlix מבקש להפוך את הכיוון:
        </h1>
        <p>
          לא להציף, אלא להעמיק. לא להסיח – אלא לחדד. לא לבדר – אלא לעורר לבבות.
          גם בדורנו, בתוך ההמון, אפשר לגלות את הנקודה הפנימית, כששומרים על גבולות הקדושה ומכוונים את המבט.
        </p>
        <p className="dosflix-tagline">
          <TypingText text='DosFlix – לא עולם של בריחה. עולם של חיבור.' />
        </p>
      </section>


    </div>
  );
};

export default HomePage;
