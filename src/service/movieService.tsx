import axios from "axios";
import { MovieGetRes } from "../model/Response/movieGetRes";
import { DetailGetRes } from "../model/Response/detailGetRes";

const HOST: string = "http://www.omdbapi.com/?apikey=d15a22b7";

export class MovieService {
  async SearchMovie(name: string) {
    const url = HOST + "&s=" + name;
    console.log(url);
    const response = await axios.get(url);    
    const movie: MovieGetRes = response.data;    
    return movie;
  }

  async SearchById(id: string) {
    const url = HOST + "&i=" + id;
    console.log(url);
    const response = await axios.get(url);   
    console.log(response.data) 
    const detail: DetailGetRes = response.data;    
    return detail;
  }
}