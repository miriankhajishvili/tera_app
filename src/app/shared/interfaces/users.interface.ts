export interface IData {
  first: number;
  prev: number;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: IUsers[];
}

export interface IUsers {
  id: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  role: string
}
