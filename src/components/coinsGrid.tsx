import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getCoinsList } from '../adapters/xhr/coinAdapter';
import './coinsGrid.css';
import ErrorAlert from './errorAlert';

const CoinsGrid = (props: { handleCoinClick: (value: any) => void }) => {
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const per_page = 10;

  // columns define the fields to be displayed from data received in API response
  const columns = [
    { field: 'id', hide: true },
    {
      field: `image`,
      width: 20,
      headerName: ` `,
      renderCell: (params: any) => <img src={params.value} className="coinLogo" />
    },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'symbol', headerName: 'Symbol' },
    {
      field: 'current_price',
      headerName: 'Current Price',
      width: 150,
      renderCell: (params: any) => `\u20AC ${params.value}`
    },
    {
      field: 'high_24h',
      headerName: 'High 24h Price',
      width: 150,
      renderCell: (params: any) => `\u20AC ${params.value}`
    },
    {
      field: 'low_24h',
      headerName: 'Low 24h Price',
      width: 150,
      renderCell: (params: any) => `\u20AC ${params.value}`
    }
  ];

  // This is the function to perform API call to fetch the list of coins
  const fetchCoins = async () => {
    try {
      setIsLoading(true);
      const response = await getCoinsList(per_page, page + 1, 'EUR');
      response.data.forEach((item: any) => (item.imageTag = <img src={item.image} />));
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
      console.log(err);
    }
  };

  //useEffect calls the fetchCoins function every time the page is changed
  useEffect(() => {
    fetchCoins();
  }, [page]);

  return (
    <div className="gridContainer" style={{ height: 640 }}>
      {isError ? <ErrorAlert /> : ''}
      <DataGrid
        rows={data}
        rowCount={100}
        loading={isLoading}
        rowsPerPageOptions={[10]}
        pagination
        page={page}
        pageSize={per_page}
        paginationMode="server"
        onPageChange={(newPage: number) => setPage(newPage)}
        columns={columns}
        onRowClick={(item: any) => props.handleCoinClick(item.id)}
      />
    </div>
  );
};

export default CoinsGrid;
