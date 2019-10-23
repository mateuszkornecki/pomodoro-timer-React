import React, { useRef } from "react";

function TimeboxEditor(props) {

   const titleInput = useRef();
   const taskTimeInput = useRef();

   const handleConfirmation = e => {
      const { onConfirmation, elapsedTime, taskTimeInSeconds } = props;
      if ((taskTimeInput.current.value * 60 > elapsedTime) && (taskTimeInput.current.value * 60 !== taskTimeInSeconds)) {
         e.preventDefault();
         onConfirmation(titleInput.current.value, taskTimeInput.current.value)
      } else {
         alert(`wprowadzony czas nie może byc mniejszy od ${(elapsedTime / 60).toFixed(2)} min. oraz musi być inny niż wprowadzony czas początkowy`);
      }
   }

   const { title, taskTimeInSeconds, isEditable, } = props;

   return (
      <div
         className={isEditable ? "TimeboxEditor" : "TimeboxEditor inactive"}
      >
         <label htmlFor="taskInput">Co robisz?</label>
         <input
            id="taskInput"
            type="text"
            defaultValue={title}
            ref={titleInput}
         />
         <br />
         <label htmlFor="timeInput">Ile minut?</label>
         <input
            id="timeInput"
            type="number"
            defaultValue={taskTimeInSeconds / 60}
            ref={taskTimeInput}
         />
         <br />
         <button disabled={!isEditable} onClick={handleConfirmation}>
            Zatwierdź zmiany
            </button>
      </div>
   );
}

export default TimeboxEditor;
