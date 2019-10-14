import React from 'react';
import Header from "./Header";
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import ErrorBoundary from "./ErrorBoundary";


function AuthenticatedApp({ onLogout }) {

    return (
        <>
            <Header onLogout={onLogout} />
            <TimeboxList />
            <ErrorBoundary message="wystąpił błąd komponentu EditableTimebox">
                <EditableTimebox />
            </ErrorBoundary>
        </>
    )
}

export default AuthenticatedApp;