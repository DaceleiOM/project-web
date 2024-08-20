"use client";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table} from "antd";
import { BrandInterface } from "@/interfaces/brandInterface";
import BrandService from "@/services/brandService";
import BranchTemplate from '@/components/templates/BranchTemplate'

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
      width: "15%", // Ajusta el ancho según sea necesario
      render: (logo: string) => <img src={logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />,
    },
    {
      dataIndex: "name",
      key: "name",
      width: "15%",
      render: (text: string) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {text}
        </div>
      ),
    },
    {
      dataIndex: "description",
      key: "description",
      width: "50%",
    },
    {
      title: "",
      dataIndex: "",
      width: "25%",
      render: (record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
        </div>
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
      <div className={`bg-white rounded-lg flex flex-col px-5 pt-5 h-screen`}>
        <div className="flex-grow ">
          <Table bordered scroll={{ y: 'calc(100vh - 200px)' }} size="small" loading={isLoading} dataSource={dataSource} columns={columns} />
        </div>
      </div>


      {
        isOpenModal && (
          <Modal 
          open={isOpenModal}
          confirmLoading={loading}
          classNames={{
            header: `flex justify-content-center items-center`, 
            body: `h-[300px] overflow-auto`
          }}
          className={`!w-full !top-4 lg:!w-[600px] lg:!top-8`}
          keyboard={false}
          maskClosable={false}
          onOk={closeModal}
          onCancel={closeModal}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          
        <BranchTemplate brandId={selectedItem} />
        </Modal>
        )
      }

      {contextHolder}
    </div>
  );
}
