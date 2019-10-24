import React, { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import ErrorMessage from "./ErrorMessage";

function TimeboxList({ timeboxes, onLoadingError, onLoading, renderTimebox }) {

   return (
      <ErrorMessage hasError={onLoadingError} message="Nie udało się załadować timeboxów">
         <h2>{onLoading ? "loading timeboxes..." : null}</h2>
         {timeboxes.map((timebox, index) => (
            <ErrorBoundary key={timebox.id} message="Coś się wywaliło w Timeboxie">
               <Suspense fallback={<div>Loading...</div>}>
                  {renderTimebox(timebox, index)}
               </Suspense>
            </ErrorBoundary>))}
      </ErrorMessage>);
}

export default TimeboxList;