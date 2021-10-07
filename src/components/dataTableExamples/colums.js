import  { memoize } from 'react-data-table-component';
export default memoize(clickHandler =>  [

{
      name: "Title",
      selector: "title",
      sortable: true,
      style: {
        fontSize:'18px'
      }
    },
    {
      name: "Directior",
      selector: "director",
      sortable: true,
      style: {
        fontSize:'18px'
      }
    },
    {
      name: "Runtime (m)",
      selector: "runtime",
      sortable: true,
      right: true
    },
    {
        cell:(row) => <button onClick={clickHandler} id={row.ID}>Action</button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
]);