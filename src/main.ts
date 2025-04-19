
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const viewsDir = join(__dirname, '..', 'views');
  hbs.registerPartials(join(viewsDir, 'partials'));
  hbs.registerHelper('eq', (a, b) => a === b);

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

  app.setViewEngine({
    engine: { handlebars: hbs },
    templates: viewsDir,
    layout: 'layouts/main'
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

bootstrap();
