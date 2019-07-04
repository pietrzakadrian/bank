import jwt from "jsonwebtoken";
import passport from "passport";
import {
  ExtractJwt,
  Strategy as JWTStrategy,
  StrategyOptions
} from "passport-jwt";

import { Strategy } from "passport";
import config from "../config/config";
import { User } from "../entities/user.entity";
import { UserService } from "../services/users.service";

const { auth } = config;

export class AuthHandler {
  jwtOptions: StrategyOptions;
  superSecret = auth.secretKey;

  constructor() {
    this.jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // HEADER: Authorization: bearer JSON_WEB_TOKEN_STRING.....
      secretOrKey: this.superSecret
    };
  }

  /**
   * initialize the Auth middleware & configure JWT strategy for Passport
   */
  initialize() {
    passport.use("jwt", this.getStrategy());
    return passport.initialize();
  }

  /**
   * configure & return the JWT strategy for passport
   */
  getStrategy(): Strategy {
    return new JWTStrategy(this.jwtOptions, async (jwt_payload, next) => {
      const userService = new UserService();

      try {
        const user = await userService.getByEmail(jwt_payload.email); // todo: change to uuid ?

        // if user not found for this id
        if (!user) {
          return next(null, false);
        }

        // authentication passed
        return next(undefined, {
          id: user.id,
          email: user.email
        });
      } catch (err) {
        return next(null, false);
      }
    });
  }

  /**
   * Authentication handler. Call this on routes needs authentication
   */
  authenticate() {
    return passport.authenticate("jwt", {
      session: false,
      failWithError: true
    });
  }

  /**
   * Generate JWT token.
   * @param user
   */
  generateToken(user: User): string {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      this.superSecret,
      {
        expiresIn: "5d"
      }
    );

    return token;
  }
}
