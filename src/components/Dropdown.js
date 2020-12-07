import React, { useState, useEffect, useRef } from "react";

//options is a prop destructure coming from the app component. selected and on slected change are props also coming from app
const Dropdown = ({ options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    //   when user clicks in the body tag the dropdown will close
    const onBodyClick = (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
    //   { capture: 'true' };

    document.body.addEventListener("click", onBodyClick);
    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  const renderedOptions = options.map((option) => {
    //the statement when the label is cliekd is equal to the seleceted label, do not render it. and show null which show nothing in the screen.
    if (option.value === selected.value) return null;
    // onclick event when pressed show which color is pressed
    return (
      <div
        key={option.value}
        className="item"
        //this event is to clikc and slect the color in the event
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });
  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">Select a color</label>
        <div
          // this toggle the dropdown wheter it open or close
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>

          <div
            //after the color is selected close the dropdown
            className={`menu ${open ? "visible transition" : ""}`}
          >
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
