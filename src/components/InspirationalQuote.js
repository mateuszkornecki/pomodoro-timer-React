import React from 'react';
import Quotes from 'inspirational-quotes';

const { text, author } = Quotes.getQuote();
class InspirationalQuote extends React.Component {

    render() {
        return (
            <figure>
                <figcaption><cite>{author}</cite></figcaption>
                <blockquote>{text}</blockquote>
            </figure >

        )
    }
}

export default InspirationalQuote;