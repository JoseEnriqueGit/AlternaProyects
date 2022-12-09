"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const users = [
    { id: 1, name: "Lucas" },
    { id: 2, name: "Marcos" },
    { id: 3, name: "Juan" },
];
app.get("/", function (req, res) {
    res.json(users);
});
// Motrar todos lo usuarios
app.get("/allusers", function (req, res) {
    res.json(users);
});
// Motrar unico usuario
app.get("/user/:id", function (req, res) {
    const { id } = req.params;
    if (users.find((user) => user.id == parseInt(id))) {
        res.json(users.find((user) => user.id == parseInt(id)));
    }
    else {
        res.status(404).send("Cliente no encotrado");
    }
});
// Anadir usuario
app.post("/adduser", function (req, res) {
    const { id, name } = req.body;
    if (name.trim() == "") {
        res.status(400).send("Nombre vacio");
    }
    else {
        if (users.find((user) => user.name == name)) {
            res.send("Este nombre ya esta en uso");
        }
        else if (users.find((user) => user.id == parseInt(id))) {
            res.send("Este id ya esta en uso");
        }
        else {
            users.push({ id, name });
            res.json(users);
        }
    }
});
app.put("/putuser/:id", function (req, res) {
    const { id } = req.params;
    const { name } = req.body;
    if (users.find((user) => user.id == parseInt(id))) {
        let index = users.findIndex((user) => user.id == parseInt(id));
        users[index].name = name;
        res.json(users);
    }
    else {
        res.status(404).send("Cliente no encotrado");
    }
});
app.delete("/deleteuser/:id", function (req, res) {
    const { id } = req.params;
    if (users.find((user) => user.id == parseInt(id))) {
        let index = users.findIndex((user) => user.id == parseInt(id));
        users.splice(index, 1);
        res.json(users);
    }
    else {
        res.status(404).send("Cliente no encotrado");
    }
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server runnig in port ${port}`);
});
//# sourceMappingURL=index.js.map