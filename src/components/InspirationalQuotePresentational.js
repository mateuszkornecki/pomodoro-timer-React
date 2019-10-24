import React from 'react';

function InspirationalQuotePresentational({ quote }) {

   return (<>
      {quote ?
         <figure>
            <figcaption><cite>{quote.author}</cite></figcaption>
            <blockquote>{quote.text}</blockquote>
         </figure>
         :
         "Loading quote..."}
   </>);
}

export default InspirationalQuotePresentational;