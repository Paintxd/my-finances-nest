import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { Connection, getConnection } from 'typeorm';
import { TenantMiddleware } from './tenant.middleware';

export const TENANT_CONNECTION = 'TENANT_CONNECTION';

@Module({
  imports: [AuthModule],
  providers: [
    {
      provide: TENANT_CONNECTION,
      inject: [REQUEST, Connection],
      scope: Scope.REQUEST,
      useFactory: async (request) => {
        const jwtService = new JwtService({ secret: process.env.JWT_SECRET });
        const tenant = jwtService.decode(
          request.headers.authorization.split(' ')[1],
        );
        return getConnection(tenant['login']);
      },
    },
  ],
  exports: [TENANT_CONNECTION],
})
export class TenantModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('bills', 'automatic-billing');
  }
}
