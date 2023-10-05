import bodyParser from "body-parser"
import express from "express"
import { engine as handlebars } from "express-handlebars"
import { schedulesRouter } from "./routes/schedules.routes"

export const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + "/styles"))

app.engine("hbs", handlebars({ extname: "hbs" }))
app.set("view engine", "hbs")
app.set("views", __dirname + "/views")

app.use(schedulesRouter)
