import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    myInput = React.createRef();


    goToStore = (event) => {
        //Stop form submitting
        event.preventDefault();
        //get text from input
        const storeName = this.myInput.current.value;
        //change the page to /store/whatever-they-entered
        this.props.history.push(`/store/${storeName}`);
    }

    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter a Store</h2>
                <input type="text" required placeholder='Find a Store' defaultValue={getFunName()} ref={this.myInput} />
                <button type='submit'>Find a Store &rarr;</button>
            </form>
        )
    }
}

export default StorePicker;