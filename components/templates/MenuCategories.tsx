"use client";
import React, { useEffect, useState } from "react";
import BrandCategoryService from "@/services/BrandCategoryService";

import { Card,Layout, Menu} from 'antd';
import { useRouter } from "next/navigation";
import { Button } from 'antd';

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

    return (
        <Header style={{ display: 'flex', alignItems: 'center', background: '#333', color: '#fff', height: '80px' }}>
            {/* Elemento de la izquierda */}
            <div className="flex flex-1">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ minWidth: '370px', background: '#333', fontSize: '16px' }}
                >
                    {items}
                </Menu>
                <Button onClick={handleAllCategories} type="primary" style={{ marginTop: '15px' }}>Todas</Button>
            </div>


            {/* Elemento del centro */}
            <div className="flex flex-1 justify-center"></div>

            {/* Elemento de la derecha */}
            <div>
                {data.data.brandData.logo && (
                <img src={data.data.brandData.logo} alt="Brand Logo" style={{ width: 'auto', height: '90px' }} />
                )}
            </div>
        </Header>



    );


}