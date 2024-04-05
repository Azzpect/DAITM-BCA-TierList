const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8800;

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "../website/public")));
cors();

app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../website/index.html"));
})
app.get("/tier-list", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../website/tierlist.html"));
})



app.post("/send-tier", async (req, res) => {
    const { data } = req.body;
    fs.readFile("./student.json", 'utf-8', (err, fdata) => {
        let students = JSON.parse(fdata);
        if(students.includes(data.Name.toLowerCase())) {
            let tierList = JSON.parse(fs.readFileSync("./TierList.json", "utf-8"));
            for(let tier in data.tier) {
                data.tier[tier].forEach(name => {
                    tierList.TierList.forEach(entry => {
                        if(entry.Name == name)
                            entry.Tier[tier] += 1;
                    })
                });
            }
            students.splice(students.indexOf(data.Name.toLowerCase()), 1);
            fs.writeFileSync("./student.json", JSON.stringify(students, null, 4), err=> {
                console.log("Update students list");
            })
            fs.writeFileSync("./TierList.json", JSON.stringify(tierList, null, 4));
            res.status(200).send({status: "success", msg: "Tier Data processed."});
        }
        else
            res.status(403).send({status: "error", msg: "This name is already used to send data."})
    })
})

app.post("/get-tierlist", async (req, res) => {
    const tierList = JSON.parse(fs.readFileSync("./TierList.json", "utf-8"));
    let list = {};
    tierList.TierList.forEach(teacher => {
        let tier = null;
        let maxValue = Number.MIN_VALUE;
        for (let key in teacher.Tier) {
            if (teacher.Tier[key] > maxValue) {
                maxValue = teacher.Tier[key];
                tier = key;
            }
        }
        list[teacher.Name] = tier;
    })
    res.status(200).send(list);
})

app.listen(PORT, () => {
    console.log("Server is runnin on http://127.0.0.1:"+PORT);
})