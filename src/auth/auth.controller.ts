import { Body,Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

        @Post('register') // http://localhost/auth/register -> POST
        registerDecorator(@Body() user: RegisterUserDto){
           return this.authService.register(user);
    
    }


    @Post('login') // http://localhost/auth/register -> POST
    login(@Body() loginData: LoginAuthDto){
        console.log('Client data ', loginData)
       return this.authService.login(loginData);

}
}
