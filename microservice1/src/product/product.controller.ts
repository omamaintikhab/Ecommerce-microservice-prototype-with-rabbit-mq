import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){}
    @Get()
    fetchAll(){
        return this.productService.fetchAll()
    }

    @Post()
    async handleLikes(
        @Param('id') id:number
        ){
        const product = await this.productService.findById(id)

        return this.productService.update(id, {
            likes: product.likes + 1,
        })
    }

    @EventPattern('product_created')
    async createProduct(data: any){
    console.log('listen', data)
     await this.productService.createProduct({
        id: data.id,
        name: data.name,
        likes: data.likes,
        image: data.image
    })
    }
    
    @EventPattern('product_updated')
    async updateProduct(data: any){
    console.log('update', data)
     await this.productService.update(data.id, {
        id: data.id,
        name: data.name,
        likes: data.likes,
        image: data.image
    })
    }

    @EventPattern('product_deleted')
    async deleteProduct(id: any){
    console.log('delete', id)
     await this.productService.deleteProduct(id)
    }
}
