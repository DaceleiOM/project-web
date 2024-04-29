"use client";
import React, { useEffect, useState } from "react";
import { ProductInterface } from "@/interfaces/productInterface";
import ProductService from "@/services/productService";
import { Card} from 'antd';
const { Meta } = Card;

const productService = new ProductService();


export default function ProductTemplate( item : any) {
  const [productId, setProductId] = useState<any>(item.productId);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<ProductInterface[]>([]);
  console.log(item)


  const getData = () => {
    productService.getById(productId)
    .then((response:any) => {
      // Envolver el objeto de respuesta en un array
      const dataAsArray = [response];
      setDataSource(dataAsArray);
      setIsLoading(false);
      console.log(response);
    })
    .catch((error) => {
      setDataSource([]);
      setIsLoading(false);
    })
  }

  // Se ejecuta cuando cambia el brandId
  useEffect(() => {
    setProductId(item.productId); // Actualiza el brandId en el estado
  }, [item.productId]);
  useEffect(() => {
    getData();
  }, [productId]);


  
  return (
    <div className={`w-full flex flex-col gap-4`}>

      {dataSource.map((product) => (
        <Card
          key={product.id}
          hoverable
          style={{ width: '100%' }} // Ajustar al ancho del contenedor
          cover={<img alt={product.name} src={product.images} />}
        >
          <Meta
            title={product.name}
            description={
              <>
                <p>{product.description}</p>
                <p>Precio: {product.price}</p>
              </>
            }
            style={{ textAlign: 'center' }}
          />
        </Card>
      ))}
    </div>
  );
}