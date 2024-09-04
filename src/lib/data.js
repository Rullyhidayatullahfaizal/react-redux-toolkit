// data/data.js
export const rows = [
    { id: 1, name: 'Alice', rating: 3.5, country: 'USA', dateCreated: '2023-09-01', isAdmin: true, sabuk: "hijau", provinsi: "jateng" },
    { id: 2, name: 'Bob', rating: 2.0, country: 'Canada', dateCreated: '2023-08-15', isAdmin: false, sabuk: "hijau", provinsi: "jateng" },
    { id: 3, name: 'Charlie', rating: 4.7, country: 'UK', dateCreated: '2023-07-22', isAdmin: true, sabuk: "hijau", provinsi: "jateng" },
    { id: 4, name: 'David', rating: 1.8, country: 'Germany', dateCreated: '2023-04-20', isAdmin: false, sabuk: "hijau", provinsi: "jatim" },
    { id: 5, name: 'Eva', rating: 3.2, country: 'France', dateCreated: '2010-03-30', isAdmin: false, sabuk: "hijau", provinsi: "jatim" },
    { id: 6, name: 'budi', rating: 3.2, country: 'France', dateCreated: '2014-02-03', isAdmin: false, sabuk: "hijau", provinsi: "jatim" },
    // Tambahkan lebih banyak data sesuai kebutuhan
  ];
  
  export const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'rating', headerName: 'Rating', width: 100, type: 'number' },
    { field: 'country', headerName: 'Country', width: 150 },
    { field: 'dateCreated', headerName: 'tanggal lahir', width: 150 },
    { field: 'isAdmin', headerName: 'Is Admin', width: 100, type: 'boolean' },
    { field: 'sabuk', headerName: 'sabuk', width: 150 },
    { field: 'provinsi', headerName: 'provinsi', width: 150 }
  ];
  