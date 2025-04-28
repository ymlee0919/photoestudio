import { Module } from '@nestjs/common';
import { AdminModule } from './api/admin/admin.module';
import { ClientModule } from './client/client.module';
import { ServeStaticModule } from '@nestjs/serve-static'; 
import { join } from 'path';
import { RouterModule } from '@nestjs/core';

@Module({
imports: [
	AdminModule, 
	ClientModule,
	RouterModule.register([
		{ path: 'api', module: AdminModule }
	]),
	ServeStaticModule.forRoot({
		rootPath: join(__dirname, '../../', 'public')
	})
]
})

export class AppModule {}
