// Subir o servidor no supertest
// Criar variável de ambiente para rodar o teste no bd de teste

const request = require("supertest");
const app = require('../../src/app');
const connection = require("../../src/database");
const {cpf} = require("cpf-cnpj-validator");
const truncate = require("./truncate");

describe("MANAGERS", () =>{
    afterAll(() =>{
        connection.close();
    });

    beforeEach(async (done) =>{
       await truncate(connection.models);
       done();
    })

    it("É possível criar um novo gerente", async () =>{
        const response = await request(app).post("/managers").send({
            name: "Marcos Felipe",
            cpf: cpf.generate(),
            email: "email@email.com",
            cellphone: "5511987654321",
            password: "abc123",
        });

        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("id");
    });

    it("Não é possível cadastrar um gerente com cpf existente", async () =>{
        let cpfGerente = cpf.generate();
        let response = await request(app).post("/managers").send({
            name: "Marcos Felipe",
            cpf: cpfGerente,
            email: "email@email.com",
            cellphone: "5511987654321",
            password: "abc123",
        });

        response = await request(app).post("/managers").send({
            name: "Marie Curie",
            cpf: cpfGerente,
            email: "email123@email.com",
            cellphone: "5511998765432",
            password: "abc123",
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("cpf already exists");
    })
});