import { Controller, Get, Post, Body, Param, Put, Delete, Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { ClientProxy } from '@nestjs/microservices';


@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
    ){}
    @Get()
    fetchAll(){
        this.client.emit('hello', 'Hello from rabbit mq omama')
        return this.productService.fetchAll()
    }

    @Post()
    async createProduct(
        @Body('title') name: string,
        @Body('image') image: string,
    ){
       console.log('name and image', name, image)
       const product = await this.productService.createProduct({name, image})
       this.client.emit('product_created', product)
       return product;
    }

    @Get(':id')
    fetchSpecific(
        @Param('id') id:number
    ){
        return this.productService.fetchSpecific(id)
    }

    @Put(':id')
    async updateProduct(
        @Param('id') id:number,
        @Body('title') name: string,
        @Body('image') image: string,
    ){  
        await this.productService.updateProduct(id, {name, image})
        const product = await this.productService.fetchSpecific(id)
        console.log('get product', product)
        this.client.emit('product_updated', product)
        return product;
    }

    @Delete(':id')
    async deleteProduct(
        @Param('id') id:number
    ){
        await this.productService.deleteProduct(id)
        this.client.emit('product_deleted', id)
    }

}
