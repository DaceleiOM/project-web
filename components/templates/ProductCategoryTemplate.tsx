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
      
      console.log(data.data.branchData)
    //__________________________________________________________________________________________________________________________
    
    const closeModal = async () => {
        await setSelectedItem(null);
        await setIsOpenModal(!isOpenModal);
    }
    //__________________________________________________________________________________________________________________________
      
      
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <MenuCategories data={{ brandId: data.data.brandId, brandData: data.data.brandData, branchData: data.data.branchData }} />
        
        <Content style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 80px)' }}>
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
              flex: 1,
            }}
          >
            <div className="flex flex-wrap gap-4 justify-center">
              {dataSource && dataSource.map((product) => (
                <Card
                  key={product.id}
                  hoverable
                  className="w-[125px] sm:w-[240px]" // Define el ancho para móviles y pantallas grandes
                  cover={
                    <img
                      alt={product.name}
                      src={product.images}
                      className="min-h-[150px] max-h-[150px] object-cover"
                    />
                  }
                  onClick={() => {
                    setSelectedItem(product.id);
                    setIsOpenModal(true);
                  }}
                >
                  <Meta title={product.name} className="text-center" />
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
                  onCancel={closeModal}
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
            bottom: '20%',
            right: '5%',
            transform: 'translateX(50%)',
            zIndex: 9999 
          }}
        >
          <WhatsAppOutlined style={{ fontSize: '32px', color: '#25D366' }} />
        </a>
  
        <Footer style={{ background: '#333', color: '#fff', textAlign: 'center', padding: '10px' }}>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            {/* izquierda */}
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Nosotros:</div>
              <div className="text-justify" style={{ marginTop: '8px', fontWeight: 'bold' }}>Nombre:</div>
              <div className="text-justify">{data.data.brandData.name}</div>
              <div className="text-justify" style={{ marginTop: '8px', fontWeight: 'bold' }}>Lo que nos gusta:</div>
              <div className="text-justify">{data.data.brandData.description}</div>
            </div>
            
            {/* centro */}
            <div className="w-full md:w-1/3 flex flex-col justify-center items-center mb-4 md:mb-0">
              {data.data.brandData.logo && (
                <img src={data.data.brandData.logo} alt="Brand Logo" style={{ width: 'auto', height: '150px', marginTop: '20px' }} />
              )}
              
              <div className="flex flex-wrap justify-center space-x-4 mt-4">
                {data.data.branchData.map((branch: any) => (
                  <div key={branch.id} className="flex space-x-4">
                    {branch.facebook && (
                      <a href={branch.facebook} target="_blank" rel="noopener noreferrer">
                        <FacebookOutlined style={{ fontSize: '24px', color: '#3b5998' }} />
                      </a>
                    )}
                    {branch.instagram && (
                      <a href={branch.instagram} target="_blank" rel="noopener noreferrer">
                        <InstagramOutlined style={{ fontSize: '24px', color: '#e4405f' }} />
                      </a>
                    )}
                    {branch.phone && (
                      <a href={`https://api.whatsapp.com/send?phone=${branch.phone}&text=Hola`} target="_blank" rel="noopener noreferrer">
                        <WhatsAppOutlined style={{ fontSize: '24px', color: '#25D366' }} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
  
            {/* derecha */}
            <div className="w-full md:w-1/3">
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