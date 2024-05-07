"use client";
import React, { useEffect, useState } from "react";
import ProductCategoryTemplate from "@/components/templates/ProductCategoryTemplate";
import BrandService from "@/services/brandService";
import BranchService from "@/services/branchService";

import { BrandInterface } from "@/interfaces/brandInterface";
import { BranchInterface } from "@/interfaces/branchInterface";


const branchService = new BranchService();
const brandService = new BrandService();


export default function Product({ params }: { params: { brandId: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataBrand, setDataBrand] = useState<BrandInterface[]>([]);
  const [dataBranch, setDataBranch] = useState<BranchInterface[]>([]);

  const getDataBrand = () => {
    brandService.getById(params.brandId)
        .then((response: any) => {
            setDataBrand(response);
            setIsLoading(false);
        })
        .catch((error) => {
          console.log("error => ", error);
          setDataBrand([]);
          setIsLoading(false);
        });
  } 


  const getBranches = () => {
    branchService.getBranches(params.brandId)
      .then((response: any) => {
        setDataBranch(response);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log("Error fetching branches:", error);
      setDataBranch([]);
      setIsLoading(false);
    });
  } 

  useEffect(() => {
    getDataBrand();
    getBranches();
  }, []);
  
  
  return (
    <ProductCategoryTemplate data={{ brandId: params.brandId, categoryId: null, brandData: dataBrand, branchData: dataBranch }} />
  );
  
}
