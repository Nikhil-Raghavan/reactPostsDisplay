import { DataGrid } from '@mui/x-data-grid';

const DataTableComponent = (props) =>{

    return(
        <DataGrid
        columns={props.columns}
        rows={props.rows}
        pageSize={props.pageSize} 
        onRowClick={props.onRowClick}
        {...props}
  
        />
        )
}

export default DataTableComponent