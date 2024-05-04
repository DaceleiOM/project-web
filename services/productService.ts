import { apiService } from "./apiService";
import { ProductInterface } from "@/interfaces/productInterface";

export default class ProductService {
    
  // Get brand by id
  public getById = (id: number | undefined) =>
    new Promise<ProductInterface | null>((resolve, reject) => {
      if (id === undefined) {
        resolve(null); // Devuelve null cuando id es undefined
        return;
      }

      apiService(`/product/get-by-id/${id}`, "GET")
        .then((response) => {
          if (response?.data) {
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });

}