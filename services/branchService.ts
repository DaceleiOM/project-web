import { apiService } from "./apiService";
import { BranchInterface } from "@/interfaces/branchInterface";


export default class BranchService {
  // Get brand by id
  public getBranches = (id: string | undefined) =>
    new Promise<BranchInterface | null>((resolve, reject) => {
      if (id === undefined) {
        resolve(null); // Devuelve null cuando id es undefined
        return;
      }

      apiService(`/branch/by-brand/${id}`, "GET")
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
