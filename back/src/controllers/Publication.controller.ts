import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Comments } from "../entity/Comments";
import { Likes } from "../entity/Likes";
import { Publication } from '../entity/Publication';

export const postPublication = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id_user, description } = req.body;
        // const file = 'http://localhost:3030/' + req.file?.path.split('\\')[5] + '/' + req.file?.filename;
        const file = 'http://localhost:3030/public' + '/' + req.file?.filename;
        // console.log(req.file);

        const PostPubli = { id_user, description, file: file, publication_State: 1 };
        const newPublication = getRepository(Publication).create(PostPubli);
        const result = await getRepository(Publication).save(newPublication);
        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getPublications = async (req: Request, res: Response): Promise<Response> => {
    let Publi = [];
    try {
        const Publications = await getRepository(Publication).find({ relations: ['id_user'], order: { id_publication: "DESC" }, where: { publication_State: 1 } });
        for (let i = 0; i < Publications.length; i++) {
            const Like = await getRepository(Likes).find({ relations: ['id_user'], where: { id_publication: Publications[i].id_publication } });
            const Comment = await getRepository(Comments).find({ relations: ['id_user'], where: { id_publication: Publications[i].id_publication } });
            console.log(Like);
            let Publicat = {
                "id_publication": Publications[i].id_publication,
                "descripcion": Publications[i].description,
                "updated_at": Publications[i].updated_at,
                "file": Publications[i].file,
                "user": Publications[i].id_user,
                "likes": Like,
                "comments": Comment
            }
            console.log(Publicat);

            Publi.push(Publicat);
        }
        return res.json(Publi);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getTimeLine = async (req: Request, res: Response): Promise<Response> => {
    return res.json("get timeline")
}

export const getPublicationUnique = async (req: Request, res: Response): Promise<Response> => {
    return res.json("get publications unique")
}

export const UpdatePublication = async (req: Request, res: Response): Promise<Response> => {
    return res.json("update publications")
}

export const DeletePublication = async (req: Request, res: Response): Promise<Response> => {
    return res.json("delete publications")
}

export const LikePublication = async (req: Request, res: Response): Promise<Response> => {
    try {
        // const post = await getRepository(Publication).findOne(req.params.id);
        const likesP = await getRepository(Likes).findOne({ where: { id_publication: req.body.id_publication, id_user: req.body.id_user } });
        if (likesP) {
            return res.json("can't post like two times");
        } else {
            const LikeData = { id_user: req.body.id_user, id_publication: req.body.id_publication }
            // const LikePost = getRepository(Like).create(LikeData);
            const Return = await getRepository(Likes).save(LikeData);
            return res.json(Return);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const UnLikePublication = async (req: Request, res: Response): Promise<Response> => {
    try {
        // const post = await getRepository(Publication).findOne(req.params.id);
        const likesP = await getRepository(Likes).findOne({ where: { id_publication: req.body.id_publication, id_user: req.body.id_user } });
        if (likesP) {
            const LikeData = { id_user: req.body.id_user, id_publication: req.body.id_publication }
            // const LikePost = getRepository(Like).create(LikeData);
            const Return = await getRepository(Likes).delete(LikeData);
            return res.json("unlike effective");
        } else {
            return res.json("u don't have like in this post");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const CommentPublication = async (req: Request, res: Response): Promise<Response> => {
    try {
        const CommentData = { id_user: req.body.id_user, id_publication: req.body.id_publication, text: req.body.text }
        const CommentPost = await getRepository(Comments).save(CommentData);
        return res.json(CommentPost);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

export const DeleteCommentPublication = async (req: Request, res: Response): Promise<Response> => {
    try {
        const Comment = await getRepository(Comments).findOne({ where: { id_comment: req.body.id_comment, id_user: req.body.id_user, id_publication: req.body.id_publication } })
        if (Comment) {
            await getRepository(Comments).delete(Comment);
            return res.json("Comment delete succesfull");
        } else {
            return res.json("u haven't post Comment");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}