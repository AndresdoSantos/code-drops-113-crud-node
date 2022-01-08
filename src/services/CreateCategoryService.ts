import { getRepository } from 'typeorm';

import { Category } from '../entities/Category';

interface CategoryRequest {
  name: string;
  description: string;
}

export class CreateCategoryService {
  async execute({
    name,
    description,
  }: CategoryRequest): Promise<Category | Error> {
    const repo = getRepository(Category);

    if (await repo.findOne({ name })) {
      return new Error(`Category with name ${name} already exists`);
    }

    const categoy = repo.create({
      name,
      description,
    });

    await repo.save(categoy);

    return categoy;
  }
}
