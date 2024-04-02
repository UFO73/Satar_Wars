import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FramerMagnetic({children}) {
    // Ref to the component
    const magnetic = useRef(null);

    useEffect( () => {
        // Animation for x-axis
        const xTo = gsap.quickTo(magnetic.current, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
        // Animation for y-axis
        const yTo = gsap.quickTo(magnetic.current, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

        // Event listener for mouse movement
        magnetic.current.addEventListener("mousemove", (e) => {
            const { clientX, clientY } = e;
            const {height, width, left, top} = magnetic.current.getBoundingClientRect();
            const x = clientX - (left + width/2);
            const y = clientY - (top + height/2);
            // Update x and y coordinates
            xTo(x);
            yTo(y);
        });

        // Event listener for mouse leaving
        magnetic.current.addEventListener("mouseleave", (e) => {
            // Reset x and y coordinates to 0
            xTo(0);
            yTo(0);
        });
    }, []);

    // Cloning the children and passing ref to the cloned element
    return (
        React.cloneElement(children, {ref:magnetic})
    );
};
