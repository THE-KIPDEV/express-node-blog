import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Article } from '@interfaces/articles.interface';
import { ArticleService } from '@services/articles.service';

export class ArticleController {
  public article = Container.get(ArticleService);

  public getArticles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllArticles: Article[] = await this.article.findAllArticles();

      res.status(200).json({ data: findAllArticles, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getArticleBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const articleSlug = String(req.params.slug);
      const findOneArticle: Article = await this.article.findArticleBySlug(articleSlug);

      res.status(200).json({ data: findOneArticle, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const articleData: Article = req.body;
      const createArticleData: Article = await this.article.createArticle(articleData);

      res.status(201).json({ data: createArticleData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const articleId = Number(req.params.id);
      const articleData: Article = req.body;
      const updateArticleData: Article = await this.article.updateArticle(articleId, articleData);

      res.status(200).json({ data: updateArticleData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const articleId = Number(req.params.id);
      const deleteArticleData: Article = await this.article.deleteArticle(articleId);

      res.status(200).json({ data: deleteArticleData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
