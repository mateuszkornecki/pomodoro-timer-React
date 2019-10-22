import React, { useState, useEffect } from 'react';
function InspirationalQuote() {

   const [quote, setQuote] = useState(null);

   useEffect(() => {
      import('inspirational-quotes').then(
         (Quotes) => {
            setQuote(Quotes.getQuote())
         }
      ).catch(err => console.log(err, "Couldn't load inspirational-quotes library"))
   })
   // componentDidMount() {
   //    import('inspirational-quotes').then(
   //       (Quotes) => {
   //          this.setState({
   //             quote: Quotes.getQuote()
   //          })
   //       }
   //    ).catch(err => console.log(err, "Couldn't load inspirational-quotes library"))

   // }
   return (
      <>
         {
            quote ?
               <figure>
                  <figcaption><cite>{quote.author}</cite></figcaption>
                  <blockquote>{quote.text}</blockquote>
               </figure >
               :
               "Loading quote..."
         }
      </>
   )
}

export default InspirationalQuote;