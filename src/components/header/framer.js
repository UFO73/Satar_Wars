import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FramerMagnetic({ children }) {
    // Ref to the component
    const magnetic = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = magnetic.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            gsap.to(magnetic.current, { x, y, duration: 1, ease: "elastic.out(1, 0.3)" });
        };

        const handleMouseLeave = () => {
            gsap.to(magnetic.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
        };

        // Attach event listeners
        magnetic.current.addEventListener("mousemove", handleMouseMove);
        magnetic.current.addEventListener("mouseleave", handleMouseLeave);

        // Remove event listeners when component unmounts
        return () => {
            magnetic.current.removeEventListener("mousemove", handleMouseMove);
            magnetic.current.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

    // Cloning the children and passing ref to the cloned element
    return React.cloneElement(children, { ref: magnetic });
}
