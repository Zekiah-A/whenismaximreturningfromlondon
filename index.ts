import express from "express";

const app = express();
const PORT = 42069;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	const countdownTarget = new Date("2025-04-28T15:44:00+01:00");
	const now = new Date();
	const diff = countdownTarget.getTime() - now.getTime();
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((diff / (1000 * 60)) % 60);
	const countdown = `${days}d, ${hours}h, ${minutes}m`;
	let status = `${days > 1 ? days + " days" : days + " day"}, ${hours > 1 ? hours + " hours" : hours + " hour"
		}, and ${minutes > 1 ? minutes + " minutes" : " minute"} left until Maxim returns from London!`;
	if (diff <= 0) {
		status = "He has returned 🎉";
	}

	const siteUrl = req.protocol + '://' + req.get("host");
	res.render("index", {
		status: status,
		countdown: countdown,
		url: siteUrl
	});
});

app.listen(PORT, () => {
	console.log(`Whenismaximreturningfrom.london listening on port ${PORT}`)
});
