import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import React from "react";
import { ColDef } from "ag-grid-community";

type IDataTableProps = {
  columnDefs: ColDef[];
  data: [];
  isLoading: boolean;
};

const DataTable: React.FC<IDataTableProps> = (props) => {
  return (
    <div
      className="ag-theme-quartz w-full" // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
        columnDefs={props.columnDefs}
        rowData={props.data}
        loading={props.isLoading || false}
      />
    </div>
  );
};

export default DataTable;
