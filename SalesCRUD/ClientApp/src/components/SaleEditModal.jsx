import React from 'react';
import {Modal,Dropdown,Button} from 'semantic-ui-react'

class SaleEditModal extends React.Component {
  constructor(props) 
  {
    super(props);
    this.state = { customers:[], products:[],stores:[], 
      customerId:this.props.customerId,
      productId:this.props.productId, 
      storeId:this.props.storeId,
      dateSold:this.props.dateSold};
    
    this.submitHandler=this.submitHandler.bind(this);
    this.changeHandler=this.changeHandler.bind(this);
  }

  componentDidMount()
  { 
      this.fetchCustomers();
      this.fetchStores();
      this.fetchProducts();
  }


  
  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    this.putSale(e);
   // this.setState(initialState);
    this.props.closeEdit();
  };

    changeHandler= (e) =>{
      this.setState({[e.target.name]:e.target.value})
    }

putSale(e)
{
fetch("api/Sales/"+this.props.saleId, {
    method: 'PUT',
    headers: {  'Accept':'application/json',
                'Content-Type': 'application/json'},
    body: JSON.stringify({saleId:this.props.saleId,
                          customerId:this.state.customerId,
                          productId:this.state.productId,
                          storeId:this.state.storeId,
                          dateSold:this.state.dateSold})
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

fetchCustomers() 
{
    fetch("api/Customers")
        .then(response => response.json())
        .then(data =>
            this.setState({
                customers: data,
                isLoading: false,
            })
        )
        .catch(error => this.setState({ error, isLoading: false }));      
}

fetchProducts() 
{
    fetch("api/Products")
        .then(response => response.json())
        .then(data =>
            this.setState({
                products: data,
                isLoading: false,
            })
        )
        .catch(error => this.setState({ error, isLoading: false }));      
}

fetchStores() 
{
    fetch("api/Stores")
        .then(response => response.json())
        .then(data =>
            this.setState({
                stores: data,
                isLoading: false,
            })
        )
        .catch(error => this.setState({ error, isLoading: false }));      
}


  render() {
    const{customerId,productId,storeId,customers,products,stores,dateSold}=this.state
    const customerOptions = customers.map(cus => ({
        key: cus.customerId,
        text: cus.customerName,
        value: cus.customerId,
      }))
    
    const productOptions = products.map(pro => ({
        key: pro.productId,
        text: pro.productName,
        value: pro.productId,
      }))
      
    const storeOptions = stores.map(str => ({
        key: str.storeId,
        text: str.storeName,
        value: str.storeId,
      }))
    
    return (
      <div>
        <Modal
          open={this.props.openEdit}
        >
          <Modal.Header>Edit Sale</Modal.Header>
          <Modal.Content>
              <form onSubmit={this.submitHandler} className="ui form" id="create-form">
                <div>
                  <label><strong>DATE</strong></label>
                  <br></br>
                  <input type="date" name="dateSold" value={dateSold} required onChange={this.changeHandler} />
                </div>
                <div>
                  <label><strong>CUSTOMER</strong></label>
                  <br></br>
                  <Dropdown placeholder='Customer' closeOnChange  selection fluid name="customerId"
                     onChange={(e,data) => this.setState( { customerId: data.value})} options={customerOptions} 
                     value={customerId}
                  />
                </div>
                <br></br>
                <div>
                  <label><strong>PRODUCT</strong></label>
                  <br></br>
                  <Dropdown placeholder='Product'closeOnChange selection fluid name="productId" 
                    onChange={(e,data) => this.setState( { productId: data.value})} options={productOptions} 
                    value={productId} />
               
                </div>
                <br></br>
                <div>
                  <label><strong>STORE</strong></label>
                  <br></br>
                  <Dropdown placeholder='Store' closeOnChange selection fluid  name="storeId" 
                    onChange={(e,data) => this.setState( {storeId: data.value})} options={storeOptions}
                    value={storeId} 
                      />
                </div>
                {console.log(this.state.customerId)}
              </form>
        </Modal.Content>
        <Modal.Actions>
          <Button 
          onClick={this.props.closeEdit}
          color={'black'}
          >No</Button>
          <Button
            type='submit'
            form='create-form'
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


export default SaleEditModal;
