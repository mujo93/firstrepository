import React, { Component } from 'react';
import 'semantic-ui/dist/semantic.min.css';
import CustomerModal from './CustomerModal';
import CustomerEditModal from './CustomerEditModal';
import CustomerDeleteModal from './CustomerDeleteModal';
import Pagination from './Pagination';
import { ButtonGroup } from 'semantic-ui-react';



export class FetchCustomers extends Component 
{
    constructor() 
    {
        super();
        this.state = { customers: [], isloading: true, error: null, isShowing:false,
        isShowingEdit:false,isShowingDelete:false,rows:[], currentPage:1, customersPerPage:4,
        isOldestFirst:true}
        
        this.close=this.close.bind(this);
        this.closeEdit=this.closeEdit.bind(this);
        this.closeDelete=this.closeDelete.bind(this);
        this.compareBy.bind(this);
        this.sortBy.bind(this);

    }
        
        close = () => this.setState({ isShowing: false});
        closeEdit = () => this.setState({ isShowingEdit: false})
        closeDelete= () => this.setState({isShowingDelete:false})
        setCustomers= (rowNumber) => this.setState({rows:rowNumber})
        setCustomersPerPage= (quantity) =>this.setState({customersPerPage:quantity})
        paginate= (pageNumber) => this.setState({currentPage:pageNumber})
        
    componentDidMount() 
    {
        this.fetchCustomers();
    }

    componentDidUpdate()
    {
        //this.fetchCustomers();
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
        let arrayCopy = [...this.state.customers];
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
            customers: arrayCopy
          })
    }

    render() 
    {   
        const{customers,currentPage,customersPerPage}=this.state;
        const indexOfLastCustomer=currentPage*customersPerPage;
        const indexOfFirstCustomer=indexOfLastCustomer-customersPerPage;
        const currentCustomers=customers.slice(indexOfFirstCustomer,indexOfLastCustomer) ;    
    
        return <div> 
            <ButtonGroup>
                <button className="ui primary button" onClick={()=> this.setState({isShowing:true})}>
                    New Customer</button>
            </ButtonGroup> 
                      
            <table className="ui table">
            <thead>
                <tr>
                <th onClick={() => this.sortBy('customerName')}>Name
                    <i aria-hidden="true" className="sort icon"></i></th>
                <th onClick={() => this.sortBy('customerAddress')}>Address
                    <i aria-hidden="true" className="sort icon"></i></th>
                <th>Action</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {  currentCustomers.map(customer =>   
                        <tr key={customer.customerId}>
                            <td>{customer.customerName}</td>
                            <td>{customer.customerAddress}</td>
                            <td>
                            <button onClick={()=> this.setState({isShowingEdit:true,customerId:customer.customerId,
                            customerName:customer.customerName,customerAddress:customer.customerAddress})} 
                            className="ui yellow button"><i aria-hidden="true" className="edit icon"
                            ></i>Edit</button>
                            </td>
                            <td><button onClick={()=> this.setState({isShowingDelete:true,
                            customerId:customer.customerId, customerSales:customer.sales})} 
                            className="ui red button"><i aria-hidden="true" className="trash icon"
                            ></i>Delete</button></td>     
                        </tr>
                    )
                }
            </tbody>
        </table>
            <Pagination
                rowsPerPage={customersPerPage}
                totalPosts={this.state.customers.length}
                paginate={this.paginate}/>

            <CustomerModal show={this.state.isShowing} onclose={this.close}/>

            <CustomerEditModal openEdit={this.state.isShowingEdit} 
            closeEdit={this.closeEdit} 
            cusId={this.state.customerId}
            cusName={this.state.customerName}
            cusAddress={this.state.customerAddress}/>

            <CustomerDeleteModal openDelete={this.state.isShowingDelete} 
            closeDelete={this.closeDelete} 
            cusId={this.state.customerId}
            customerSales={this.state.customerSales}/>

        </div> 
    }

  
    fetchCustomers() 
    {
        // Where we're fetching data from
        fetch("api/Customers")
            // We get the API response and receive data in JSON format...
            .then(response => response.json())
            // ...then we update the users state
            .then(data =>
                this.setState({
                    customers: data,
                    isLoading: false,
                })
            )
            // Catch any errors we hit and update the app
            .catch(error => this.setState({ error, isLoading: false }));      
    }
}