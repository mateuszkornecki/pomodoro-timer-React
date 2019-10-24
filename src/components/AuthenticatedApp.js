import React from 'react';
import Header from "./Header";
import TimeboxManager from "./TimeboxManager";
import EditableTimebox from "./EditableTimebox";
import ErrorBoundary from "./ErrorBoundary";
import InspirationalQuote from "./InspirationalQuote";


function AuthenticatedApp() {

   return (
      <>
         <Header />
         <TimeboxManager />
         <ErrorBoundary message="wystąpił błąd komponentu EditableTimebox">
            <EditableTimebox />
         </ErrorBoundary>
         <InspirationalQuote />
      </>
   )
}

export default AuthenticatedApp;