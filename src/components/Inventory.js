import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from './Login';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {

  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    })
  }

  authHandler = async (authData) => {
    //Look up the current store in firebase
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    //claim it if there is no owner
    if (!store.owner) {
      //save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    //set the state of the inventory to reflect current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  }

  logoutHandler = async () => {
    console.log('logging out');
    await firebase.auth().signOut();
    this.setState({ uid: null });

  }

  render() {
    const logout = <button onClick={this.logoutHandler}>Log Out!</button>
    //Check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }
    //check if they are not the owner
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are the owner!</p>
          {logout}
        </div>
      )
    }
    //they must be the owner - just render inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
