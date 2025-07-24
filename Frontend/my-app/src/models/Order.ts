import { MovieObject } from "./Movie";

export interface Order {
  completed: boolean;
  id: number;
  date: string;
  movies: MovieObject[];
  price: number;
}