import React from 'react';
import {Modal,Button} from 'semantic-ui-react';

class StoreDeleteModal extends React.Component {

  constructor(props) 
  {
    super(props);
  }
        
    deleteHandler = e => {
  //Check whether the customer has got a sales record or not,
  //if he has, don't delete it   
  if(this.props.storeSales.length===0){
        fetch("api/Stores/"+this.props.strId, {
          method: 'DELETE',
          headers: {  'Accept':'application/json',
                      'Content-Type': 'application/json'},
          body: JSON.stringify({storeId:this.props.strId})
      }).then(function(response) {
        console.log(response)
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
    
      }).catch(function(err) {
          console.log(err)
      });
    
        this.props.closeDelete();
    }
    else{
      alert("The store which has a record of sale cannot be deleted.")};
}

    render(){
        return(
            <div>
            <Modal size={'small'} open={this.props.openDelete}>
              <Modal.Header><strong>Delete Store</strong></Modal.Header>
              <Modal.Content>
                <p><strong>Are you sure you?</strong></p>
              </Modal.Content>
              <Modal.Actions>
                <Button 
                onClick={this.props.closeDelete}
                color={'black'}
                >No</Button>
                <Button
                  onClick={this.deleteHandler}
                  color={'red'}
                  icon='x icon'
                  labelPosition='right'
                  content='Delete'
                />
              </Modal.Actions>
            </Modal>
          </div>
        )
    }

}
export default StoreDeleteModal;