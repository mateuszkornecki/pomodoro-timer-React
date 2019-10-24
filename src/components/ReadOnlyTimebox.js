import React from "react";

function Timebox({ title, taskTime, onDelete, onEdit, onChange }) {
   if (taskTime <= 0) {
      throw new Error("Czas zadania musi być większy niż zero");
   }

   return (
      <div className="Timebox">
         <h3>
            {title} - {taskTime} min.
         </h3>
      </div>
   );
}

export default Timebox;
