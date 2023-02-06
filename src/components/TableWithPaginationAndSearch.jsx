import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

const TableWithPaginationAndSearch = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      filter: textFilter(),
    },
  ];

  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: data.length,
      },
    ],
  };

  function customTotal(from, to, size) {
    return (
      <span className="react-bootstrap-table-pagination-total">
        Showing {from} to {to} of {size} Results
      </span>
    );
  }

  return (
    <BootstrapTable
      bootstrap4
      keyField="id"
      data={data}
      columns={columns}
      filter={filterFactory()}
      pagination={paginationFactory(options)}
    />
  );
};

export default TableWithPaginationAndSearch;