import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  private commonData = {
    siteName: 'Площадка продажи корги',
    contacts: {
      address: 'Москва, ул. Лапушкина, д.5',
      phone: '+7 (123) 456-78-90',
    },
    menu: [
      { path: '/pages/index', title: 'О нас' },
      { path: '/pages/catalog', title: 'Каталог корги' },
      { path: '/pages/litters', title: 'Наши пометы' },
      { path: '/pages/partners', title: 'Наши партнеры' },
      { path: '/pages/available_puppies', title: 'Свободные щенки' },
      { path: '/pages/schedule', title: 'Бронирование фотосессии' },
    ],
  };

  @Get()
  @Render('pages/index')
  getFirst() {
    return {
      ...this.commonData,
      title: 'О нас',
      activePage: 'index',
    };
  }

  @Get('index')
  @Render('pages/index')
  getIndex() {
    return {
      ...this.commonData,
      title: 'О нас',
      activePage: 'index',
    };
  }

  @Get('catalog')
  @Render('pages/catalog')
  getCatalog() {
    return {
      ...this.commonData,
      title: 'Каталог корги',
      activePage: 'catalog',

      dogs: [
        {
          name: 'АртРаенс Черноморская Звезда',
          images: [
            {
              image: 'zvezda1.jpg',
              image_with: 300,
              image_height: 200,
            },
            {
              image: 'zvezda2.jpg',
              image_with: 300,
              image_height: 200,
            },
          ],
          age: 2,
        },
        {
          name: 'МариЛевс Грегори Хаус',
          images: [
            {
              image: 'gary1.jpg',
              image_with: 300,
              image_height: 200,
            },
            {
              image: 'gary2.jpg',
              image_with: 300,
              image_height: 200,
            },
          ],
          age: 3,
        },
        {
          name: 'Ромина Аберле',
          images: [
            {
              image: 'lessia_1.png',
              image_with: 200,
              image_height: 300,
            },
            {
              image: 'lessia_2.png',
              image_with: 200,
              image_height: 300,
            },
          ],
          age: 4,
        },
      ],
    };
  }

  @Get('available_puppies')
  @Render('pages/available-puppies')
  getAvailablePuppies() {
    return {
      ...this.commonData,
      title: 'Свободные щенки',
      activePage: 'available_puppies',
      puppies: [
        {
          name: 'Корги по кличке Снуппи',
          age: '3 месяца',
          price: '40 000 руб.',
          image: 'cute_small_corgi.jpg',
          description: 'Активный и дружелюбный щенок',
        },
        {
          name: 'Корги по кличке Лаки',
          age: '2 месяца',
          price: '38 000 руб',
          image: 'anothet_one_cute_corgi.jpg',
          description:
            'Веселый и жизнерадостный щенок, с отличным характером. Подходит для активной семьи',
        },
        {
          name: 'Корги по кличке Рокки',
          age: '4 месяца',
          price: '45 000 руб.',
          image: 'img.png',
          description:
            'Очень умный и послушный щенок с хорошими выставочными перспективами. Прекрасно ладит с детьми и взрослыми',
        },
      ],
    };
  }

  @Get('litters')
  @Render('pages/litters')
  getLitters() {
    return {
      ...this.commonData,
      title: 'Наши пометы',
      activePage: 'litters',
      litters: [
        {
          title: 'Помет от Гарри и Леси 2024',
          images: [
            'public/pages/img1/indigo_fera_2024.jpg',
            'public/pages/img1/izuminka_v_tirolskom_piroge_2024.jpg',
          ],
        },
        {
          title: 'Помет от Гарри и Звезды 2023',
          images: [
            'public/pages/img1/small_corgi_2024_2.jpg',
            'public/pages/img1/small_corgi_2024.jpg',
          ],
        },
      ],
    };
  }

  @Get('partners')
  @Render('pages/partners')
  getPartners() {
    return {
      ...this.commonData,
      title: 'Наши партнеры',
      activePage: 'partners',
      partners: [
        {
          name: 'Зоомагазин "Четыре Лапы"',
          description:
            'сеть магазинов для животных, где вы найдете всё необходимое для ухода за корги.',
          link: 'https://4lapy.ru',
        },
        {
          name: 'Клиника ветеринарии "ВетМед"',
          description:
            'ветеринарная клиника, с которой мы сотрудничаем более 5 лет, обеспечивая здоровье наших питомцев.',
          link: 'https://vetmed.ru',
        },
        {
          name: 'Фонд помощи животным "Доброе Сердце"',
          description:
            'благотворительный фонд, поддерживающий животных в сложных жизненных ситуациях. Мы регулярно сотрудничаем с ними в рамках благотворительных акций.',
          link: 'https://dobroeserdo.ru',
        },
      ],
    };
  }

  @Get('schedule')
  @Render('pages/schedule')
  getSchedule() {
    return {
      ...this.commonData,
      title: 'Бронирование фотосессии',
      activePage: 'schedule',
    };
  }
}
