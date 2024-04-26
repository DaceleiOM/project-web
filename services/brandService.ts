import { apiService } from "./apiService";

export default class BrandService {
    public getBrands = () =>
      new Promise((resolve, reject) => {
        apiService(`/brand/getAll`, "GET")
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
  