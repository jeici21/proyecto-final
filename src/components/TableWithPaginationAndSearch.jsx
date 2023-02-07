import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.min.css";



const TableWithPaginationAndSearch = () => {
    const tableRef = useRef();
    const data = [
        [ "Tiger Nixon", "System Architect", "Edinburgh", "61", "2011/04/25", "$320,800" ],
        [ "Garrett Winters", "Accountant", "Tokyo", "63", "2011/07/25", "$170,750" ],
        [ "Ashton Cox", "Junior Technical Author", "San Francisco", "66", "2009/01/12", "$86,000" ]
      ];
    useEffect(() => {
      $(tableRef.current).DataTable({
        data,
        columns: [
          { title: "Name" },
          { title: "Position" },
          { title: "Office" },
          { title: "Age" },
          { title: "Start date" },
          { title: "Salary" }
        ]
      });
    }, [data]);
  
    return (
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Office</th>
            <th>Age</th>
            <th>Start date</th>
            <th>Salary</th>
          </tr>
        </thead>
      </table>
    );
  };

export default TableWithPaginationAndSearch;