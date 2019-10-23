import React, { Suspense, useState, useEffect, useContext } from "react";
import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary";
import ErrorMessage from "./ErrorMessage";
import TimeboxesAPI from "../api/AxiosTimeboxesApi"
import AuthenticationContext from "../context/AuthenticationContext";
const Timebox = React.lazy(() => import("./Timebox"));

function TimeboxList() {

   const [state, setState] = useState({
      timeboxes: [],
      editInput: "",
      hasError: false,
      loadingError: false,
      loading: true
   })

   const context = useContext(AuthenticationContext);

   //! WEEK8 useEffect fix: nie używać jednego useState, ew użyć prevState
   useEffect(() => {
      TimeboxesAPI.setAccessToken(context.accessToken);
      TimeboxesAPI.getAllTimeboxes(context.accessToken).then(
         (timeboxes) => {
            setState(prevState => {
               return {
                  ...prevState,
                  timeboxes
               }
            });
         }
      ).catch(
         (error) => {
            console.log(`Wystąpił błąd : ${error}`);
            setState(prevState => {
               return {
                  ...prevState,
                  loadingError: true
               }
            });
         }
      ).finally(
         () => {
            setState(prevState => {
               return {
                  ...prevState,
                  loading: false
               }
            });
         }
      )
   }, [])

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
      import("../api/AxiosTimeboxesApi").then(TimeboxesAPI => {
         TimeboxesAPI.default.addTimebox(timebox, context.accessToken).then(
            (addedTimebox) => setState(prevState => {
               const timeboxes = [...prevState.timeboxes, addedTimebox];
               return {
                  timeboxes: timeboxes
               };
            })
         )
      })
   };

   const removeTimebox = indexToRemove => {
      TimeboxesAPI.removeTimebox(state.timeboxes[indexToRemove], context.accessToken)
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
      let inputValue = e.target.value;
      setState(prevState => {
         return {
            ...prevState,
            editInput: inputValue
         }
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
   );
}

export default TimeboxList;
