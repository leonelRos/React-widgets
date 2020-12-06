import React, { useState } from "react";

//desctructuring items from app.js state
const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(index);
  };

  //we pass items from the items arraya data in app.js and index because we want to show the the element clicked based on their index
  const renderedItems = items.map((item, index) => {
    //the active is to toggle the title in the accordion when it is clicked
    const active = index === activeIndex ? "active" : "";
    return (
      //add the key to the title because it is unique
      <React.Fragment key={item.title}>
        <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });

  return <div className="ui styled accordion">{renderedItems}</div>;
};

export default Accordion;
