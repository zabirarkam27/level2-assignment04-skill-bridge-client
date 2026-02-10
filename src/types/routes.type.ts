export interface Route {
  title: string;
  items: {
    title: string;
    url: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  description?:string;
  image?: string;
}