import { useEffect, useState } from "react";

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = new Date("2024-01-01") - +new Date();
    let timeLeft= {};
    if (difference > 0) {
     timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval,i) => {
    if (!timeLeft[interval]) {
      return null;
    }
   return <span key={i} className="text-[25px] text-[#374ee4] font-semibold">
      {timeLeft[interval]} {interval} {" "}
    </span>;
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Times up</span>
      )}
    </div>
  );
};

export default CountDown;
