import React from 'react';
import {Modal,Form,Button} from 'semantic-ui-react';


const initialState={
  productName:"",
  productPrice:""
};


class ProductEditModal extends React.Component {
  constructor(props) 
  {
    super(props);
    this.state = {initialState};
    this.submitHandler=this.submitHandler.bind(this);
      
  }
  
  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    fetch("api/Products/"+this.props.proId, {
      method: 'PUT',
      headers: {  'Accept':'application/json',
                  'Content-Type': 'application/json'},
      body: JSON.stringify({productId:this.props.proId,
                            productName:e.target.productName.value,
                            productPrice:Number(e.target.productPrice.value)})
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

  changeHandlerName= e =>{
    this.setState({[e.target.name]:e.target.value})
  }

  changeHandlerPrice= e => {
    this.setState({[e.target.name]:Number(e.target.value)})
  }
  



  render() {
    const{productName,productPrice}=this.state
    return (
      <div>
      <Modal size="small" open={this.props.openEdit}>
        <Modal.Header><strong>Edit Product</strong></Modal.Header>
        <Modal.Content>
          <Form id="edit-form" onSubmit={this.submitHandler}>
            <Form.Field>
              <label><strong>NAME</strong>
                <input  type="text" placeholder='NAME' name="productName" value={productName} 
                defaultValue={this.props.proName}/></label>
            </Form.Field>
            <Form.Field>
                <label><strong>PRICE</strong>
                <input type="number" placeholder='PRICE' name="productPrice" step="0.0001" value={productPrice} 
                defaultValue={this.props.proPrice} /></label>
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

export default ProductEditModal;
