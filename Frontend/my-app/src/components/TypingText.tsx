import React,{ FC, useState, useEffect } from "react";
interface TypingTextProps {
    text: string;
    speed?: number; // מהירות כתיבה במילישניות
    className?: string;
  }
  
const TypingText: FC<TypingTextProps> = ({ text, speed = 50, className }) => {
    const [displayedText, setDisplayedText] = useState('');
  
    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, index + 1));
        index++;
        if (index >= text.length) {
          clearInterval(interval);
        }
      }, speed);
  
      return () => clearInterval(interval);
    }, [text, speed]);
  
    return <span className={className}>{displayedText}</span>;
  };
  export default TypingText;