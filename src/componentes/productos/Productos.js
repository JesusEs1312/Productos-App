import React, { useEffect, useState } from 'react';
import { eliminarProducto, obtenerProductos } from '../../actions/ProductoAction';
import { useStateValue } from '../../context/store';
import { styled } from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
import { Button, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router';
  
  const blue = {
    200: '#A5D8FF',
    400: '#3399FF',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
  };
  
  const Root = styled('div')(
    ({ theme }) => `
    table {
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      border-collapse: collapse;
      width: 100%;
    }
  
    td,
    th {
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      text-align: center;
      padding: 6px;
    }
  
    th {
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};
    }
    `,
  );
  
  const CustomTablePagination = styled(TablePaginationUnstyled)(
    ({ theme }) => `
    & .MuiTablePaginationUnstyled-spacer {
      display: none;
    }
    & .MuiTablePaginationUnstyled-toolbar {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
    & .MuiTablePaginationUnstyled-selectLabel {
      margin: 0;
    }
    & .MuiTablePaginationUnstyled-select {
      padding: 2px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      border-radius: 50px;
      background-color: transparent;
      &:hover {
        background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      }
      &:focus {
        outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      }
    }
    & .MuiTablePaginationUnstyled-displayedRows {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
    & .MuiTablePaginationUnstyled-actions {
      padding: 2px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      border-radius: 50px;
      text-align: center;
    }
    & .MuiTablePaginationUnstyled-actions > button {
      margin: 0 8px;
      border: transparent;
      border-radius: 2px;
      background-color: transparent;
      &:hover {
        background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      }
      &:focus {
        outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      }
    }
    `,
  );
  
  export default function Productos() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [todos, setTodos] = useState();
    const [columns, setColumns]  = useState();
    const [array, setArray] = useState([]);
    const [actualiza, setActualiza] = useState(false);
    const [editar, setEditar] = useState(false);
    const navigate = useNavigate();
    const [{sesionUsuario}, dispatch] = useStateValue();
    var result = [];
  
    // Avoid a layout jump when reaching the last page with empty rows.
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const eliminarProductoBoton = (id) => {
        eliminarProducto(id).then(response =>{
            if(response.status == 200){
                setActualiza(true);
            }   
        });
    }

    useEffect(() =>{
        obtenerProductos(dispatch).then(response =>{
            setTodos(response.data);
            response.data.map((element) =>{
                result.push(element);
            }) 
            !result ? setArray([]) : setArray(result); 
            setColumns(response.data.length);
            setActualiza(false);
        });
    }, [actualiza]);

    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - columns) : 0;
    
    const abrirEditar = (id) =>{
        sesionUsuario.usuario.productoId = id;
        navigate("/producto/editar",{replace : true});
    }
    return (
        <Grid container justifyContent="center" paddingTop={8}>
      <Root sx={6} md={12}>
        <Grid container justifyContent="center" paddingBottom={3}>
            <Typography component="h1" variant="h4" color="GrayText">
                Lista de Productos
            </Typography>
        </Grid>
        <table aria-label="custom pagination table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Fabricante</th>
              <th>Precio</th>
              <th>Codigó de barra</th>
              <th>Eliminar</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0 ? !array ? "Cargando..." : array.slice(page * rowsPerPage, page * rowsPerPage +rowsPerPage)
                : array).map((row) => (
              <tr key={row.id}>
                <td style={{ width: 180 }} align="right">
                    {row.id}
                </td>
                <td style={{ width: 150 }} align="right">
                  {row.nombre}
                </td>
                <td style={{ width: 110 }} align="right">
                  {row.marca}
                </td>
                <td style={{ width: 150 }} align="right">
                  {row.fabricante}
                </td>
                <td style={{ width: 100 }} align="right">
                  {row.precio}
                </td>
                <td style={{ width: 120 }} align="right">
                  {row.codigo_barra}
                </td>
                <td style={{ width: 100 }} align="right">
                  <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="error"
                  size="small"
                  onClick={() => eliminarProductoBoton(row.id)}>
                      <DeleteIcon/>
                  </Button>
                </td>
                <td style={{ width: 100 }} align="right">
                  <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="success"
                  size="small"
                  onClick={() => abrirEditar(row.id)}>
                      <EditIcon/>
                  </Button>
                </td>
              </tr>
            ))}
  
            {emptyRows > 0 && (
              <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={8} />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={8}
                count={columns}
                rowsPerPage={rowsPerPage}
                page={page}
                componentsProps={{
                  select: {
                    'aria-label': 'Columnas por pagina',
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
      </Root>
      </Grid>
    );
  }