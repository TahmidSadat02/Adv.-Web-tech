import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    // 1. Separate the categoryId string from the rest of the item data
    const { categoryId, ...rest } = createMenuDto;

    // 2. Create the base item using the standard text and numbers
    const newItem = this.menuRepository.create(rest);

    // 3. Manually map the category relationship to satisfy TypeORM and TypeScript
    if (categoryId) {
      newItem.category = { id: categoryId } as any; 
    }

    return await this.menuRepository.save(newItem);
  }

  async findAll(): Promise<Menu[]> {
    return await this.menuRepository.find({ relations: ['category'] });
  }

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    // 1. Separate the categoryId string so Object.assign doesn't mess it up
    const { categoryId, ...rest } = updateMenuDto;

    const menuItem = await this.menuRepository.findOne({ where: { id } });

    if (!menuItem) {
      throw new NotFoundException(`Menu item #${id} not found`);
    }

    // 2. Safely merge the standard text, prices, and availability
    Object.assign(menuItem, rest);

    // 3. Manually handle the category assignment
    if (categoryId !== undefined) {
      menuItem.category = categoryId === '' ? null : ({ id: categoryId } as any);
    }

    // 4. Save everything deeply to the database
    await this.menuRepository.save(menuItem);

    // 5. Return the fresh item with its newly attached category so the frontend updates instantly
    return await this.menuRepository.findOne({
      where: { id },
      relations: ['category'],
    }) as Menu;
  }

  async remove(id: string): Promise<void> {
    const menuItem = await this.menuRepository.findOne({ where: { id } });
    
    if (!menuItem) {
      throw new NotFoundException(`Menu item #${id} not found`);
    }

    await this.menuRepository.remove(menuItem);
  }
}