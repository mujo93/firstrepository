import React from 'react';
import {Modal} from 'semantic-ui-react'

const initialState={
  productName:"",
  productPrice:""
};

class ProductModal extends React.Component {
  constructor(props) 
  {
    super(props);
    this.state = { productName:"", productPrice:""};
    this.submitHandler=this.submitHandler.bind(this);
  }
  
  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    fetch("api/Products", {
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
    this.setState(initialState);
    this.props.onclose();
  };

  changeHandler= e =>{
    this.setState({[e.target.name]:this.titleCase(e.target.value)})
  };

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
 


  render() {
    const{productName,productPrice}=this.state
    return (
      <div>
        <Modal
          open={this.props.show}
        >
          <Modal.Header>Create Product</Modal.Header>
          <Modal.Content>
              <form onSubmit={this.submitHandler} className="ui form">
                <div>
                  <label><strong>NAME</strong></label>
                  <br></br>
                  <input type="text" name="productName" value={productName} required  onChange={this.changeHandler}/>
                </div>
                <br></br>
                <div>
                  <label><strong>PRICE</strong></label>
                  <br></br>
                  <input type="number" name="productPrice" value={productPrice} required step="0.1" onChange={(e) => this.setState( 
                { productPrice: Number(e.target.value )})} />
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

export default ProductModal;