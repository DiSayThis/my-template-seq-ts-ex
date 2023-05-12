import { getById } from '../../database/dal/user.js';
import passport from 'passport';
import passportJwt from 'passport-jwt';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const passportGuard = passport;
export const passportAdminGuard = passport;

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SALT || 'salt',
};

passportGuard.use(
	new JwtStrategy(options, async (jwt_payload, done) => {
		try {
			const user = await getById(jwt_payload._id);
			if (user) return done(null, user);

			return done(null, false, { message: 'Invalid user.' });
		} catch (e) {
			console.log(e);
		}
	}),
);

passportAdminGuard.use(
	new JwtStrategy(options, async (jwt_payload, done) => {
		try {
			const user = await getById(jwt_payload._id);
			if (jwt_payload.isAdmin) return done(null, user);

			return done(null, false, { message: 'Invalid user.' });
		} catch (e) {
			console.log(e);
		}
	}),
);

export default passportGuard;
