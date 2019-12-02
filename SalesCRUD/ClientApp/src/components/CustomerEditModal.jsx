import React from 'react';
import {Modal,Form,Button} from 'semantic-ui-react';


const initialState={
  customerName:"",
  customerAddress:""
};


class CustomerEditModal extends React.Component {
  constructor(props) 
  {
    super(props);
    this.state = {initialState};
    this.submitHandler=this.submitHandler.bind(this);    
  }
  
  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);

    //const{customerId}=this.state
    fetch("api/Customers/"+this.props.cusId, {
      method: 'PUT',
      headers: {  'Accept':'application/json',
                  'Content-Type': 'application/json'},
      body: JSON.stringify({customerId:this.props.cusId,
                            customerName:e.target.customerName.value,
                            customerAddress:e.target.customerAddress.value})
  }).then(function(response) {
    console.log(response)
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();

  }).catch(function(err) {
      console.log(err)
  });

    this.props.closeEdit();
  };

  /*changeHandler= e =>{
    this.setState({customerId:this.props.cusId},{[e.target.name]:e.target.value})
  }*/

  render() {
    const{customerName,customerAddress}=this.state
    return (
      <div>
      <Modal size="small" open={this.props.openEdit}>
        <Modal.Header><strong>Edit Customer</strong></Modal.Header>
        <Modal.Content>
          <Form id="edit-form" onSubmit={this.submitHandler}>
            <Form.Field>
              <label><strong>NAME</strong></label>
                <input  type="text" placeholder='NAME' name="customerName" value={customerName} 
                defaultValue={this.props.cusName}/>
            </Form.Field>
            <Form.Field>
                <label><strong>ADDRESS</strong></label>
                <input type="text" placeholder='ADDRESS' name="customerAddress" value={customerAddress} 
                defaultValue={this.props.cusAddress}/>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button 
          onClick={this.props.closeEdit}
          color={'black'}
          >No</Button>
          <Button
            type='submit'
            form='edit-form'
            color={'green'}
            icon='checkmark'
            labelPosition='right'
            content='Edit'
          />
        </Modal.Actions>
      </Modal>
    </div>
    )
  }
}

export default CustomerEditModal;
