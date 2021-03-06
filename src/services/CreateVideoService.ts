import { getRepository } from 'typeorm';

import { Category } from '../entities/Category';
import { Video } from '../entities/Video';

interface VideoRequest {
  name: string;
  description: string;
  duration: string;
  category_id: string;
}

export class CreateVideoService {
  async execute({
    category_id,
    description,
    duration,
    name,
  }: VideoRequest): Promise<Error | Video> {
    const repo = getRepository(Video);
    const repoCategory = getRepository(Category);

    if (!(await repoCategory.findOne(category_id))) {
      return new Error('Category does not exists!');
    }

    const video = repo.create({ name, description, duration, category_id });

    await repo.save(video);

    return video;
  }
}
