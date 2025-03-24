import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Define the JwtPayload interface
interface JwtPayload {
  userId: string;
  username: string;
}

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, return a 403 Forbidden response
  if (!token) {
    return res.sendStatus(403); // Forbidden
  }

  // Verify the JWT token
  jwt.verify(token, 'your_secret_key', (err, decodedUser) => {
    if (err || !decodedUser) {
      return res.sendStatus(403); // Forbidden if verification fails
    }

    // Now we explicitly cast the decodedUser to JwtPayload
    const user = decodedUser as JwtPayload;

    // Attach the decoded user information to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  });
};

export default authenticateJWT;






