import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guard/auth.guard';

import { DatabaseModule } from 'src/services/database/database.module';

import { AccountsModule } from './accounts/accounts.module';
import { GalleryModule } from './gallery/gallery.module';
import { OffersModule } from './offers/offers.module';
import { SettingsModule } from './settings/settings.module';
import { ApplicationModule } from './app/application.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ServicesModule } from './services/services.module';
import { CategoriesModule } from './category/categories.module';

@Module({
	imports: [
		DatabaseModule, 
		AccountsModule, 
		GalleryModule, 
		OffersModule, 
		SettingsModule,
		ApplicationModule,
		ServicesModule,
		CategoriesModule,
		AuthModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '8h' },
		}),
	],
	providers: [{
		provide: APP_GUARD,
		useClass: AuthGuard
	}]
})
export class AdminModule {}
