"use client";
import React, { useEffect, useState } from "react";
import ProductCategoryService from "@/services/productCategoryService";
import BrandCategoryService from "@/services/BrandCategoryService";
import ProductTemplate from '@/components/templates/ProductTemplate'
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Card, Button, Modal, Breadcrumb, Layout, Menu, theme } from 'antd';
import { useRouter } from "next/navigation";

const { Meta } = Card;
const { Header, Content, Footer } = Layout;
const productCategoryService = new ProductCategoryService();
const brandCategoryService = new BrandCategoryService();


export default function Product({ params }: { params: { brandId: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any | null>();
//__________________________________________________________________________________________________________________________
  
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
//__________________________________________________________________________________________________________________________
  
  const items = categories.map((category) => ({
    key: category.id,
    label: category.name,
    onClick: () => {
      router.push(`/${params.brandId}/${category.id}`);
    },
  }));

//__________________________________________________________________________________________________________________________
  const getData = () => {
    productCategoryService.getByBrand(params.brandId)
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

//__________________________________________________________________________________________________________________________
  const getCategories = () => {
    brandCategoryService.getByBrand(params.brandId)
      .then((response: any) => {
        setCategories(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error => ", error);
        setCategories([]);
        setIsLoading(false);
      });
  } 

  useEffect(() => {
    getData();
    getCategories();
  }, [params.brandId]);

//__________________________________________________________________________________________________________________________

  const closeModal = async () => {
    await setSelectedItem(null);
    await setIsOpenModal(!isOpenModal);
  }
//__________________________________________________________________________________________________________________________
  
  
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
      </Header>

      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div className={`w-full py-4`}>
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => {
                  router.back();
                }}
              >
                Volver
              </Button>
            </div>

              {dataSource.map((product) => (
                <Card
                  key={product.id}
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt={product.name} src={product.images} />}
                  onClick={() => {
                    setSelectedItem(product.id);
                    setIsOpenModal(true);
                  }}
                >
                  <Meta title={product.name} style={{ textAlign: 'center' }}/>
                </Card>
              ))}
              {
                isOpenModal && (
                  <Modal 
                    open={isOpenModal}
                    confirmLoading={loading}
                    classNames={{
                      header: `flex justify-content-center items-center`, 
                      body: `h-[500px] overflow-auto`
                    }}
                    className={`!w-full !top-4 lg:!w-[600px] lg:!top-8`}
                    keyboard={false}
                    maskClosable={false}
                    onOk={closeModal}
                    cancelButtonProps={{ style: { display: 'none' } }}
                  >
                    <ProductTemplate productId={selectedItem} />
                  </Modal>




                )
              }
          </div>
        </div>
      </Content>
      
      <Footer style={{ textAlign: 'center' }}>
        Project-Food ©{new Date().getFullYear()} Created by Dacelei
      </Footer>
    
    </Layout>
  );
  
}
