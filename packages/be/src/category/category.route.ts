import express from 'express';
import CategoryController from '@/category/category.controller';

const categoryRoute = express.Router();

categoryRoute.get('/:categoryId', CategoryController.getCategory);
categoryRoute.get('/', CategoryController.getCategories);

export default categoryRoute;
