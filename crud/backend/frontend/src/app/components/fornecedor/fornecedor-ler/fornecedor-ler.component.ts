import { Component, OnInit } from '@angular/core';
import {Fornecedor} from "../fornecedor.model";
import {FornecedorService} from "../fornecedor.service";
import {Router} from "@angular/router";
import {Product} from "../../product/product.model";
import {ProductService} from "../../product/product.service";

@Component({
  selector: 'app-fornecedor-ler',
  templateUrl: './fornecedor-ler.component.html',
  styleUrls: ['./fornecedor-ler.component.css']
})
export class FornecedorLerComponent implements OnInit {

  fornecedores: Fornecedor[]
  displayedColumns = ['id', 'name', 'price', 'action']

  constructor(private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    this.fornecedorService.read().subscribe(fornecedores => {
      this.fornecedores = fornecedores
    })
  }

}