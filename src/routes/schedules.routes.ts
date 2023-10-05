import { Router } from "express"
import { db } from "../services/firebase"

export const schedulesRouter = Router()

schedulesRouter.get("/", async (req, res) => {
	const schedulesRef = await db.collection("schedules").get()
	const schedules = schedulesRef.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}))

	res.render("home", { schedules })
})

schedulesRouter.get("/create", (req, res) => {
	res.render("create")
})

schedulesRouter.post("/create", async (req, res) => {
	const { name, phone, phoneType, contactDate, observations } = req.body

	await db.collection("schedules").add({
		name,
		phone,
		phoneType,
		contactDate,
		observations,
	})

	res.redirect("/")
})

schedulesRouter.get("/delete/:id", async (req, res) => {
	const { id } = req.params

	await db.collection("schedules").doc(id).delete()

	res.redirect("/")
})

schedulesRouter.get("/update/:id", async (req, res) => {
	const { id } = req.params

	const scheduleRef = await db.collection("schedules").doc(id).get()
	const schedule = {
		id: scheduleRef.id,
		...scheduleRef.data(),
	}

	res.render("update", schedule)
})

schedulesRouter.post("/update/:id", async (req, res) => {
	const { id } = req.params
	const { name, phone, phoneType, contactDate, observations } = req.body

	await db.collection("schedules").doc(id).update({
		name,
		phone,
		phoneType,
		contactDate,
		observations,
	})

	res.redirect("/")
})
