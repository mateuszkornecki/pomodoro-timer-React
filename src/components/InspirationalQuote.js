import React from 'react';
class InspirationalQuote extends React.Component {

    state = {
        quote: null
    }

    componentDidMount() {
        import('inspirational-quotes').then(
            (Quotes) => {
                this.setState({
                    quote: Quotes.getQuote()
                })
            }
        ).catch(err => console.log(err, "Couldn't load inspirational-quotes library"))

    }

    render() {
        return (
            <>
                {
                    this.state.quote ?
                        <figure>
                            <figcaption><cite>{this.state.quote.author}</cite></figcaption>
                            <blockquote>{this.state.quote.text}</blockquote>
                        </figure >
                        :
                        "Loading quote..."
                }
            </>
        )
    }
}

export default InspirationalQuote;