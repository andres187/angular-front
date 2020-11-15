import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '@app/models/producto';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoUrl = environment.api_server + 'producto/';

  constructor(private HttpClient: HttpClient) { }

  public lista(): Observable<Producto[]> {
    return this.HttpClient.get<Producto[]>(this.productoUrl + 'lista');
  }

  public detail(id: number): Observable<Producto> {
    return this.HttpClient.get<Producto>(this.productoUrl + `detail/${id}`);
  }

  public detailName(nombre: string): Observable<Producto> {
    return this.HttpClient.get<Producto>(this.productoUrl + `detailname/${nombre}`);
  }

  public save(producto: FormData): Observable<any> {
    return this.HttpClient.post<any>(this.productoUrl + 'create', producto);
  }

  public update(id: number, producto: Producto): Observable<any> {
    return this.HttpClient.put<any>(this.productoUrl + `update/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.HttpClient.delete<any>(this.productoUrl + `delete/${id}`);
  }
}
