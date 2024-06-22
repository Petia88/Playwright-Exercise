const { test, expect } = require("playwright/test");

//Navigation bar for guest users
test('Verify "All Books" link is visible', async ({ page }) =>{
   //arrange
    await page.goto('http://localhost:3000');
    await page.waitForSelector("nav.navbar");

    //act
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    //assert
    expect(isLinkVisible).toBe(true);
});

test('Verify "Login" button is visible', async ({ page }) =>{
    //arrange
     await page.goto('http://localhost:3000');
     await page.waitForSelector("nav.navbar");
 
     //act
     const loginButton = await page.$('a[href="/login"]');
     const isLoginButtonVisible = await loginButton.isVisible();
 
     //assert
     expect(isLoginButtonVisible).toBe(true);
 });

 test('Verify "Register" button is visible', async ({ page }) =>{
    //arrange
     await page.goto('http://localhost:3000');
     await page.waitForSelector("nav.navbar");
 
     //act
     const registerButton = await page.$('a[href="/register"]');
     const isRegisterButtonVisible = await registerButton.isVisible();
 
     //assert
     expect(isRegisterButtonVisible).toBe(true);
 });

 //Navigation bar for Logged-In users

 test('Verify "All Books" link is visible after user login', async ({ page }) =>{
    //arrange
    await page.goto('http:localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    
    //act
    await page.click('input[type="submit"]');
    const allBookslink = await page.$('a[href="/catalog"]');
    const isAllBooksLinkVisible = await allBookslink.isVisible();

    //assert
    expect(isAllBooksLinkVisible).toBe(true);
 });

 test('Verify "My Books" button is visible after user login', async ({ page }) =>{
    //arrange
    await page.goto('http:localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    
    //act
    await page.click('input[type="submit"]');
    const myBooksButton = await page.$('a[href="/profile"]');
    const isMyBooksButtonVisible = await myBooksButton.isVisible();

    //assert
    expect(isMyBooksButtonVisible).toBe(true);
 });

 test('Verify "Add Book" button is visible after user login', async ({ page }) =>{
    //arrange
    await page.goto('http:localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    
    //act
    await page.click('input[type="submit"]');
    const addBookButton = await page.$('a[href="/create"]');
    const isAddBookButtonVisible = await addBookButton.isVisible();

    //assert
    expect(isAddBookButtonVisible).toBe(true);
 });

 test('Verify User`email is visible after user login', async ({ page }) =>{
    //arrange
    await page.goto('http:localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    
    //act
    await page.click('input[type="submit"]');
    const welcomeMessage = await page.locator('//span[text()="Welcome, peter@abv.bg"]');
    const isWelcomeMessage = await welcomeMessage.isVisible();

    //assert
    expect(isWelcomeMessage).toBe(true);
 });

 //Login Page
 test('Login with valid credentials', async ({ page }) => {
    //arrange
    await page.goto('http:localhost:3000/login');
    
    //act
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');

    //assert
    expect(page.url()).toBe('http://localhost:3000/catalog');
 });

 test('Login with empty input fields', async ({ page }) => {
    //arrange
    await page.goto('http:localhost:3000/login');
    await page.click('input[type="submit"]');

    //act
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/login"]');

    //assert
    expect(page.url()).toBe('http://localhost:3000/login');
 });

 test('Login with empty Email input field', async ({ page }) => {
    //arrange
    await page.goto('http:localhost:3000/login');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    //act
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/login"]');

    //assert
    expect(page.url()).toBe('http://localhost:3000/login');
 });

 test('Login with empty Password input field', async ({ page }) => {
    //arrange
    await page.goto('http:localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.click('input[type="submit"]');

    //act
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/login"]');

    //assert
    expect(page.url()).toBe('http://localhost:3000/login');
 });

 //Register
 test('Register with valid credentials', async ({ page }) => {
    //arrange
    await page.goto('http:localhost:3000/register');
    
    //act
    await page.fill('input[name="email"]', 'petya@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');

    //assert
    expect(page.url()).toBe('http://localhost:3000/register');
 });

 test('Register with empty input fields', async ({ page }) => {
    //arrange
    await page.goto('http:localhost:3000/register');
    
    //act
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/register"]');

    //assert
    expect(page.url()).toBe('http://localhost:3000/register');
 });

 test('Register with empty Email input field', async ({ page }) => {
    //arrange
    await page.goto('http:localhost:3000/register');
    
    //act
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/register"]');

    //assert
    expect(page.url()).toBe('http://localhost:3000/register');
 });

 test('Register with empty Password input field', async ({ page }) => {
    //arrange
    await page.goto('http:localhost:3000/register');
    
    //act
    await page.fill('input[name="email"]', 'petya@abv.bg');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/register"]');

    //assert
    expect(page.url()).toBe('http://localhost:3000/register');
 });

 test('Register with empty Confirm Password input field', async ({ page }) => {
    //arrange
    await page.goto('http:localhost:3000/register');
    
    //act
    await page.fill('input[name="email"]', 'petya@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/register"]');

    //assert
    expect(page.url()).toBe('http://localhost:3000/register');
 });

 test('Register with non matching password and repeat password', async ({ page }) => {
    //arrange
    await page.goto('http:localhost:3000/register');
    
    //act
    await page.fill('input[name="email"]', 'petya@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '666666');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/register"]');

    //assert
    expect(page.url()).toBe('http://localhost:3000/register');
 });

 //"Add Book" Page
 test('Add book with correct data', async ({ page }) => {
    //arrange
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    //act
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'Test description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    await page.waitForURL('http://localhost:3000/catalog');

    //assert
    expect(page.url()).toBe('http://localhost:3000/catalog');

 });

 test('Add book with empty input fields', async ({ page }) => {
    //arrange
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    //act
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', '');
    await page.fill('#description', '');
    await page.fill('#image', '');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    //assert
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="create"]');
    expect(page.url()).toBe('http://localhost:3000/create');

 });

 test('Add book with empty title input field', async ({ page }) => {
    //arrange
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    //act
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', '');
    await page.fill('#description', 'Test description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    //assert
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="create"]');
    expect(page.url()).toBe('http://localhost:3000/create');

 });

 test('Add book with empty description input field', async ({ page }) => {
    //arrange
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    //act
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test title');
    await page.fill('#description', '');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    //assert
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="create"]');
    expect(page.url()).toBe('http://localhost:3000/create');

 });

 test('Add book with empty image input field', async ({ page }) => {
    //arrange
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    //act
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test title');
    await page.fill('#description', 'Test description');
    await page.fill('#image', '');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    //assert
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="create"]');
    expect(page.url()).toBe('http://localhost:3000/create');

 });

 //"All Books" Page
 test('Login and verify all books are displayed', async ({ page }) => {
    //arrange
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    //act
    await page.waitForSelector('.dashboard');

    //assert
    const books = await page.$$('.other-books-list li');
    expect(books.length).toBeGreaterThan(0);
 });


 //"Details" Page
 test('Login and navigate to Details page', async ({ page }) => {
     //arrange
     await page.goto('http://localhost:3000/login');
     await page.fill('input[name="email"]', 'peter@abv.bg');
     await page.fill('input[name="password"]', '123456');
     await Promise.all([
         page.click('input[type="submit"]'),
         page.waitForURL('http://localhost:3000/catalog')
     ]);

     //act
     await page.click('.otherBooks a.button');
     await page.waitForSelector('.book-information');

     //assert
     const detailsPageTitle = await page.textContent('.book-information h3');
     expect(detailsPageTitle).toBe('Test Book');
 });

 //Logout Functionality

//  test.only('Logout button is visible', async ({ page }) => {
//     //arrange
//     await page.goto('http://localhost:3000/login');
//     await page.fill('input[name="email"]', 'peter@abv.bg');
//     await page.fill('input[name="password"]', '123456');
//     await page.click('input[type="submit"]');
    

//     //act
//     const logoutButton = page.waitForSelector('a[href="javascript:void(0)"]');

//     //assert
//     expect(logoutButton).isVisible();
//  });

test('Verify redirection of Logout link after user login', async ({ page }) => {
    //arrange
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    
    //act
    const logoutLink = await page.$('a[href="javascript:void(0)"]');
    await logoutLink.click();

    //assert
    const redirectedURL = page.url();
    expect(redirectedURL).toBe('http://localhost:3000/catalog');
})



