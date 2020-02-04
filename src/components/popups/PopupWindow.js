import React, { Component, useEffect, useRef } from 'react';

function PopupWindow (props) {
  let emojiPopup = useRef();

  useEffect(() => {
    const scLauncher = document.querySelector('#sc-launcher');
    scLauncher.addEventListener('click', interceptLauncherClick);

    return () => {
      scLauncher.removeEventListener('click', interceptLauncherClick);      
    }
  });

  const interceptLauncherClick = (e) => {
    const { isOpen, onClickedOutside } = props;
    const clickedOutsideVar = !emojiPopup.contains(e.target) && isOpen;
    clickedOutsideVar && onClickedOutside(e);
  }

  const { isOpen, children, onInputChange } = props;
  return (
    <div className="sc-popup-window" ref={(e) => emojiPopup = e}>
      <div className={`sc-popup-window--cointainer ${isOpen ? '' : 'closed'}`}>
        <input
          onChange={onInputChange}
          className="sc-popup-window--search"
          placeholder="Search emoji..."
        />
        {children}
      </div>
    </div>
  );
}

export default PopupWindow;
