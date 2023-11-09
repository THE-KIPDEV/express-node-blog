import { Router } from 'express';
import { ArticleController } from '@controllers/articles.controller';
import { CreateArticleDto } from '@dtos/articles.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class ArticleRoute implements Routes {
  public path = '/articles';
  public router = Router();
  public article = new ArticleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.article.getArticles);
    this.router.get(`${this.path}/:slug`, this.article.getArticleBySlug);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateArticleDto), this.article.createArticle);
    this.router.put(`${this.path}/:id(\\d+)`, AuthMiddleware, ValidationMiddleware(CreateArticleDto, true), this.article.updateArticle);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, this.article.deleteArticle);
  }
}
