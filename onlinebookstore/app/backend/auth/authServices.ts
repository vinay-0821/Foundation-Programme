import { db } from '../database.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { User } from '../types.ts';

interface User {
  userid: number;
  password: string;
  role: 'buyer' | 'admin' | 'seller';
  name: string;
  email: string;
  phoneNo?: string;
  address?: string;
  date_of_birth?: Date; 
  join_date?: Date;     
}

interface UserToken {
  userid: number;
  role: 'buyer' | 'admin' | 'seller';
  email: string;  
}


export async function findUserByEmail(email: string): Promise<User | null> {
  const [rows]: any = await (await db).query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0] || null;
}

export async function validateUser(email: string, password: string): Promise<User | null> {
  const user = await findUserByEmail(email);
  if (user && await bcrypt.compare(password, user.password)) {
    const { password, ...safeUser } = user;
    return safeUser as User;
  }
  return null;
}

export function generateToken(user: UserToken): string {
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '1h' });
}

export async function insertUser(username: string, email: string, password: string): Promise<User | null> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result]: any = await (await db).query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    const newUser: User = {
      userid: result.insertId,
      name: username,
      email,
      password: '',
      role: 'buyer'
    };

    return newUser;
  } 
  catch (error) {
    console.error('Error inserting user:', error);
    return null;
  }
}

