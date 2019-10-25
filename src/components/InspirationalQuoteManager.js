import React, { useState, useEffect } from 'react';
import InspirationalQuotePresentational from './InspirationalQuotePresentational';
function InspirationalQuoteManager({ render }) {

   const [quote, setQuote] = useState(null);

   useEffect(() => {
      import('inspirational-quotes').then(
         (Quotes) => {
            setQuote(Quotes.getQuote())
         }
      ).catch(err => console.log(err, "Couldn't load inspirational-quotes library"))
   }, [quote])


   const renderBlueInspirationalQuote = (quote) => {
      return (<>
         {quote ?
            <figure>
               <figcaption><cite style={{ color: "deepskyblue", fontWeight: "bold" }}>{quote.author}</cite></figcaption>
               <blockquote style={{ fontStyle: "italic" }}>{quote.text}</blockquote>
            </figure>
            :
            "Loading quote..."}
      </>);
   }

   const renderRedInspirationalQuote = (quote) => {
      return (<>
         {quote ?
            <figure>
               <figcaption><cite style={{ color: "tomato", fontWeight: "bold" }}>{quote.author}</cite></figcaption>
               <blockquote style={{ fontStyle: "italic" }}>{quote.text}</blockquote>
            </figure>
            :
            "Loading quote..."}
      </>);
   }

   return <InspirationalQuotePresentational quote={quote} render={Math.random() < 0.5 ? renderRedInspirationalQuote : renderBlueInspirationalQuote} />
}

export default InspirationalQuoteManager;

