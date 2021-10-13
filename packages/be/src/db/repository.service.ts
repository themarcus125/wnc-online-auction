import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';

export default abstract class RepositoryService<DocT, CreateDtoT> {
  model: Model<DocT>;
  constructor(model: Model<DocT>) {
    this.model = model;
  }

  getModel() {
    return this.model;
  }

  create(dto: CreateDtoT) {
    return this.model.create(dto);
  }

  findById(id: string, options?: QueryOptions, select?: string) {
    const query = this.model.findById(id, options);
    if (select) {
      return query.select(select);
    }
    return query;
  }

  findOne(filter: FilterQuery<DocT>, options?: QueryOptions, select?: string) {
    const query = this.model.findOne(filter, options);
    if (select) {
      return query.select(select);
    }
    return query;
  }

  find(filter: FilterQuery<DocT>, options?: QueryOptions, select?: string) {
    const query = this.model.find(filter, options);
    if (select) {
      return query.select(select);
    }
    return query;
  }

  findOneAndUpdate(
    filter: FilterQuery<DocT>,
    dto: UpdateQuery<DocT>,
    options: QueryOptions = { returnOriginal: false },
  ) {
    return this.model.findOneAndUpdate(filter, dto, options);
  }
}

export interface ModeQuery<DocT, QueryDtoT> {
  modeFilterQuery?(mode: string, payload: QueryDtoT): FilterQuery<DocT>;
  modeFind(mode: string, payload: QueryDtoT): Promise<DocT[]>;
}
