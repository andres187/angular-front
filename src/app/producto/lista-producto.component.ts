import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  productos: Producto[] = [];
  isAdmin = false;
  roles: string[];

  constructor(private productoService: ProductoService,
    private tokenService: TokenService,    
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cargarProductos();
    if(this.tokenService.getToken()){
      this.roles = this.tokenService.getAuthorities();
      this.roles.forEach(
        role => {
          if(role === 'ROLE_ADMIN' ){
            this.isAdmin = true;
          }
        }
      );
    }
  }

  cargarProductos(): void {
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: number) {
    this.productoService.delete(id).subscribe(
      data => {
        this.toastr.success('Producto eliminado.', 'Ok', {
          timeOut: 3000
        });
        this.cargarProductos();
      },
      err => {
        this.toastr.success(err.error.mensaje, 'Error', {
          timeOut: 3000
        });
        this.cargarProductos();
      }
    )
  }

}
