// src/components/pagination.table.js
import React, {useMemo, useEffect, useState} from "react";
import { connect } from "react-redux";
import { useTable, usePagination } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import { deletePost } from "../action/PostActions.js";
import { useNavigate } from "react-router-dom";
function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        deletePost,
        items,
        loading,
        PostReducer,
        //dari google
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 2, pageSize: 5 },
        },
        usePagination
    )
    const navigate = useNavigate()
    // Render the UI for your table
    return (
        <div>
            {/* <pre>
                <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                        },
                        null,
                        2
                    )}
                </code>
            </pre> */}
            <table className="table table-striped table-hover" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
            <ul className="pagination">
                <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <a className="page-link">First</a>
                </li>
                <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <a className="page-link">{'<'}</a>
                </li>
                <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                    <a className="page-link">{'>'}</a>
                </li>
                <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <a className="page-link">Last</a>
                </li>
                <li>
                    <a className="page-link">
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </a>
                </li>
                <li>
                    <a className="page-link">
                        <input
                            className="form-control"
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px', height: '20px' }}
                        />
                    </a>
                </li>{' '}
                <select
                    className="form-control"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    style={{ width: '120px', height: '38px' }}
                >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </ul>
        </div >
    )
}

function BelajarPagination(props) {
    const { 
        deletePost,
        items,
        loading,
        PostReducer
    } = props
    const columns = useMemo(
        () => [
        { accessor: 'item_id', Header: 'Id' },
        { accessor: 'item_title', Header: 'Title', minWidth: 100 },
        { accessor: 'item_body', Header: `Body`, minWidth: 100 },
        // { accessor: 'item_action', Header: `Action`, minWidth: 100 }
    ],
    []);

    const data =useMemo(
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


    return (
        <Table columns={columns} data={data} />
    )
}


const mapStateToProps = state => ({
   PostReducer: state.PostReducer
});

export default connect(mapStateToProps,{ deletePost })(BelajarPagination);
