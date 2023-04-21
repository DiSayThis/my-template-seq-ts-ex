// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const config = require("config");
// const db = require("../models/index");

// const options = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: config.get("jwt"),
// };

// module.exports = (passport) => {
//   // console.log(options.jwtFromRequest);
//   passport.use(
//     new JwtStrategy(options, async (payload, done) => {
//       try {
//         let array = [];
//         const query = await db.User.findByPk(payload.userId, {
//           attributes: ["id", "login"],
//           include: [
//             {
//               model: db.Role,
//               as: "UserRole",
//               include: { model: db.ProgModule, as: "RoleModule" },
//             },
//           ],
//         });
//         // console.log("================================data:", query);
//         if (query) {
//           for (role of query.UserRole) {
//             for (mod of role.RoleModule) {
//               array.push({
//                 title: mod.title,
//                 userAccess: {
//                   read: mod.RoleToModule.readFlag,
//                   write: mod.RoleToModule.writeFlag,
//                   update: mod.RoleToModule.updateFlag,
//                   delete: mod.RoleToModule.deleteFlag,
//                   export: mod.RoleToModule.exportFlag,
//                 },
//               });
//             }
//           }
//           const user = {
//             id: query.id,
//             login: query.login,
//             modules: array,
//           };
//           if (user) return done(null, user);
//         }
//         return done(null, false);
//       } catch (e) {
//         console.log(e);
//       }
//     }),
//   );
// };
