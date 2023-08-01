import { Body, Controller, Post, Get, UseGuards, Put, Param, ParseIntPipe, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-role';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) { }

  //GET
  //POST
  //PUT, PATCH
  //DELETE

  @HasRoles(JwtRole.CLIENT)
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  @Get() // http://l10.0.0.137:3000/users -> GET
  findAll() {

    return this.usersService.finalAll();
  }

  @Post() // http://10.0.0.137:3000/users -> POST
  create(@Body() user: CreateUserDto) {

    return this.usersService.create(user);
  }

  @HasRoles(JwtRole.CLIENT)
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  @Put(':id') // http://10.0.0.137:3000/users/:id -> PUT
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto
  ) {

    return this.usersService.update(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateWithImage(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
      ],
    }),
  ) file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto
  ) {
    this.usersService.updateWithImage(file, id, user);
  }

}
