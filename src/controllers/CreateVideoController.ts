import { Request, Response } from 'express';
import { CreateVideoService } from '../services/CreateVideoService';

export class CreateVideoController {
  async handle(request: Request, response: Response) {
    const { name, description, duration, category_id } = request.body;

    const service = new CreateVideoService();

    const result = await service.execute({
      category_id,
      description,
      duration,
      name,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
