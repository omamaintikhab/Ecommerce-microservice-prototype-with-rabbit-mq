import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ){}

    async fetchAll(): Promise<Product[]>{
      return this.productRepository.find();
    }

    async fetchSpecific(id: number): Promise<Product>{
        return this.productRepository.findOneById(id);
      }

    async createProduct(data): Promise<Product>{
        return await this.productRepository.save(data);
      }
    
    async findById(id:number){
      return await this.productRepository.findOneById(id)
    } 
    async update(id:number, data): Promise<any>{
        return this.productRepository.update(id, data);
      }
    
    async deleteProduct(id: number): Promise<any>{
        return this.productRepository.delete(id);
      }
}
