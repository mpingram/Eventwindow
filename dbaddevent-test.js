var db = require('/server/database');

db.Events.insert(
	{
		name: "SSA 401",
		organizer: "Tim Hecker",
		timeStart: 1,
		timeEnd: 2,
		useless: "true"
	},
	{
		name: "SSA 402",
		organizer: "Tim Hecker",
		timeStart: 40,
		timeEnd: 2
	},
	{
		name: "SSA 403",
		organizer: "Tim Hecker",
		timeStart: 3,
		timeEnd: 2
	},
	{
		name: "SSA 404",
		organizer: "Tim Hecker",
		timeStart: 29000,
		timeEnd: 2
	}
);

