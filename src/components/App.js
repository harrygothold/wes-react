import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "../components/Fish";
import base from "../base";

class App extends React.Component {
  /*
   *
   *
   * INITIAL STATE
   *
   */

  state = {
    fishes: {},
    order: {}
  };

  /*
   *
   *
   * LIFECYCLE METHODS
   *
   */

  componentDidMount() {
    //reinstate local storage
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    );
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  /*
   *
   *
   * CUSTOM METHODS
   *
   */

  addFish = fish => {
    // Take a copy of existing state
    const fishes = { ...this.state.fishes };
    // Add new fish to fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // Set the new fishes object to state
    this.setState({
      fishes: fishes
    });
  };

  updateFish = (key, updatedFish) => {
    //take copy of current state
    const fishes = { ...this.state.fishes };
    //update that state
    fishes[key] = updatedFish;
    //set to state
    this.setState({ fishes: fishes });
  };

  deleteFish = key => {
    // take a copy of state
    const fishes = { ...this.state.fishes };
    // update state
    fishes[key] = null;
    //update state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    //Take copy of this
    const order = { ...this.state.order };
    //add to order or update number in order
    order[key] = order[key] + 1 || 1;
    //call setState to update state object
    this.setState({ order });
  };

  removeFromOrder = key => {
    //Take copy of this
    const order = { ...this.state.order };
    //remove item from order
    delete order[key];
    //call setState to update state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
                index={key}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
