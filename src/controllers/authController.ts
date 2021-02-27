import { Response, Request } from 'express';
import User from '@/models/userModel';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user: any = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!user)
      return res.status(401).json({
        message: `The username ${user} is not associated with any account, check your username and try again`,
      });

    if (!user.isValidPassword(password))
      return res.status(401).json({ message: 'Mot de passe incorrect' });

    user.last_logged = Date.now();
    await user.save();

    res.status(200).json(user.generateJWT());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
