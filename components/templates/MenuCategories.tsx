"use client";
import React, { useEffect, useState } from "react";
import BrandCategoryService from "@/services/BrandCategoryService";

import { Card,Layout, Menu, Dropdown, Space} from 'antd';
import { useRouter } from "next/navigation";
import { Button } from 'antd';
import { MenuOutlined, MoreOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Header, Content, Footer } = Layout;
const brandCategoryService = new BrandCategoryService();

const { SubMenu, Item } = Menu;


export default function MenuCategories( data: any ) {
    
    const BrandId = data.data.brandId
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<any[]>([]);
    const router = useRouter();

    const getconten = (content: any) => {
        console.log(content);
        router.push(`/${BrandId}/${content}`);
    };

    const mainCategories = categories.filter(category => !category.parent_id);

    const items = mainCategories.map(category => {
        const hasChildren = categories.some(subcategoria => subcategoria.parent_id === category.id);
        const children = hasChildren ? (
            categories
                .filter(subcategoria => subcategoria.parent_id === category.id)
                .map(subcategoria => (
                    <Item key={subcategoria.id} onClick={() => getconten(subcategoria.id)}>
                        {subcategoria.name}
                    </Item>
                ))
        ) : null;
    
        return (
            <SubMenu key={category.id} title={
                <span onClick={() => getconten(category.id)}>
                    {category.name}
                </span>
            }>
                {children}
            </SubMenu>
        );
    });
    
    

    const handleAllCategories = () => {
        router.push(`/${BrandId}`);
    }

    // __________________________________________________________________________________________________________________________
    const getCategories = () => {
        brandCategoryService.getByBrand(BrandId)
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
        getCategories();
    }, [BrandId]);
    // __________________________________________________________________________________________________________________________
    const moreMenu = (
        <Menu>
          {items}
        </Menu>
    );
    return (
        <Header style={{ display: 'flex', alignItems: 'center', background: '#333', color: '#fff', height: '80px', padding: '0 10px' }}>
            {/* Elemento de la izquierda */}
            <div style={{ flex: 1, overflowX: 'auto' }}>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{
                        whiteSpace: 'nowrap',
                        overflowX: 'auto',
                        overflowY: 'hidden', // Evita el scroll vertical
                        backgroundColor: '#333',
                        color: '#fff',
                        height: '80px', // Ajusta según sea necesario
                        lineHeight: '80px', // Alinea verticalmente el contenido
                    }}
                >
                    {/* Mostrar los tres puntos si hay más elementos de los que se pueden mostrar */}
                    {items.length > 5 ? (
                        <Dropdown overlay={moreMenu} trigger={['click']}>
                            <Button
                                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '16px' }}
                                icon={<MoreOutlined />}
                            />
                        </Dropdown>
                    ) : (
                        items
                    )}
                </Menu>
            </div>
        
            {/* Elemento del centro */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}></div>
        
            {/* Elemento de la derecha */}
            <div
                onClick={handleAllCategories}
                style={{ cursor: 'pointer', marginLeft: 'auto' }}
            >
                {data.data.brandData.logo && (
                <img src={data.data.brandData.logo} alt="Brand Logo" style={{ width: 'auto', height: '60px' }} />
                )}
            </div>
        </Header>
    ) ;


}