"use client";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, MenuProps, Modal, Space, Table, Tag } from "antd";
import { BranchInterface } from "@/interfaces/branchInterface";
import BranchService from "@/services/branchService";

const branchService = new BranchService();

export default function BranchTemplate( item : any) {
  const [brandId, setBrandId] = useState<any>(item.brandId);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<BranchInterface[]>([]);
  console.log(item)
    const columns = [
      {
        dataIndex: "image",
        key: "image",
        width: "10%",
        render: (image: string) => <img src={image} alt="image" style={{ maxWidth: '100%', maxHeight: '100%' }} />,
      },
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

        // Se ejecuta cuando cambia el brandId
        useEffect(() => {
          setBrandId(item.brandId); // Actualiza el brandId en el estado
        }, [item.brandId]);
    
        // Se ejecuta cuando cambia el brandId o cuando se monta el componente
        useEffect(() => {
          getData();
        }, [brandId]);

    return (
      <div className={`w-full flex flex-col gap-4`}>
        <div className={`lg:text-2xl font-bold`}>sucursales</div>
        <div className={`bg-white rounded-lg flex flex-col px-5 pt-5`}>
          <div className={`w-full flex items-center justify-end gap-2 pb-2`}>
          </div>
          <div>
            <Table
              bordered
              scroll={{ y: 450 }}
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