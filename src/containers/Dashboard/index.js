import React, { useEffect, useState } from 'react';
import styles from './index.module.css'
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import reducer from './reducer';
import { makeSelectToken } from '../Login/selector';
import { makeSelectPosts } from './selector'
import { getPosts } from './actions'
import { Form, Button, Container, InputGroup, Row , Col , Table , Modal } from 'react-bootstrap';
import Pagination from '../../components/Pagination';
import { DataGrid } from '@mui/x-data-grid';
import SearchBar from "material-ui-search-bar";
import DataTableComponent from '../../components/DataTableComponent';


const key = 'Dashboard';


// function PostRow(props) {
//   const { userId, id, title } = props.data;
//   return (
  
//   <tr>
//       <td>{userId}</td>
//       <td>{id}</td>
//       <td>{title}</td>
//     </tr>
//   );
// }

// function OuterTable(props) {
//   return (
  
//     <Table>
//       <thead>
//         <th>User ID</th>
//         <th>ID</th>
//         <th>Title</th>
//       </thead>

//       <tbody>

//         {props.children}

//       </tbody>
//     </Table>
//   );
// }

const Dashboard = ({posts, fetchPosts , token, history }) => {


  const [modalShow,setModalShow] = useState(false);
  const [modalContent,setModalContent] = useState('');
  const [searchValue, setSearchValue] = useState('')
  const [rowChange, setRowChange] = useState(false)
  const [filterRows,setFilterRows] = useState('')


  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    window.scrollTo(0, 0)

    let isValid = localStorage.getItem('validUser')
    console.log("from local",isValid)

    if(isValid !== 'true'){

      history.push('/')
      
    }

    console.log(token)

    if(posts == '' || posts == null || posts == undefined)
      fetchPosts();
  }, []);


    let columns=[];
    let rows=[];
 
   const handleModalClose = () =>{
     setModalShow(false)
   }
  let content;
  let dataTableData;
  let filteredSearchRows;
  

  if( posts !== '' || posts !== null){

    columns = [
      { field: 'id', headerName: 'Id', width: 130 },
      { field: 'userId', headerName: 'UserId', width: 130 },
      { field: 'title', headerName: 'Title',  flex: 1},
    ]
    
    // console.log("posts is ",posts)

    content = posts.map((ele,index) => {
       
        return (
            <tr key={ele.id}>
              <td>{ele.userId}</td>
              <td>{ele.id}</td>
              <td>{ele.title}</td>
            </tr>
        )
    })
    
    rows= posts.map((ele,index) =>{
      return (
        {"id":ele.id, "userId":ele.userId,"title":ele.title}
      )
    })
  
  }

  let filteredRow;

  const handleRowClick =(e) =>{
    console.log(e.row.id)

    filteredRow = posts.filter(ele=> ele.id === e.row.id)

    console.log(filteredRow)

    let tempContent = <div>
      <h4>{filteredRow[0].title}</h4>
      <p><strong>ID: </strong>{filteredRow[0].id}</p>
      <p><strong>UserID: </strong>{filteredRow[0].userId}</p>
    </div>

    console.log("content",modalContent)
    setModalContent(tempContent)

    setModalShow(true)

  }

  const handleSetSearchValue = (e) => {
    if(!e){
      setFilterRows('');
    setRowChange(false)
    setSearchValue('')
    }

    else setSearchValue(e)
  }

  const handleSearchValue = (e) =>{
    console.log(e)
    
    let filteredSearchRows = rows.filter(ele => (ele.id.toString().toLowerCase().includes(e.toString().toLowerCase()) || ele.userId.toString().toLowerCase().includes(e.toString().toLowerCase()) || ele.title.toString().toLowerCase().includes(e.toString().toLowerCase()) ))

    console.log(filteredSearchRows)
    setFilterRows(filteredSearchRows)

    setRowChange(true)


  }

  const handleSearchCancel = () =>{
    setFilterRows('');
    setRowChange(false)
    setSearchValue('')
  }
   
  return (
    <React.Fragment>
      <Helmet>
        <title>React App-Login</title>
        <meta
          name="description"
          content=""
        />
  

      </Helmet>

      <Container>

          {posts.length > 0 ? (
      
              // <Table>
              //   <thead>
              //     <th>User ID</th>
              //     <th>ID</th>
              //     <th>Title</th>
              //   </thead>
              //   <tbody>                  
          // <Pagination
          //   data={posts}
          //   title="Posts you may like !"
          //   RenderComponent={PostRow}
          //   RenderOuterComponent ={OuterTable}
          //   pageLimit={5}
          //   dataLimit={10}
          // />
        //   </tbody>

        // </Table>

        <React.Fragment>

        
        <div style={{ height: 350, width: '100%' }}>
        
        <SearchBar
        value={searchValue}
        onChange={handleSetSearchValue}
        onRequestSearch={handleSearchValue}
        onCancelSearch={handleSearchCancel}
        />

        {rowChange ?

        <DataTableComponent
            disableSelectionOnClick
            columns={columns}
            rows={filterRows}
            pageSize="25"
            pagination 
            onRowClick={handleRowClick}
        />

            : 

            <DataTableComponent
            disableSelectionOnClick
            columns={columns}
            rows={rows}
            pageSize="25"
            pagination 
            onRowClick={handleRowClick}
        />
        }

        
      </div>

      
      <Modal show={modalShow}
      onHide={handleModalClose}
       backdrop="static"
       keyboard={false}>

        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent}
           {/* ? modalContent : "The details of the product is currently unavailable"} */}
        </Modal.Body>
       </Modal>

      </React.Fragment>



            
      ) : (
       <h1>No Posts to display</h1>
      )}
      </Container>

    </React.Fragment >
  );
}


const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
  posts: makeSelectPosts()
});

export function mapDispatchToProps(dispatch) {
  return {
      fetchPosts: () => {
          dispatch(getPosts());
      },
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Dashboard)
