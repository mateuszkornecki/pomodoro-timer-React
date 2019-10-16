import React from 'react';
import Header from "./Header";
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import ErrorBoundary from "./ErrorBoundary";
import InspirationalQuote from "./InspirationalQuote";


function AuthenticatedApp() {

    return (
        <>
            <Header />
            <TimeboxList />
            <ErrorBoundary message="wystąpił błąd komponentu EditableTimebox">
                <EditableTimebox />
            </ErrorBoundary>
            <InspirationalQuote />
        </>
    )
}

export default AuthenticatedApp;