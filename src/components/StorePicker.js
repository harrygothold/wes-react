import React from 'react';

class StorePicker extends React.Component {
    render() {
        return (
            <form className="store-selector">
                <h2>Please Enter a Store</h2>
                <input type="text" required placeholder='Find a Store' />
                <button type='submit'>Find a Store &rarr;</button>
            </form>
        )
    }
}

export default StorePicker;