import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getBrand() {
    return {
      name: "d'Praieira",
      tagline: 'Praieira | Moda Praia Casual',
      slogan: 'Mais que moda, um estilo de vida!',
      instagram: 'https://instagram.com/dpraeiraoficial',
      instagramHandle: '@dpraeiraoficial',
      phone: '71 99210-8098',
    };
  }
}
