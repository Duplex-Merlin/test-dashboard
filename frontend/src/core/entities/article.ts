export interface ArticleResponse {
    id: string;
    title: string;
    description: string;
    coverPicture: string;
    status: boolean;
    content: any;
    createdAt: string;
  }

  export interface ArticlesPaginate {
    data: ArticleResponse[],
    page: number;
    pageSize: number;
    totalResults: number;
    totalPages: number
  }