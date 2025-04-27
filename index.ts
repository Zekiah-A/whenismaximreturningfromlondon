import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { pluralSuffix, TARGET_DATE_STR } from "./shared.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 42069;

app.set("view engine", "ejs");
app.set("trust proxy", true);
app.use(express.static(path.join(__dirname, "public")));

function makeCountdown(diff:number) {
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((diff / (1000 * 60)) % 60);
	const countdown = `${days}d, ${hours}h, ${minutes}m`;
	return countdown;
}

function makeStatus(diff:number) {
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((diff / (1000 * 60)) % 60);
	const seconds = Math.floor((diff / 1000) % 60);

	let status = "";
	if (days > 0) {
		status += `${days} ${pluralSuffix("day", days)}, `;
	}
	if (hours > 0) {
		status += `${hours} ${pluralSuffix("hour", hours)}, `;
	}
	if (minutes > 0) {
		status += `${minutes} ${pluralSuffix("minute", minutes)}`;
	}
	return status;
}

app.get("/shared.js", (req, res) => {
	res.sendFile(path.join(__dirname, "shared.js"));
});

app.get("/", (req, res) => {
	const countdownTarget = new Date(TARGET_DATE_STR);
	const now = new Date();
	const diff = countdownTarget.getTime() - now.getTime();
	let status = makeStatus(diff);
	let countdown = makeCountdown(diff);
	if (diff <= 0) {
		status = "He has returned 🎉";
		countdown = "Maxim's back!"
	}

	const siteUrl = `${req.protocol}://${req.get('host')}`;
	res.render("index", {
		status: status,
		countdown: countdown,
		url: siteUrl
	});
});

app.listen(PORT, () => {
	console.log(`Whenismaximreturningfrom.london listening on port ${PORT}`)
});
