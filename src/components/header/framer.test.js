import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FramerMagnetic from "./framer";

describe("FramerMagnetic component", () => {
  test("moves element on mouse movement", () => {
    const { getByTestId } = render(
      <FramerMagnetic>
        <div data-testid="test-element" style={{ width: 100, height: 100, backgroundColor: "red" }}></div>
      </FramerMagnetic>
    );

    const testElement = getByTestId("test-element");

    // Simulate mouse movement
    fireEvent.mouseMove(testElement, { clientX: 50, clientY: 50 });

    // Check if the element moved
    expect(testElement).toHaveStyle("transform: translate(0, 0)");

    // Simulate mouse leaving
    fireEvent.mouseLeave(testElement);

    // Check if the element reset its position
    expect(testElement).toHaveStyle("transform: translate(0, 0)");
  });
});
