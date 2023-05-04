import { Request, Response, Express } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Database } from '../database'

export class API {
  app: Express
  database: Database

  constructor(app: Express, database: Database) {
    this.app = app
    this.database = database

    this.app.post('/register', this.registerUser)
    this.app.post('/login', this.loginUser)
    this.app.post('/posts', this.createPost)
    this.app.delete('/posts/:id', this.deletePost);
    //this.app.get('/comments')
  }

  registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body
    
    const userExists = await this.database.executeSQL(
      `SELECT * FROM users WHERE name='${username}'`
    );
    if (userExists.length > 0) {
      res.status(409).send({ message: 'Username already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    try {
      await this.database.executeSQL(
        `INSERT INTO users (name, password) VALUES ('${username}', '${hashedPassword}')`
      )
      res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error registering user' })
    }
  }

  loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body

    try {
      const result = await this.database.executeSQL(
        `SELECT * FROM users WHERE name='${username}'`
      )
      const user = result[0]

      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' })
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password)

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid username or password' })
      }

      const token = jwt.sign({ id: user.id, username: user.name }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      })

      res.status(200).json({ token, message: 'Logged in successfully' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error logging in' })
    }
  }

  createPost = async (req: Request, res: Response) => {
    const { content } = req.body; 
    console.log("Request Body:", req.body); // debugging
    // Get the user_id from the JWT token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user_id = decoded.id;
    try {
      const result = await this.database.executeSQL(
        `INSERT INTO tweets (content, user_id) VALUES ('${content}', ${user_id}) RETURNING id, content`
      );
      const newPost = result[0];
      console.log("New Post:", newPost); // debugging
      res.status(201).json(newPost);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating post" });
    }
  }

  deletePost = async (req: Request, res: Response) => {
    const postId = req.params.id;
  
    try {
      await this.database.executeSQL(`DELETE FROM tweets WHERE id=${postId}`);
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error deleting post' });
    }
  }
  
}
