'use client';
import MyInterface from '../interfaces/interface';
import React, { useState, useEffect } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { Table, Button, Pagination  } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import axios from 'axios';
import Link from 'next/link';


export default function HomeTemplate() {
  // inicializacion de brands y paginas
  const [brands, setBrands] = useState<MyInterface[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 2;

  // Función para obtener los datos desde la API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/brand/getAll');
      setBrands(response.data.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]); 

  // cambiar de pagina
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Columnas
  const columns: ColumnsType<MyInterface> = [
    {
      dataIndex: 'name',
    },
    {
      dataIndex: 'id',
    },
  ];

  // al cambiar las paginas
  const onChange: TableProps<MyInterface>['onChange'] = (pagination, filters, sorter, extra) => {
};
  
  // ___________________________________________________________________________________________________________________
  return (
    <>
      <Navbar/>
      <main className={`container mx-auto pt-16`}>
        <div className={`h-screen flex flex-col items-center`}>

          <Table 
            columns={columns} 
            dataSource={brands.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} 
            onChange={onChange} 
            pagination={false}
          />

          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            total={brands.length}
            pageSize={itemsPerPage} // Configura el tamaño de página
            style={{ marginTop: '16px', textAlign: 'center' }}
          />
        </div>
      </main>
      <Footer/>
    </>

  );
}
