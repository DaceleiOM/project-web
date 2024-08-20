"use client";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, MenuProps, Modal, Space, Table, Tag } from "antd";
import { BranchInterface } from "@/interfaces/branchInterface";
import BranchService from "@/services/branchService";
import { useRouter } from "next/navigation";

const branchService = new BranchService();

export default function BranchTemplate( item : any) {
  const [brandId, setBrandId] = useState<any>(item.brandId);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<BranchInterface[]>([]);
  const router = useRouter();


  const columns = [
    {
      title: "Sucursal",
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      title: "Dirección",
      dataIndex: "address",
      key: "address",
      width: "30%",
    },
    {
      render: (record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Button
            onClick={() => {
              router.push(`/${record.brand_id}`);
            }}
          >
            Ir a tienda
          </Button>
        </div>
      ),
    },

  ];
  
  const getData = () => {
    branchService.getBranches(brandId)
      .then((response: any) => {
      setDataSource(response);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log("Error fetching branches:", error);
      setDataSource([]);
      setIsLoading(false);
    });
  } 

  useEffect(() => {
          setBrandId(item.brandId); // Actualiza el brandId en el estado
  }, [item.brandId]);
    
  useEffect(() => {
          getData();
  }, [brandId]);

  return (
    <div className={`w-full flex flex-col gap-4`}>
      <div className={`bg-white rounded-lg flex flex-col px-5 pt-5`} style={{ overflowX: 'hidden' }}>
        <div className={`w-full flex items-center justify-end gap-2 pb-2`}></div>
        <div className="p-4"> {/* Añadido padding al contenedor */}
          <Table
            bordered
            size="small"
            loading={isLoading}
            dataSource={dataSource}
            columns={columns}
            style={{ width: '500px' }} // Ajustar al ancho del contenedor
          />
        </div>
      </div>
    </div>
  );
  
          
}