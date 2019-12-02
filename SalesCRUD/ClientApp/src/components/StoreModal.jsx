import React from 'react';
import {Modal} from 'semantic-ui-react'

const initialState={
  storeName:"",
  storeAddress:""
};

class StoreModal extends React.Component {
  constructor(props) 
  {
    super(props);
    this.state = {storeName:"",
    storeAddress:""};
    this.submitHandler=this.submitHandler.bind(this);
  }
  
  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    this.postStore();
    this.setState(initialState);
    this.props.onclose();
  };

  changeHandler= e =>{
    this.setState({[e.target.name]:this.titleCase(e.target.value)})
  }

  //inputs start with capital letter
  titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }

  postStore()
  {

    fetch("api/Stores", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state)
            }).then(function(response) {
              console.log(response)
                if (response.status >= 400) {
                  throw new Error("Bad response from server");
                }
                return response.json();

            }).catch(function(err) {
                console.log(err)
            });
  }

  render() {
    const{storeName,storeAddress}=this.state
    return (
      <div>
        <Modal
          open={this.props.show}
        >
          <Modal.Header>Create Store</Modal.Header>
          <Modal.Content>
              <form onSubmit={this.submitHandler} className="ui form">
                <div>
                  <label><strong>NAME</strong></label>
                  <br></br>
                  <input type="text" name="storeName" value={storeName} required onChange={this.changeHandler}/>
                </div>
                <br></br>
                <div>
                  <label><strong>ADDRESS</strong></label>
                  <br></br>
                  <input type="text" name="storeAddress" value={storeAddress} required onChange={this.changeHandler}/>
                </div>
                <br></br>
                <button type="submit" className="ui right floated green button" >Create</button>
                <button className="ui right floated black button" onClick={this.props.onclose}>Close</button>
              </form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default StoreModal;