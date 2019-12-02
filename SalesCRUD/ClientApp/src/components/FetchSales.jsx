import React, { Component } from 'react';
import 'semantic-ui/dist/semantic.min.css';
import SaleModal from './SaleModal';
import SaleEditModal from './SaleEditModal';
import SaleDeleteModal from './SaleDeleteModal';
import { ButtonGroup } from 'semantic-ui-react';
import Pagination from './Pagination';


export class FetchSales extends Component 
{
    constructor() {
        super();
        this.state = { sales: [], isloading: true, error: null, isShowing:false,
                       isShowingEdit:false,isShowingDelete:false,isShowingSale:false,
                       rows:[], currentPage:1, salesPerPage:4,isOldestFirst:true
                     }
        
        this.close=this.close.bind(this);
        this.closeEdit=this.closeEdit.bind(this);
        this.closeDelete=this.closeDelete.bind(this);

    }
        close = () => this.setState({ isShowing: false});
        closeEdit = () => this.setState({ isShowingEdit: false});
        closeDelete= () => this.setState({isShowingDelete:false});
        closeSale= () => this.setState({isShowingSale:false});
        setStores= (rowNumber) => this.setState({rows:rowNumber});
        setStoresPerPage= (quantity) =>this.setState({storesPerPage:quantity});
        paginate= (pageNumber) => this.setState({currentPage:pageNumber});

    componentDidMount() {
        this.fetchSales();
    }

    componentDidUpdate(){
       //???? this.fetchSales();
    }

    //Necessary for the related data sorting
    findClassName(key){
        var text=""
        switch(key) {
            case "customerName":text = "customer";break;
            case "productName":text = "product";break;
            case "storeName":text = "store";break;
            default:text = "";}
            return text;
          }

    compareBy(key) {
        if(key==="customerName"||key==="productName" || key==="storeName"){
            let theclass=this.findClassName(key);
            return function (a, b) {

                if (a[theclass][key] < b[theclass][key]) return -1;
                if (a[theclass][key] > b[theclass][key]) return  1;
                return 0;
              };
        }
        else{
        return function (a, b) {

          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return  1;
          return 0;
        };
      }
    }

    compareByReverse(key) {
        if(key==="customerName"||key==="productName" || key==="storeName"){
            let theclass=this.findClassName(key);
            return function (a, b) {

                if (a[theclass][key] > b[theclass][key]) return -1;
                if (a[theclass][key] < b[theclass][key]) return  1;
                return 0;
              };
        }

        else{

        return function (a, b) {

          if (a[key] > b[key]) return -1;
          if (a[key] < b[key]) return  1;
          return 0;
        };
      }
    }
   

    sortBy(key) 
    {
        let arrayCopy = [...this.state.sales];
        if(this.state.isOldestFirst){arrayCopy.sort(this.compareBy(key));}
        else{arrayCopy.sort(this.compareByReverse(key));}

        this.setState({
            isOldestFirst: !this.state.isOldestFirst,
            sales: arrayCopy
          })
    }

    fetchSales() 
    {
        // Where we're fetching data from
        fetch("api/Sales")
            // We get the API response and receive data in JSON format...
            .then(response => response.json())
            // ...then we update the users state
            .then(data =>
                this.setState({
                    sales: data,
                    isLoading: false,
                })
            )
            // Catch any errors we hit and update the app
            .catch(error => this.setState({ error, isLoading: false }));      
    }

    render() 
    {    
        const{sales,currentPage,salesPerPage}=this.state;
        const indexOfLastSale=currentPage*salesPerPage;
        const indexOfFirstSale=indexOfLastSale-salesPerPage;
        const currentSales=sales.slice(indexOfFirstSale,indexOfLastSale) ;   
        return <div> 
            <ButtonGroup>
                <button className="ui primary button" onClick={()=> this.setState({isShowing:true})}>
                    New Sale</button>
            </ButtonGroup> 
            <SaleModal show={this.state.isShowing} onclose={this.close}/>
             
            <table className="ui table">
            <thead>
                <tr>
                    <th onClick={() => this.sortBy('customerName')}>Customer
                        <i aria-hidden="true" className="sort icon"></i></th>
                    <th onClick={() => this.sortBy('productName')}>Product
                        <i aria-hidden="true" className="sort icon"></i></th>
                    <th onClick={() => this.sortBy('storeName')}>Store
                        <i aria-hidden="true" className="sort icon"></i></th>
                    <th onClick={() => this.sortBy('dateSold')}>Date Sold
                        <i aria-hidden="true" className="sort icon"></i></th>
                    <th>Actions</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {  currentSales.map(sale =>  
                        <tr key={sale.saleId}> 
                            <td>{sale.customer.customerName}</td>
                            <td>{sale.product.productName}</td>
                            <td>{sale.store.storeName}</td>
                            <td>{sale.dateSold.slice(0,10)}</td>
                            <td>
                            <button onClick={()=> this.setState({isShowingEdit:true,saleId:sale.saleId,
                            customerId: sale.customerId, productId:sale.productId, 
                            storeId:sale.storeId,dateSold:sale.dateSold
                            })} 
                            className="ui yellow button"><i aria-hidden="true" className="edit icon"
                            ></i>Edit</button>{console.log(this.state)}
                            </td>
                            <td><button onClick={()=> this.setState({isShowingDelete:true,
                            saleId:sale.saleId})} 
                            className="ui red button"><i aria-hidden="true" className="trash icon"
                            ></i>Delete</button></td>     
                        </tr>
                    )
                }
            </tbody>
        </table>
                
            <Pagination
                rowsPerPage={salesPerPage}
                totalPosts={this.state.sales.length}
                paginate={this.paginate}/>
            
            <SaleEditModal openEdit={this.state.isShowingEdit} 
                closeEdit={this.closeEdit} 
                saleId={this.state.saleId}
                dateSold={this.state.dateSold}
                customerId={this.state.customerId}
                productId={this.state.productId}
                storeId={this.state.storeId}/>

            <SaleDeleteModal 
                openDelete={this.state.isShowingDelete} 
                closeDelete={this.closeDelete} 
                saleId={this.state.saleId}/>
        </div> 
    }
            
}   
