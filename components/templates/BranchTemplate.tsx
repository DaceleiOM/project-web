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
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      dataIndex: "address",
      key: "address",
      width: "30%",
    },
    {
      render: (record: any) => (
        <div style={{ width: "100%" }}>
          <Button
            onClick={() => {
              router.push(`/${record.brand_id}`);
            }}
            style={{ width: "100%" }} // Establecer el ancho del botón al 100%
          >
            Ir
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
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="lg:text-2xl font-bold">sucursales</div>
      <div className="bg-white rounded-lg flex flex-col px-5 pt-5 w-full max-w-full overflow-x-hidden">
        <div className="w-full flex items-center justify-end gap-2 pb-2"></div>
        <div className="flex-grow w-full overflow-auto">
          <Table
            bordered
            size="small"
            loading={isLoading}
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      </div>
    </div>

  );
          
}