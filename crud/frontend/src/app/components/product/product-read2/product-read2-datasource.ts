import { Product } from './../product.model';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

const EXAMPLE_DATA: Product[] = [
  {id: 1, name: 'Hydrogen', price: 9.99},
  {id: 2, name: 'Helium', price: 9.99},
  {id: 3, name: 'Lithium', price: 9.99},
  {id: 4, name: 'Beryllium', price: 9.99},
  {id: 5, name: 'Boron', price: 9.99},
  {id: 6, name: 'Carbon', price: 9.99},
  {id: 7, name: 'Nitrogen', price: 9.99},
  {id: 8, name: 'Oxygen', price: 9.99},
  {id: 9, name: 'Fluorine', price: 9.99},
  {id: 10, name: 'Neon', price: 9.99},
  {id: 11, name: 'Sodium', price: 9.99},
  {id: 12, name: 'Magnesium', price: 9.99},
  {id: 13, name: 'Aluminum', price: 9.99},
  {id: 14, name: 'Silicon', price: 9.99},
  {id: 15, name: 'Phosphorus', price: 9.99},
  {id: 16, name: 'Sulfur', price: 9.99},
  {id: 17, name: 'Chlorine', price: 9.99},
  {id: 18, name: 'Argon', price: 9.99},
  {id: 19, name: 'Potassium', price: 9.99},
  {id: 20, name: 'Calcium', price: 9.99},
];

/**
 *
 Fonte de dados para a exibição ProductRead2. Esta aula deveria
 * encapsular toda a lógica para buscar e manipular os dados exibidos
 * (incluindo classificação, paginação e filtragem).
 */
export class ProductRead2DataSource extends DataSource<Product> {
  data: Product[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   *Conecte esta fonte de dados à tabela. A tabela só será atualizada quando
   * o fluxo retornado emite novos itens.
   * @returns Um fluxo dos itens a serem renderizados.
   */
  connect(): Observable<Product[]> {
    // Combine tudo o que afeta os dados renderizados em uma atualização
    // stream para a tabela de dados consumir.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Chamado quando a mesa está sendo destruída. Use esta função para limpar
   * quaisquer conexões abertas ou liberar quaisquer recursos retidos que foram configurados durante a conexão.
   */
  disconnect() {}

  /**
   * Paginar os dados (lado do cliente). Se você estiver usando paginação do lado do servidor,
   * isso seria substituído solicitando os dados apropriados do servidor.
   */
  private getPagedData(data: Product[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Classifique os dados (lado do cliente). Se você estiver usando classificação do lado do servidor,
   * isso seria substituído solicitando os dados apropriados do servidor.
   */
  private getSortedData(data: Product[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Comparador de classificação simples para colunas de ID / Nome de exemplo (para classificação do lado do cliente). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
