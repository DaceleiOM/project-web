import { apiService } from "./apiService";
import { BranchInterface } from "@/interfaces/branchInterface";


export default class BranchService {
  // Get brand by id
  public getBranches = (id: number | undefined) =>
  new Promise<BranchInterface>((resolve, reject) => {
    apiService(`/branch/by-brand/${id}`, "GET")
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
  