import { apiService } from "./apiService";
import { ProductCategoryInterface } from "@/interfaces/productcategoryinterface";



export default class ProductCategoryService {
    

      // Get brand by id
    public getByCategory = (id: string | undefined) =>
      new Promise<ProductCategoryInterface | null>((resolve, reject) => {
      if (id === undefined) {
        resolve(null); // Devuelve null cuando id es undefined
        return;
      }

      apiService(`/product-category/product-by-category/${id}`, "GET")
        .then((response) => {
          if (response?.data) {
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });










    public getByBrand = (brandId: string | undefined) =>
      new Promise((resolve, reject) => {
        apiService(`/product-category/product-by-brandid/${brandId}`, "GET")
          .then((response) => {
            if (response?.data) {
              resolve(response?.data);
            }
          })
          .catch((error) => {
            reject(error);
        });
     });
}