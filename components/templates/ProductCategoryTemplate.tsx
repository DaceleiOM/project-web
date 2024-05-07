"use client";
import React, { useEffect, useState } from "react";
import ProductCategoryService from "@/services/productCategoryService";
import ProductTemplate from '@/components/templates/ProductTemplate'
import MenuCategories from "@/components/templates/MenuCategories";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Card, Button, Modal, Layout, theme } from 'antd';
import { useRouter } from "next/navigation";
import { BranchInterface } from "@/interfaces/branchInterface";
import { PhoneOutlined, HomeOutlined, ShopOutlined, FacebookOutlined, InstagramOutlined, WhatsAppOutlined } from '@ant-design/icons'; // Importa el ícono de teléfono

const { Meta } = Card;
const { Header, Content, Footer } = Layout;
const productCategoryService = new ProductCategoryService();


export default function ProductCategoryTemplate(data: any) {
  const BrandId = data.data.brandId
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any | null>();
    


  const renderBranchDetails = (branchData: BranchInterface) => {
    return (
        <div key={branchData.id} className="py-2 border-b border-gray-300">
            <div className="flex items-center mb-2">
                <ShopOutlined className="mr-2" />
                <span>{branchData.name}</span>
            </div>
            <div className="flex items-center mb-2">
                <HomeOutlined className="mr-2" />
                <span>{branchData.address}</span>
            </div>
            <div className="flex items-center">
                <PhoneOutlined className="mr-2" />
                <span>{branchData.phone}</span>
            </div>
        </div>
    );
};


//__________________________________________________________________________________________________________________________
const {
    token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    //__________________________________________________________________________________________________________________________

    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          try {
            if (data.data.categoryId === null) {
              await productCategoryService.getByBrand(data.data.brandId)
                .then((response: any) => {
                  setDataSource(response);
                });
            } else {
              await productCategoryService.getByCategory(data.data.categoryId)
                .then((response: any) => {
                  setDataSource(response);
                });
            }
            setIsLoading(false);
          } catch (error) {
            console.log("Error fetching data:", error);
            setDataSource([]);
            setIsLoading(false);
          }
        };
      
        fetchData();
      }, [data.data.categoryId, data.data.brandId]);
      

    //__________________________________________________________________________________________________________________________
    
    const closeModal = async () => {
        await setSelectedItem(null);
        await setIsOpenModal(!isOpenModal);
    }
    //__________________________________________________________________________________________________________________________
      
      
  return (
    <Layout>
      <MenuCategories data={{ brandId: data.data.brandId, brandData: data.data.brandData, branchData: data.data.branchData }} />
            
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
                  {dataSource && dataSource.map((product) => (
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

                  {isOpenModal && (
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
                  )}    
                </div>

        </div>

      </Content>
      <a 
        href={`https://api.whatsapp.com/send?phone=${data.data.branchData.whatsapp}&text=Hola`} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{
          position: 'fixed',
          bottom: '20%', /* Distancia desde la parte inferior */
          right: '5%', /* Centrado horizontalmente */
          transform: 'translateX(50%)', /* Centrar horizontalmente */
          zIndex: 9999 
        }}
      >
        <WhatsAppOutlined style={{ fontSize: '32px', color: '#25D366' }} />
      </a>
            
      <Footer style={{ background: '#333', color: '#fff', textAlign: 'center', padding: '10px' }}>
              <div className="flex flex-1 justify-center">
                
                {/* izquierda */}
                <div className="w-1/3">
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Nosotros:</div>
                  <div className="text-justify" style={{ marginTop: '8px', fontWeight: 'bold' }}>Nombre:</div>
                  <div className="text-justify">{data.data.brandData.name}</div>
                  <div className="text-justify" style={{ marginTop: '8px', fontWeight: 'bold' }}>Lo que nos gusta:</div>
                  <div className="text-justify">{data.data.brandData.description}</div>
                </div>
        
                {/* centro */}
                <div className="w-1/3 flex flex-col justify-center items-center">
                  {data.data.brandData.logo && (
                    <img src={data.data.brandData.logo} alt="Brand Logo" style={{ width: 'auto', height: '150px', marginTop: '20px' }} />
                  )}
                  <div className="flex mt-4 space-x-4">
                      <a href={data.data.branchData.facebook} target="_blank" rel="noopener noreferrer">
                        <FacebookOutlined style={{ fontSize: '24px', color: '#3b5998' }} />
                      </a>
                      <a href={data.data.branchData.instagram} target="_blank" rel="noopener noreferrer">
                        <InstagramOutlined style={{ fontSize: '24px', color: '#e4405f' }} />
                      </a>
                      <a href={`https://api.whatsapp.com/send?phone=${data.data.branchData.whatsapp}&text=Hola`} target="_blank" rel="noopener noreferrer">
                        <WhatsAppOutlined style={{ fontSize: '24px', color: '#25D366' }} />
                      </a>
                  </div>
                </div>


                {/* derecha */}
                <div className="w-1/3">
                    <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Nuestras sucursales:</div>
                    {data.data.branchData?.map((branchData: BranchInterface) => (
                        renderBranchDetails(branchData)
                    ))}
                </div>

              </div>      
      </Footer>
  
    </Layout>
  );
}