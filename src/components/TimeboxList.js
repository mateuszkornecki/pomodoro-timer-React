import React, { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import ErrorMessage from "./ErrorMessage";
import { Timebox } from "./TimeboxManager";

function TimeboxList({ timeboxes, onTimeboxDelete, onTimeboxEdit, onTimeboxTitleChange, editInput, onLoadingError, onLoading }) {

   return (<ErrorMessage hasError={onLoadingError} message="Nie udało się załadować timeboxów">
      <h2>{onLoading ? "loading timeboxes..." : null}</h2>
      {timeboxes.map((timebox, index) => (<ErrorBoundary key={timebox.id} message="Coś się wywaliło w Timeboxie">
         <Suspense fallback={<div>Loading...</div>}>
            <Timebox title={timebox.title} taskTime={timebox.taskTime} onDelete={() => onTimeboxDelete(index)} onEdit={() => onTimeboxEdit(index, {
               ...timebox,
               title: editInput
            })} onChange={onTimeboxTitleChange} />
         </Suspense>
      </ErrorBoundary>))}
   </ErrorMessage>);
}

export default TimeboxList;