import React, { Component } from 'react';
import 'semantic-ui/dist/semantic.min.css';
import StoreModal from './StoreModal';
import StoreEditModal from './StoreEditModal';
import StoreDeleteModal from './StoreDeleteModal'
import { ButtonGroup } from 'semantic-ui-react';
import Pagination from './Pagination';


export class FetchStores extends Component 
{
    constructor() 
    {
        super();
        this.state = {  stores: [], isloading: true, error: null, 
                        isShowing:false,isShowingEdit:false,isShowingDelete:false,
                        rows:[], currentPage:1, storesPerPage:4,isOldestFirst:true}
        this.close=this.close.bind(this);
        this.closeEdit=this.closeEdit.bind(this);
        this.closeDelete=this.closeDelete.bind(this);

    }
        close = () => this.setState({ isShowing: false});
        closeEdit = () => this.setState({ isShowingEdit: false});
        closeDelete= () => this.setState({isShowingDelete:false});
        setStores= (rowNumber) => this.setState({rows:rowNumber});
        setStoresPerPage= (quantity) =>this.setState({storesPerPage:quantity});
        paginate= (pageNumber) => this.setState({currentPage:pageNumber});

    componentDidMount() 
    {
        this.fetchStores();
    }

    componentDidUpdate()
    {
       // this.fetchStores();
    }

    compareBy(key) 
    {
        return function (a, b) {

          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        };
    }

    compareByReverse(key) 
    {
        return function (a, b) {

          if (a[key] > b[key]) return -1;
          if (a[key] < b[key]) return 1;
          return 0;
        };
    }

    sortBy(key) 
    {
        let arrayCopy = [...this.state.stores];
        if(this.state.isOldestFirst)
        {
        arrayCopy.sort(this.compareBy(key));
        }
        else
        {
            arrayCopy.sort(this.compareByReverse(key));
        }

        this.setState({
            isOldestFirst: !this.state.isOldestFirst,
            stores: arrayCopy
          })
    }

    render() 
    {    
        const{stores,currentPage,storesPerPage}=this.state;
        const indexOfLastStore=currentPage*storesPerPage;
        const indexOfFirstStore=indexOfLastStore-storesPerPage;
        const currentStores=stores.slice(indexOfFirstStore,indexOfLastStore) ;  
        return <div> 
            <ButtonGroup>
                <button className="ui primary button" onClick={()=> this.setState({isShowing:true})}>
                    New Store</button>
            </ButtonGroup> 
            <StoreModal show={this.state.isShowing} onclose={this.close}/>
             
            <table className="ui table">
            <thead>
                <tr>
                    <th onClick={() => this.sortBy('storeName')}>Name
                        <i aria-hidden="true" className="sort icon"></i></th>
                    <th onClick={() => this.sortBy('storeAddress')}>Address
                        <i aria-hidden="true" className="sort icon"></i></th>
                    <th>Action</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {  currentStores.map(store =>   
                        <tr key={store.storeId}>
                            <td>{store.storeName}</td>
                            <td>{store.storeAddress}</td>
                            <td>
                            <button onClick={()=> this.setState({isShowingEdit:true,storeId:store.storeId,
                            storeName:store.storeName,storeAddress:store.storeAddress})} 
                            className="ui yellow button"><i aria-hidden="true" className="edit icon"
                            ></i>Edit</button>
                            </td>
                            <td><button onClick={()=> this.setState({isShowingDelete:true,
                            storeId:store.storeId,storeSales:store.sales})} 
                            className="ui red button"><i aria-hidden="true" className="trash icon"
                            ></i>Delete</button></td>     
                        </tr>
                    )
                }
            </tbody>
        </table>

            <Pagination
                rowsPerPage={storesPerPage}
                totalPosts={this.state.stores.length}
                paginate={this.paginate}/>
            
            <StoreEditModal 
                openEdit={this.state.isShowingEdit} 
                closeEdit={this.closeEdit} 
                strId={this.state.storeId}
                strName={this.state.storeName}
                strAddress={this.state.storeAddress}/>

            <StoreDeleteModal 
                openDelete={this.state.isShowingDelete} 
                closeDelete={this.closeDelete} 
                strId={this.state.storeId}
                storeSales={this.state.storeSales}/>

        </div> 
    }

  
    fetchStores() 
    {
        // Where we're fetching data from
        fetch("api/Stores")
            // We get the API response and receive data in JSON format...
            .then(response => response.json())
            // ...then we update the users state
            .then(data =>
                this.setState({
                    stores: data,
                    isLoading: false,
                })
            )
            // Catch any errors we hit and update the app
            .catch(error => this.setState({ error, isLoading: false }));      
    }
}