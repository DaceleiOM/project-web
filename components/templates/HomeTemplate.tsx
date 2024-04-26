"use client";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, MenuProps, Modal, Space, Table, Tag } from "antd";
import { BrandInterface } from "@/interfaces/brandInterface";
import BrandService from "@/services/brandService";
import BranchTemplate from '@/components/templates/BranchTemplate'
import { BranchInterface } from "@/interfaces/branchInterface";

const brandService = new BrandService();

export default function BrandTemplate() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<BrandInterface[]>([]);
  const [selectedItem, setSelectedItem] = useState<BrandInterface | null>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [action, setAction] = useState<string>();
  const [modal, contextHolder] = Modal.useModal();
  const [selectedBrandId, setSelectedBrandId] = useState<BrandInterface>();

  const columns = [
    {
      dataIndex: "logo",
      key: "logo",
      width: "10%", // Ajusta el ancho según sea necesario
      render: (logo: string) => <img src={logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />,
    },
    {
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      dataIndex: "description",
      key: "description",
      width: "30%",
    },
    {
      title: "",
      dataIndex: "",
      width: "8%",
      render: (record: any) => (
        <Button
          size="large"
          onClick={() => {
            setAction("new");
            setSelectedItem(record.id);
            setIsOpenModal(true);
          }}
        >
          sucursales
        </Button>
      ),
    },
  ];

  const closeModal = async () => {
    await setSelectedItem(null);
    await setAction(undefined);
    await setIsOpenModal(!isOpenModal);
  }

  const getData = () => {
    brandService.getBrands()
        .then((response: any) => {
            setDataSource(response);
            setIsLoading(false);
        })
        .catch((error) => {
          console.log("error => ", error);
          setDataSource([]);
          setIsLoading(false);
        });
  } 
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={`w-full flex flex-col gap-4`}>
      <div className={`lg:text-2xl font-bold`}>Productos</div>
      <div className={`bg-white rounded-lg flex flex-col px-5 pt-5`}>
        <div className={`w-full flex items-center justify-end gap-2 pb-2`}>
          <Button 
            size="large"
            onClick={() => { 
              setAction("new");
              setSelectedItem(undefined);
              setIsOpenModal(true);
            }}
          >
              Nuevo
          </Button>
        </div>
        <div>
          <Table bordered scroll={{y: 450}} size="small" loading={isLoading} dataSource={dataSource} columns={columns} />
        </div>
      </div>

      {
        isOpenModal && (
        <Modal 
          title={<div className={`text-lg lg:text-xl`}>'tittle'</div>}
          open={isOpenModal}
          confirmLoading={loading}
          classNames={
            {
              header:`flex justify-content-center items-center`, 
              body:`h-[500px] overflow-auto`
            }
          }
          className={`!w-full !top-4 lg:!w-[600px] lg:!top-8`}
          keyboard={false}
          maskClosable={false}
          okButtonProps={
            {className: `!h-10 !bg-blue-500 hover:!opacity-60 hover:!text-white text-white`}
          }
          okText={`Guardar`}
          cancelButtonProps={
            {className: `!h-10 !bg-red-500 hover:!opacity-60 hover:!text-white hover:!border-red-500 text-white`}
          }
          cancelText={`Cancelar`}
          onCancel={closeModal}
        >
          
          <BranchTemplate brandId={selectedItem} />

        </Modal>
        )
      }

      {contextHolder}
    </div>
  );
}
