/// <reference types="cypress" />
describe('Tickets', () => {

	beforeEach(() => {
		cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html")
	})

	it('fills all the text input fields', () => {
		const firstName = "Jeferson"
		const lastName = "Duarte Souza Moreira"
		cy.get('#first-name').type(firstName)
		cy.get('#last-name').type(lastName)
		cy.get('#email').type("jdwather@gmail.com")
		cy.get('#requests').type("Quero café")
		cy.get('#signature').type(`${firstName} ${lastName}`)
	})
	it('select two tickets', () => {
		cy.get('#ticket-quantity').select('2')
	})
	it('select vip ticket type', () => {
		cy.get('#vip').check()
	})
	it('select social media checkbox', () => {
		cy.get('#social-media').check()
	})
	it('select friend, and publication, then unckeck friend', () => {
		cy.get('#friend').check()
		cy.get('#publication').check()
		cy.get('#friend').uncheck()
	})
	it('has TicketBox header heading', () => {
		cy.get('header h1').should('contain', 'TICKETBOX')
	})
	it('alerts on invalid email', () => {
		cy.get('#email')
			.as('email')
			.type('mail-invalido-gmail.com')

		cy.get('#email.invalid')
			.as('invalidEmail')
			.should('exist')

		//para uilizar alias tem que colocar @ na frente
		cy.get('@email')
			.clear()
			.type('mail-valido@gmail.com')

		cy.get('#email.invalid').should('not.exist')
	});

	it('fills and reset the form', () => {
		const firstName = "Jeferson"
		const lastName = "Duarte Souza Moreira"
		const fullName = `${firstName} ${lastName}`

		cy.get('#first-name').type(firstName)
		cy.get('#last-name').type(lastName)
		cy.get('#email').type("jdwather@gmail.com")
		cy.get('#ticket-quantity').select('2')
		cy.get('#vip').check()
		cy.get('#friend').check()
		cy.get('#requests').type("Quero café")		

		cy.get('.agreement p').should('contain', `I, ${fullName}, wish to buy 2 VIP tickets`)

		cy.get('#agree').click()
		cy.get('#signature').type(fullName)	
		
		cy.get('button[type="submit"]')
			.as('submitButton')
			.should('not.be.disabled')

		cy.get('button[type="reset"]').click()

		cy.get('button[type="submit"]').should('be.disabled')

	});

	it('fills mandatory fields using support command', () => {
		const customer = {
			firstName: "Fábio",
			lastName: "Moreira",
			email: "fabiomoreira@example.com"
		}

		cy.fillMandatoryFields(customer);

		cy.get('button[type="submit"]')
			.as('submitButton')
			.should('not.be.disabled')

		cy.get('button[type="reset"]').click()

		cy.get('button[type="submit"]').should('be.disabled')
	});
})