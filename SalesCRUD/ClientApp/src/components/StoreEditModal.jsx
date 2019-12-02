import React from 'react';
import {Modal,Form,Button} from 'semantic-ui-react';


const initialState={
  storeName:"",
  storeAddress:""
};


class StoreEditModal extends React.Component {
  constructor(props) 
  {
    super(props);
    this.state = {initialState};
    this.submitHandler=this.submitHandler.bind(this);    
  }
  
  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    fetch("api/Stores/"+this.props.strId, {
      method: 'PUT',
      headers: {  'Accept':'application/json',
                  'Content-Type': 'application/json'},
      body: JSON.stringify({storeId:this.props.strId,
                            storeName:e.target.storeName.value,
                            storeAddress:e.target.storeAddress.value})
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
    this.setState({storeId:this.props.cusId},{[e.target.name]:e.target.value})
  }*/

  render() {
    const{storeName,storeAddress}=this.state
    return (
      <div>
      <Modal size="small" open={this.props.openEdit}>
        <Modal.Header><strong>Edit Store</strong></Modal.Header>
        <Modal.Content>
          <Form id="edit-form" onSubmit={this.submitHandler}>
            <Form.Field>
              <label><strong>NAME</strong></label>
                <input  type="text" placeholder='NAME' name="storeName" value={storeName} 
                defaultValue={this.props.strName}/>
            </Form.Field>
            <Form.Field>
                <label><strong>ADDRESS</strong></label>
                <input type="text" placeholder='ADDRESS' name="storeAddress" value={storeAddress} 
                defaultValue={this.props.strAddress}/>
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

export default StoreEditModal;
