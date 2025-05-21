// Перевірки для запиту Is Valid ISBN13 Number
// 1. Перевірка статусу відповіді
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 2. Content-Type повинен бути XML
pm.test("Content-Type is XML", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("xml");
});

// 3. Відповідь містить назву книги, автора та видавництво
const jsonObj = xml2Json(pm.response.text());
pm.test("Response has Title, Author, Publisher", function () {
    pm.expect(jsonObj).to.be.an('object');
    const book = jsonObj['soap:Envelope']['soap:Body']['m:IsValidISBN13Response'];
    pm.expect(book).to.have.property('m:IsValidISBN13Result');
});

// 4. Перевірка, що немає помилки
pm.test("Response does not contain Fault", function () {
    pm.expect(pm.response.text()).to.not.include("Fault");
});

// 5. Перевірка заголовка Content-Length
pm.test("Content-Length header exists", function () {
    pm.response.to.have.header("Content-Length");
});

// 6. Перевірка, що статус тексту – OK
pm.test("Status text is OK", function () {
    pm.response.to.have.status("OK");
});

// 7. Перевірка часу відповіді
pm.test("Response time is less than 1000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

// 8. Відповідь має XML структуру
pm.test("Response is valid XML", function () {
    try {
        const json = xml2Json(pm.response.text());
        pm.expect(json).to.be.an("object");
    } catch (e) {
        pm.expect.fail("Response is not valid XML: " + e.message);
    }
});

// Перевірки для запиту Is Valid ISBN10 Number
// 1. Статус код 200 навіть для невалідного ISBN
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 2. Content-Type має бути XML
pm.test("Content-Type is XML", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("xml");
});

// 3. Відповідь повинна містити порожній або null Title
pm.test("Response has empty or missing Title", function () {
    const res = pm.response.text();
    pm.expect(res.includes("<Title />") || res.includes("<Title></Title>") || !res.includes("<Title>")).to.be.true;
});

// 4. Автор відсутній
pm.test("Response has no Author", function () {
    const res = pm.response.text();
    pm.expect(res.includes("<Author />") || !res.includes("<Author>")).to.be.true;
});

// 5. Наявність ознаки помилки або порожніх даних
pm.test("Response contains no book data", function () {
    pm.expect(pm.response.text()).to.not.include("<Publisher>");
});

// 6. Відсутність помилки SOAP (Fault)
pm.test("No SOAP Fault", function () {
    pm.expect(pm.response.text()).to.not.include("Fault");
});

// 7. Статус текст відповіді – OK
pm.test("Status text is OK", function () {
    pm.response.to.have.status("OK");
});

// 8. Час відповіді в межах допустимого
pm.test("Response time < 1000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

// 9. Content-Length присутній
pm.test("Content-Length is present", function () {
    pm.response.to.have.header("Content-Length");
});

// 10. Перевірка на XML структуру
pm.test("Response is valid XML", function () {
    try {
        const json = xml2Json(pm.response.text());
        pm.expect(json).to.be.an("object");
    } catch (e) {
        pm.expect.fail("Response is not valid XML: " + e.message);
    }
});
