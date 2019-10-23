import React, { Suspense, useState, useEffect, useContext } from "react";
import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary";
import ErrorMessage from "./ErrorMessage";
import TimeboxesAPI from "../api/AxiosTimeboxesApi"
import AuthenticationContext from "../context/AuthenticationContext";
const Timebox = React.lazy(() => import("./Timebox"));

function TimeboxList() {

   const [state, setState] = useState({
      editInput: "",
      hasError: false,
      loadingError: false,
      loading: true
   })

   const [timeboxes, setTimeboxes] = useState([]);

   const { accessToken } = useContext(AuthenticationContext);

   //! WEEK8 useEffect fix: nie używać jednego useState, ew użyć prevState
   useEffect(() => {
      TimeboxesAPI.setAccessToken(accessToken);
      TimeboxesAPI.getAllTimeboxes(accessToken).then(
         (timeboxes) => setTimeboxes(timeboxes)
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
   }, [accessToken])

   const handleCreate = createdTimebox => {
      try {
         addTimebox(createdTimebox, accessToken);
      }
      catch (error) {
         console.log("metoda addTimebox wyrzuciła błąd");
         setState({ hasError: true });
      }

   };

   const addTimebox = timebox => {
      import("../api/AxiosTimeboxesApi").then(TimeboxesAPI => {
         TimeboxesAPI.default.addTimebox(timebox, accessToken).then(
            (addedTimebox) => setTimeboxes(prevState => {
               const timeboxes = [...prevState, addedTimebox];
               return timeboxes;
            })
         )
      })
   };

   const removeTimebox = indexToRemove => {
      TimeboxesAPI.removeTimebox(timeboxes[indexToRemove], accessToken)
         .then(() => {
            setTimeboxes(prevState => {
               const timeboxes = prevState.filter(
                  (timebox, index) => index !== indexToRemove
               );
               return timeboxes;
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
            setTimeboxes(prevState => {
               const timeboxes = prevState;
               updateArray(timeboxes, indexToChange, timeboxToEdit);
               return timeboxes;
            });
            setState(prevState => {
               return {
                  ...prevState,
                  editInput: ""
               }
            })
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

   const { editInput, hasError, loading, loadingError } = state;
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
