const generetedId = require('../../src/utils/generateUUID');

// Se é possível gerar um ID único
// Se está vindo uma ID
// Se a Id é uma String
// Se o tamanho da String é o esperado (36 caracteres)

describe("generateUUID", () =>{
    it("Se é possível gerar um ID único", () =>{
        const id = generetedId();

        expect(id).toBeDefined();
        expect(typeof id).toBe("string");
        expect(id).toHaveLength(36);
    })
})
