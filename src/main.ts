import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as exphbs from 'express-handlebars';
import { join } from 'path';
import Handlebars from 'handlebars';
import session from 'express-session'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use(
    session({
      secret: 'надежный-secret))',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000,
        httpOnly: true
      },
    }),
  );

  Handlebars.registerHelper('eq', function (a: any, b: any, options: any) {
    if (arguments.length !== 3) {
      throw new Error("Helper 'eq' requires two arguments");
    }
    return a === b ? options.fn(this) : () => {}
  });

  Handlebars.registerHelper('pluralize', function(number, ...forms) {
    number = Math.abs(number) % 100;
    let n = number % 10;
    if (number > 10 && number < 20) return forms[2];
    if (n > 1 && n < 5) return forms[1];
    if (n === 1) return forms[0];
    return forms[2];
  })

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
  const config = new DocumentBuilder()
    .setTitle('Corgi site')
    .setDescription('The corgis API description')
    .setVersion('1.0')
    .addTag('corgis')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();