import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as exphbs from 'express-handlebars';
import { join } from 'path';
import Handlebars from 'handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  Handlebars.registerHelper('eq', function (a: any, b: any, options: any) {
    if (arguments.length !== 3) {
      throw new Error("Helper 'eq' requires two arguments");
    }
    return a === b ? options.fn(this) : () => {}
  });

  app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: join(__dirname, '..', 'views', 'layouts'),
    partialsDir: [
      join(__dirname, '..', 'views', 'partials'),
      join(__dirname, '..', 'views', 'pages'),
    ],
    handlebars: Handlebars,
  }));

  app.setViewEngine('hbs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.useStaticAssets(
    join(__dirname, '..', 'public'),
    { prefix: '/public/' }
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
