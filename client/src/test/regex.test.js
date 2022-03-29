const regExp = {
    regExpDni : "11857708N",
    regExpName : "Boris",
    regExpEmail : "hola@gmail.com",
    regExpPass : "123465y+",
    regExpCp : "28006",
    regExpDir : "Calle falsa 123"
}
    const objExpReg = () => regExp;

    describe('Matchers Strings', () => {
        const exp = objExpReg();
        test('Comprobamos si el nombre es válido (sin cifras, pej)', () => {
            // NAME
            expect(exp.regExpName).toMatch(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]+$/u);
        });
        test('Comprobamos si el formato del mail es válido', () => {
            expect(exp.regExpEmail).toMatch(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/); // MAIL
        });
        test('Comprobamos si la dirección es correcta', () => {
            expect(exp.regExpDir).toMatch(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\d ]+$/u); // MAIL
        });
        test('Comprobamos si la respuesta tiene 5 cifras', () => {
            expect(exp.regExpCp).toMatch(/^\d{5}$/); //CP
        });
        test('Comprobamos si la respuesta tiene la longitud y el tipo de caracteres requeridos', () => {
            expect(exp.regExpPass).toMatch(/^(?=\w*\d)(?=\w*[a-zA-Z])\S{6,10}$/); //PASSWORD
        });
        test('Comprobamos si el dni tiene su formato', () => {
            expect(exp.regExpDni).toMatch(/^[0-9]{8}\-?[a-zA-Z]{1}/); // DNI
        })
    });