import React, { Component } from 'react';
import 'semantic-ui/dist/semantic.min.css';
import ProductModal from './ProductModal';
import ProductEditModal from './ProductEditModal';
import ProductDeleteModal from './ProductDeleteModal';
import Pagination from './Pagination';
import { ButtonGroup } from 'semantic-ui-react';


export class FetchProducts extends Component 
{
    constructor() 
    {
        super();
        this.state = { products: [], isloading: true, error: null, isShowing:false,isShowingEdit:false,
        isShowingDelete:false,rows:[], currentPage:1, productsPerPage:4,isOldestFirst:true }
        this.close=this.close.bind(this);
        this.closeEdit=this.closeEdit.bind(this);
        this.closeDelete=this.closeDelete.bind(this);
        this.compareBy.bind(this);
        this.sortBy.bind(this);
    }
        close = () => this.setState({ isShowing: false});
        closeEdit = () => this.setState({ isShowingEdit: false});
        closeDelete= () => this.setState({isShowingDelete:false});
        setProducts= (rowNumber) => this.setState({rows:rowNumber});
        setProductsPerPage= (quantity) =>this.setState({customersPerPage:quantity});
        paginate= (pageNumber) => this.setState({currentPage:pageNumber});

    componentDidMount() 
    {
        this.fetchProducts();
    }

    componentDidUpdate()
    {
      // this.fetchProducts();
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
        let arrayCopy = [...this.state.products];
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
            products: arrayCopy
          })
    }

    render() 
    {   
        const{products,currentPage,productsPerPage}=this.state;
        const indexOfLastProduct=currentPage*productsPerPage;
        const indexOfFirstProduct=indexOfLastProduct-productsPerPage;
        const currentProducts=products.slice(indexOfFirstProduct,indexOfLastProduct) ;   
        return <div> 
            <ButtonGroup>
                <button className="ui primary button" onClick={()=> this.setState({isShowing:true})}>
                    New Product</button>
            </ButtonGroup> 
            <ProductModal show={this.state.isShowing} onclose={this.close}/>
             
            <table className="ui table">
                <thead>
                    <tr>
                        <th onClick={() => this.sortBy('productName')}>Name
                            <i aria-hidden="true" className="sort icon"></i></th>
                        <th onClick={() => this.sortBy('productPrice')}>Price
                            <i aria-hidden="true" className="sort icon"></i></th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
            <tbody>
                {  currentProducts.map(product =>   
                        <tr key={product.productId}>
                            <td>{product.productName}</td>
                            <td>${product.productPrice}</td>
                            <td>
                                <button onClick={()=> this.setState({isShowingEdit:true,productId:product.productId,
                                productName:product.productName,productPrice:product.productPrice})} 
                                className="ui yellow button"><i aria-hidden="true" className="edit icon"
                                ></i>Edit</button>
                            </td>
                            <td>
                                <button onClick={()=> this.setState({isShowingDelete:true,
                                productId:product.productId, productSales:product.sales})} 
                                className="ui red button"><i aria-hidden="true" className="trash icon"
                                ></i>Delete</button>
                            </td>     
                        </tr>
                    )
                }
            </tbody>
        </table>
                
            <Pagination
                rowsPerPage={productsPerPage}
                totalPosts={this.state.products.length}
                paginate={this.paginate}/>
            
            <ProductEditModal 
                openEdit={this.state.isShowingEdit} 
                closeEdit={this.closeEdit} 
                proId={this.state.productId}
                proName={this.state.productName}
                proPrice={this.state.productPrice}/>

            <ProductDeleteModal 
                openDelete={this.state.isShowingDelete} 
                closeDelete={this.closeDelete} 
                proId={this.state.productId}
                productSales={this.state.productSales}/>

        </div> 
    }

  
    fetchProducts() 
    {
        // Where we're fetching data from
        fetch("api/Products")
            // We get the API response and receive data in JSON format...
            .then(response => response.json())
            // ...then we update the users state
            .then(data =>
                this.setState({
                    products: data,
                    isLoading: false,
                })
            )
            // Catch any errors we hit and update the app
            .catch(error => this.setState({ error, isLoading: false }));      
    }
}