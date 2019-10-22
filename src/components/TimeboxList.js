import React, { Suspense, useState, useEffect } from "react";
import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary";
import ErrorMessage from "./ErrorMessage";
import TimeboxesAPI from "../api/AxiosTimeboxesApi"
import AuthenticationContext from "../context/AuthenticationContext";
const Timebox = React.lazy(() => import("./Timebox"));


function TimeboxList() {
   // state = {
   //    timeboxes: [],
   //    editInput: "",
   //    hasError: false,
   //    loadingError: false,
   //    loading: true,
   // };

   const [state, useState] = useState({
      timeboxes: [],
      editInput: "",
      hasError: false,
      loadingError: false,
      loading: true
   })

   componentDidMount() {
      TimeboxesAPI.setAccessToken(context.accessToken);
      TimeboxesAPI.getAllTimeboxes(context.accessToken).then(
         (timeboxes) => setState({ timeboxes })
      ).catch(
         (error) => {
            console.log(`Wystąpił błąd : ${error}`);
            setState({ loadingError: true });
         }
      ).finally(
         () => setState({ loading: false })
      )
   }

   const handleCreate = createdTimebox => {
      try {
         addTimebox(createdTimebox, context.accessToken);
      }
      catch (error) {
         console.log("metoda addTimebox wyrzuciła błąd");
         setState({ hasError: true });
      }

   };

   const addTimebox = timebox => {
      //!WEEK8 LESSON4
      // import("../api/AxiosTimeboxesApi").then(TimeboxesAPI => {
      //     TimeboxesAPI.addTimebox(timebox, context.accessToken).then(
      //         (addedTimebox) => setState(prevState => {
      //             const timeboxes = [...prevState.timeboxes, addedTimebox];
      //             return {
      //                 timeboxes: timeboxes
      //             };
      //         })
      //     )
      // })
      TimeboxesAPI.addTimebox(timebox, this.context.accessToken).then(
         (addedTimebox) => setState(prevState => {
            const timeboxes = [...prevState.timeboxes, addedTimebox];
            return {
               timeboxes: timeboxes
            };
         })
      )

   };

   const removeTimebox = indexToRemove => {
      TimeboxesAPI.removeTimebox(state.timeboxes[indexToRemove], this.context.accessToken)
         .then(() => {
            setState(prevState => {
               const timeboxes = prevState.timeboxes.filter(
                  (timebox, index) => index !== indexToRemove
               );
               return {
                  timeboxes: timeboxes
               };
            });
         })
   };

   const updateArray = (array, index, value) => {
      array.splice(index, 1);
      array.splice(index, 0, value);
      return array;
   };

   const editTimebox = (indexToChange, timeboxToEdit) => {
      TimeboxesAPI.replaceTimebox(timeboxToEdit)
         .then(() => {
            setState(prevState => {
               const timeboxes = prevState.timeboxes;
               updateArray(timeboxes, indexToChange, timeboxToEdit);
               return {
                  timeboxes: timeboxes,
                  editInput: ""
               };
            });
         }
         )
   };

   const changeTitle = e => {
      setState({
         editInput: e.target.value
      });
   };

   const { timeboxes, editInput, hasError, loading, loadingError } = state;
   return (
      <>
         <ErrorMessage hasError={hasError} message="timebox creator przestał działać">
            <TimeboxCreator onCreate={handleCreate} />
         </ErrorMessage>
         <ErrorMessage hasError={loadingError} message="Nie udało się załadować timeboxów">
            <h2>{loading ? "loading timeboxes..." : null}</h2>
            {
               timeboxes.map((timebox, index) => (
                  <ErrorBoundary key={timebox.id} message="Coś się wywaliło w Timeboxie">
                     <Suspense fallback={<div>Loading...</div>}>
                        <Timebox
                           title={timebox.title}
                           taskTime={timebox.taskTime}
                           onDelete={() => removeTimebox(index)}
                           onEdit={() =>
                              editTimebox(index, {
                                 ...timebox,
                                 title: editInput
                              })
                           }
                           onChange={changeTitle}
                        />
                     </Suspense>
                  </ErrorBoundary>
               ))
            }
         </ErrorMessage>
      </>
   ); const
}

TimeboxList.contextType = AuthenticationContext;

export default TimeboxList;
