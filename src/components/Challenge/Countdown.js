//This countdown timer is based on the approach provided by https://www.geeksforgeeks.org/how-to-create-a-countdown-timer-using-reactjs/

import React, { useState, useRef, useEffect } from "react";

const Countdown = (props) => {
    console.log('Countdown was re-rendered');

    // We need ref in this, because we are dealing with JS setInterval to keep track of it and stop it when needed
    const Ref = useRef(null);

    // The state for our timer
    const [timer, setTimer] = useState("00:00:00");
 
    const getTimeRemaining = (e) => {
        const total =
            Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor(
            (total / 1000 / 60) % 60
        );
        const hours = Math.floor(
            (total / 1000 / 60 / 60) % 24
        );
        return {
            total,
            hours,
            minutes,
            seconds,
        };
    };
 
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } =
            getTimeRemaining(e);
        if (total >= 0) {
            console.log("countdown time left:",total);
            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : "0" + hours) +
                ":" +
                (minutes > 9
                    ? minutes
                    : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        }else{
            console.log("which quesion in countdown:",props.whichQuestion);
            props.stop();
            // clearInterval(Ref.current);
        }
    };
 
    const clearTimer = (e) => {
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next
        setTimer("00:00:04");
 
        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
            return () => {
                clearInterval(Ref.current);
              };
        }, 1000);
        Ref.current = id;
    };

 
    const getDeadTime = () => {
        let deadline = new Date();
 
        // This is where you need to adjust if
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 4);
        return deadline;
    };
 
    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible
 
    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());

        //return a cleanup function, which will run right before the component is unmounted.
        return () => {
            clearInterval(Ref.current);
            console.log('Component will unmount');
        };
    }, []);
 


    return (
        <div style={{ textAlign: "center", margin: "auto" }}>
            <h2>{timer}</h2>
        </div>
    );
};
 
export default Countdown;