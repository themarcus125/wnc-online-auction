export interface CreateCategoryDTO {
  name: string;
  parent?: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  parent?: string;
}
