import { Controller, Get, Render } from '@nestjs/common';

@Controller('/pages')
export class AppController {
  @Get('index')
  @Render('pages/index')
  getIndex() {

  }

  @Get('catalog')
  @Render('pages/catalog')
  getCatalog() {
    return {
      title: 'Каталог корги',
      activePage: 'catalog',
      dogs: [
        {
          name: 'МариЛевс Грегори Хаус',
          images: ['gary1.jpg', 'gary2.jpg'],
          age: 3
        }
      ]
    };
  }
}