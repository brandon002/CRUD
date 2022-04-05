import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { getPost, deletePost } from "../action/PostActions.js";
import Loading from './../Loading';
import { Table, Dropdown, Button } from "react-bootstrap";
import {
  Link
} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useTable, useSortBy } from 'react-table';
import { render } from '@testing-library/react';


const Posts = props =>{
    console.log("P")
    const { 
        deletePost,
        items,
        loading,
        PostReducer
    } = props
    console.log(items);
    const navigate = useNavigate()
    // useEffect(() => {
    //     getPost()
    // },[])
    // console.log(items)
    const columns = useMemo(
        () => [
        { accessor: 'item_id', Header: 'Id' },
        { accessor: 'item_title', Header: 'Title', minWidth: 100 },
        { accessor: 'item_body', Header: `Body`, minWidth: 100 },
        // { accessor: 'item_action', Header: `Action`, minWidth: 100 }
    ],
    []);
    
    const dataTables = useMemo(
        () => items.map(item => {
            return (
                {
                    "item_id" : item.id,
                    "item_title" : item.title,
                    "item_body" : item.body,
                    // "item_action" : item.action
                }
            )
        }),
        []
    )
    
    const tableInstance = useTable(
        {
            columns,
            data : dataTables, 
            manualSortBy: true
        },
        useSortBy
    )
    const { 
		getTableProps, 
		getTableBodyProps, 
		headerGroups,
		rows, 
		prepareRow,
	} = tableInstance

    const handleDelete = id =>{
        deletePost(id, navigate)
        console.log("dari handleDelete");
    }

    //copied
    const [order, setOrder] = React.useState("desc");
    const [orderBy, setOrderBy] = React.useState(["created_at"]);
    const handleRequestSort = (property) => {
        
        let column = []
        switch (property.Header) {
            case 'Id':
                column.push('id')
                break;
            case 'Title' :
                column.push('title')
                break;
            case 'Body' :
                column.push('body')
                break;
            case 'Action' :
                column.push('action')
                break;
            case 'No' :
                column.push('created_at')
                break;
            default:
                break;
        }
        const isAsc = order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(column);
        // setOrderBy(JSON.stringify(column));

        // getTask(teamId, page+1, keyword, rowsPerPage, property, order);
    };
    const consoleLok = cell =>{
        console.log(cell)
    }
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [keyword, setKeyword] = useState('');
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return items === null || loading ? 
    <Loading />
    :
    <React.Fragment>
        {items !== null && (
            <>
                <Link style={{textDecoration: 'none', color: 'white' }} to="/add">
                    <Button 
                    variant="primary" size="sm" className="my-3 btn-block float-right w-50">
                    Add Item 
                    </Button> 
                </Link>
                <div className="row mb-3">
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xs-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table {...getTableProps()} className="table table-striped ">
                                        <thead>
                                            {headerGroups.map(headerGroup => (
                                                <tr {...headerGroup.getHeaderGroupProps()}>
                                                    {headerGroup.headers.map(column => (
                                                        <th 
                                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                                            onClick={() => handleRequestSort(column)}
                                                        >
                                                            {column.render('Header')}
                                                            <span className="ml-1">
                                                                {column.isSorted ? (column.isSortedDesc ?  <i className="fa fa-arrow-down" /> :  <i className="fa fa-arrow-up" /> ) : '' }
                                                            </span>
                                                        </th>
                                                    ))}
                                                    <th>
                                                        Action
                                                    </th>
                                                </tr>
                                            ))}
                                        </thead> 
                                        <tbody {...getTableBodyProps()}>
                                            {rows.length > 0 ? (
                                                <>
                                                    {rows.map((row) => {
                                                        prepareRow(row)
                                                        console.log(row)
                                                        return(
                                                            <tr {...row.getRowProps()}>
                                                                {row.cells.map((cell) => {
                                                                    return (
                                                                        <>
                                                                        {/* {...cell.getCellProps()}> {cell.render('Cell')} */}
                                                                        {/* {consoleLok(cell)} */}
                                                                        <td {...cell.getCellProps()}> {cell.render('Cell')}   </td>
                                                                        
                                                                        </>
                                                                    ) 
                                                                })}
                                                                <td>
                                                                   <Dropdown>
                                                                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                                                            Action
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu>
                                                                            
                                                                                <Dropdown.Item >
                                                                                    <Link style={{textDecoration: 'none', color: 'black' }} to={`/edit/${row.original.item_id}`}>
                                                                                        <span className='ml-2'>
                                                                                            Edit Item
                                                                                        </span> 
                                                                                    </Link>
                                                                                </Dropdown.Item>
                                                                            
                                                                            <Dropdown.Item onClick={()=>handleDelete(row.original.item_id)} >  
                                                                                
                                                                                <span className='ml-2' style={{textDecoration: 'none', color: 'black' }}>
                                                                                    Delete Item 
                                                                                </span> 
                                                                                
                                                                            </Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </td>
                                                               
                                                            </tr>
                                                        )
                                                    })}
                                                </>
                                            ):(
                                                <tr>
                                                    <td colSpan="7" >Data Tidak Ditemukan</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                                        <div className="dataTables_info">
                                            Showing 100 to 100
                                        
                                            of {items.length} entries
                                        </div>
                                        <div className="dataTables_paginate paging_simple_numbers" id="example5_paginate">
                                        <Button className={`paginate_button previous mr-3 ${page > 0 ? `` : `disabled`}`} onClick={e => page > 0 && handleChangePage(e, page - 1)}>
                                            Previous
                                        </Button>
                                        <Button className={`paginate_button next ${page + 1 < items.id ? `` : `disabled`}`} onClick={e => page + 1 < items.id&& handleChangePage(e, page + 1)}>
                                            Next
                                        </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </>
        )}
    </React.Fragment>
}

const mapStateToProps = state => ({
   PostReducer: state.PostReducer
});

export default connect(mapStateToProps,{ deletePost })(Posts);
