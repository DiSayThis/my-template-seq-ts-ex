// const db = require("../models/index");
// const { Op } = require("sequelize");

const defaultDataBaseExec = async () => {
	// const financingSources = [
	//   { code: "ГПВ", name: "Государаственная программа вооружения", includeGPV: true, defaultChoiceFlag: true, order: 1 },
	//   { code: "ФЦП", name: "Федеральная целевая программа", order: 2 },
	//   { code: "Вне ГПВ", name: "Вне ГПВ", order: 3 },
	// ];
	// for (let finSource of financingSources) {
	//   const existFinSource = await db.FinancingSource.findOne({ where: { code: finSource.code } });
	//   if (!existFinSource) {
	//     await db.FinancingSource.create(finSource);
	//   } else {
	//     await existFinSource.update(finSource);
	//   }
	// }
};

export default defaultDataBaseExec;
