export interface FetchAllParams {
    searchKeyword:  string | null
    sortBy: string | null
    sortDescending: boolean
    pageNumber: number
    pageSize: number
  }
  
  // export const BASE_URL = 'https://shop-waves-backend.azurewebsites.net/api/v1'
  export const BASE_URL = 'http://localhost:5034/api/v1'