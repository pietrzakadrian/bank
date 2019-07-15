import jwt from "jsonwebtoken";
import passport from "passport";
import { BasicStrategy } from "passport-http";
import {
  ExtractJwt,
  Strategy as JWTStrategy,
  StrategyOptions
} from "passport-jwt";

import { Strategy } from "passport";
import config from "../config/config";
import { User } from "../entities/user.entity";
import { UserService } from "../services/users.service";

const { auth, admin } = config;

export class AuthHandler {
  jwtOptions: StrategyOptions;
  superSecret = auth.secretKey;
  BasicStrategy: BasicStrategy;

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
    passport.use("jwt", this.getJWTStrategy());
    passport.use("basic", this.getBasicStategy());
    return passport.initialize();
  }

  /**
   * configure & return the JWT strategy for passport
   */
  getJWTStrategy(): Strategy {
    return new JWTStrategy(this.jwtOptions, async (jwt_payload, next) => {
      const userService = new UserService();

      try {
        const user = await userService.getById(jwt_payload.id);

        // if user not found for this id
        if (!user) {
          return next(null, false);
        }

        // authentication passed
        return next(undefined, {
          id: user.id
        });
      } catch (err) {
        return next(null, false);
      }
    });
  }

  getBasicStategy(): Strategy {
    return new BasicStrategy(function(username, password, done) {
      if (
        username.valueOf() === `${admin.login}` &&
        password.valueOf() === `${admin.password}`
      ) {
        return done(null, true);
      } else {
        return done(null, false);
      }
    });
  }

  /**
   * Authentication handler. Call this on routes needs authentication
   */
  authenticate(option: string) {
    if (option === "jwt") {
      return passport.authenticate("jwt", {
        session: false,
        failWithError: true
      });
    }

    if (option === "basic") {
      return passport.authenticate("basic", {
        session: false
      });
    }
  }

  /**
   * Generate JWT token.
   * @param user
   */
  generateToken(user: User): string {
    const token = jwt.sign(
      {
        id: user.id
      },
      this.superSecret,
      {
        expiresIn: "5d"
      }
    );

    return token;
  }
}
