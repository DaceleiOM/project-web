import { apiService } from "./apiService";
import { BrandCategoryInterface } from "@/interfaces/BrandCategoryInteface";

export default class BrandCategoryService {
    
  // Get brand by id
  public getByBrand = (id: string | undefined) =>
    new Promise<BrandCategoryInterface[]>((resolve, reject) => {
      if (id === undefined) {
        resolve([]); // Devuelve un array vacío si id es undefined
        return;
      }
  
      apiService(`/brand-category/get-by-brandId/${id}`, "GET")
        .then((response) => {
          if (response?.data) {
            resolve(response.data);
            console.log(response)
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  

}