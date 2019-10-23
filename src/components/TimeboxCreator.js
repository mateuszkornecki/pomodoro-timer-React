import React, { useRef } from "react";

function TimeboxCreator(props) {
   const form = useRef();

   const handleSubmit = e => {
      const { onCreate } = props;
      e.preventDefault();
      onCreate({
         title: form.current.children.taskInput.value,
         taskTime: form.current.children.timeInput.value
      });
      form.current.children.taskInput.value = "";
      form.current.children.timeInput.value = "";
   };

   return (
      <form
         ref={form}
         onSubmit={handleSubmit}
         className="TimeboxCreator"
      >
         <label htmlFor="taskInput">Co robisz?</label>
         <input id="taskInput" type="text" />
         <br />
         <label htmlFor="timeInput">Ile minut?</label>
         <input id="timeInput" type="number" />
         <br />
         <button> Dodaj Timebox'a</button>
      </form>
   );
}

export default TimeboxCreator;
