import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsBoolean()
  @IsNotEmpty()
  isAvailable?: boolean;

  @IsOptional()
  @IsString() 
  categoryId?: string;
}
