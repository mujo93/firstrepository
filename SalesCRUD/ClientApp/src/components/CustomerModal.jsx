import React from 'react';
import {Modal} from 'semantic-ui-react'

const initialState={
  customerName:"",
  customerAddress:""
};

class CustomerModal extends React.Component {
  constructor(props) 
  {
    super(props);
    this.state = {customerName:"",
    customerAddress:"", formErrors: {customerName: '', customerAddress: ''}, customerNameValid: false, customerAddressValid: false, formValid: false};
    this.submitHandler=this.submitHandler.bind(this);
  }
  
  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    this.postCustomer();
    this.setState(initialState);
    this.props.onclose();
  };

  changeHandler= e =>{
    this.setState({[e.target.name]:this.titleCase(e.target.value)})
  }

  titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }
 

  postCustomer()
  {

    fetch("api/Customers", {
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
    const{customerName,customerAddress}=this.state
    return (
      <div>
        <Modal
          open={this.props.show}
        >
          <Modal.Header>Create Customer</Modal.Header>
          <Modal.Content>
              <form onSubmit={this.submitHandler} className="ui form">
                <div>
                  <label><strong>NAME</strong></label>
                  <br></br>
                  <input type="text" name="customerName" value={customerName} required onChange={this.changeHandler}/>
                </div>
                <br></br>
                <div>
                  <label><strong>ADDRESS</strong></label>
                  <br></br>
                  <input type="text" name="customerAddress" value={customerAddress} required onChange={this.changeHandler}/>
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

export default CustomerModal;
