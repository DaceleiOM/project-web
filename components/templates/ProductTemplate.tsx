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
    <div className={`w-full flex flex-col gap-4 justify-center items-center`}>
      {dataSource.map((product) => (
        <Card
          key={product.id}
          style={{ width: '100%' }} // Ajustar al ancho del contenedor
          cover={
            <img
              alt={product.name}
              src={product.images}
              style={{
                minHeight: '200px', // Altura mínima de la imagen
                maxHeight: '350px', // Altura máxima de la imagen
                objectFit: 'cover', // Mantiene la imagen dentro de los límites definidos
                width: '100%' // Asegura que la imagen ocupe todo el ancho del contenedor
              }}
            />
          } 
        >
          <Meta
            title={product.name}
            description={
              <>
                <p>{product.description}</p>
                <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Precio: {product.price && new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(parseFloat(product.price))}</p>
              </>
            }
            style={{ textAlign: 'center' }}
          />
        </Card>
      ))}
    </div>
  );
  
}