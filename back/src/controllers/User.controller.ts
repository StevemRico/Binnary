import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Users } from '../entity/User';
import { Follows } from '../entity/Follows';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;

export const Login = async (req: Request, res: Response):Promise<Response> => {
  try {
    const User = await getRepository(Users).findOne({username: req.body.username});
    if(User){
        let PassHash = bcrypt.compareSync(req.body.password, User.password);
        if(PassHash){
            // const token: string = jwt.sign({_id: Users.id_user}, 'TOKEN_SECRET' || '', {expiresIn: '3s'})
            // return res.header('auth-token', token).json(token);
            const token = jwt.sign({User}, 'TOKEN_SECRET')
            return res.json(token);
        }else{
            return res.json("Usuario y/o contraseña incorrectas");
        }
    }else{
        return res.json("El usuario no existe");
    } 
  } catch (error) {
    return res.status(500).json(error)  
  }
}

export const Register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const Username = await getRepository(Users).findOne({ username: req.body.username });
  const Email = await getRepository(Users).findOne({ email: req.body.email });
  const Phone = await getRepository(Users).findOne({ phone_number: req.body.phone_number });

  if (Username) {
    console.log('Username ya en uso');
    return res.status(400).json("Username ya en uso");
  } else if (Email) {
    console.log('Email ya en uso');
    return res.status(400).json("Email ya en uso");
  } else if (Phone) {
    console.log('Phone ya en uso');
    return res.status(400).json("Phone ya en uso");
  } else {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const roleStatus: any = 1;
    const UserBody = {
      username: req.body.username,
      email: req.body.email,
      password: hash,
      phone_number: req.body.phone_number,
      user_status: roleStatus,
      role: roleStatus,
      profile_image: "http://localhost:3030/public/Profile-Image.png",
      description_profile: req.body.description_profile,
      birthday_date: req.body.birthday_date,
      login_date: req.body.login_date,
    }
    const newUser = getRepository(Users).create(UserBody);
    await getRepository(Users).save(newUser)
    return res.json("Usuario Registrado");
  }
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const UserGet = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await getRepository(Users).findOne(req.params.id);
    const userData = {
      username: user?.username,
      email: user?.email,
      phone_number: user?.phone_number,
      profile_image: user?.profile_image,
      description: user?.description_profile
    }
    return res.status(200).json(userData);
  } catch (err) {
    return res.status(500).json(err);
  }
}

export const UserUpdate = async (req: Request, res: Response): Promise<Response> => {
  return res.json("update User")
}

export const UserUpdatePassword = async (req: Request, res: Response): Promise<Response> => {
  return res.json("update User")
}

// export const UserDelete = async (req: Request, res: Response): Promise<Response> => {
// }

export const UserFollow = async (req: Request, res: Response): Promise<Response> => {
  if (req.body.id_user !== req.params.id) {
    try {
      const user = await getRepository(Follows).findOne({where:{id_user_follower: req.body.id_user}});
      const currentUser = await getRepository(Follows).findOne({where:{ id_user_follow: req.params.id}});
      if (!user && !currentUser) {
        const follow: any = req.params.id;
        const FollowData = {id_user_follower: req.body.id_user, id_user_follow: follow}
        const NewFollow = getRepository(Follows).create(FollowData);
        getRepository(Follows).save(NewFollow);
        return res.status(200).json("user has been followed");
      } else {
        return res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can't follow yourself");
  }
}

export const UserUnFollow = async (req: Request, res: Response): Promise<Response> => {
  if (req.body.id_user !== req.params.id) {
    try {
      const user = await getRepository(Follows).findOne({where:{id_user_follower: req.body.id_user, id_user_follow: req.params.id}});
      if (user) {
        getRepository(Follows).delete(user);
        return res.status(200).json("user has been unfollowed");
      } else {
        return res.status(403).json("you allready don't follow this user");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can't unfollow yourself");
  }
}

export const UserFind = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await getRepository(Users).findOne({where:{username: req.body.find, user_status: 1}})
    const Find = {
      username: user?.username,
      profile_image: user?.profile_image
    }
    if(user){
      return res.json(Find);
    }else{
      return res.status(403).json("Without Results")
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}