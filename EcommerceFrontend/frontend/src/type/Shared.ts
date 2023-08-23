export interface FetchAllParams {
    searchKeyword:  string | null
    sortBy: string | null
    sortDescending: boolean
    pageNumber: number
    pageSize: number
  }