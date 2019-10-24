import React, { useState, useEffect } from 'react';
import InspirationalQuotePresentational from './InspirationalQuotePresentational';
function InspirationalQuoteManager() {

   const [quote, setQuote] = useState(null);

   useEffect(() => {
      import('inspirational-quotes').then(
         (Quotes) => {
            setQuote(Quotes.getQuote())
         }
      ).catch(err => console.log(err, "Couldn't load inspirational-quotes library"))
   }, [quote])

   return <InspirationalQuotePresentational quote={quote} />
}

export default InspirationalQuoteManager;

