describe('POST PUT and DELETE a post API Test Suite', () => {
    let postId = 1;

    const newPost = {
        title: 'Test Title',
        body: 'This is a test post body',
        userId: 1
    };

    const updatedPost = {
        title: 'Update Test Title',
        body: 'Update This is a test post body',
        userId: 1,
        id: postId
    };  

    it("Should create a new post", () => {
        cy.api("POST", "https://jsonplaceholder.typicode.com/posts", newPost).should((response) => {
            expect(response.status).to.eq(201);
            //postId = response.body.id; //demo page only fakes adding it on server so this wont work
            expect(response.duration).to.be.below(500);
            expect(response.body.userId).to.be.a("number");
            expect(response.body.id).to.be.a("number");
            expect(response.body.title).to.be.a("string");
            expect(response.body.body).to.be.a("string");
            expect(response.body.userId).to.eq(newPost.userId);
            expect(response.body.title).to.eq(newPost.title);
            expect(response.body.body).to.eq(newPost.body);
        });
    });

    it("Should check if the post was created", () => {
        cy.api({
            method: 'GET',
            url: `https://jsonplaceholder.typicode.com/posts/${postId}`
        }).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.below(500);
        });
    });

    it("Should update an existing post", () => {
        cy.api({
            method: 'PUT',
            url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
            body: updatedPost
        }).should((response) => {
            expect(response.status).to.be.oneOf([200,204]);
            expect(response.duration).to.be.below(500);
            expect(response.body.userId).to.be.a("number");
            expect(response.body.id).to.be.a("number");
            expect(response.body.title).to.be.a("string");
            expect(response.body.body).to.be.a("string");
            expect(response.body.userId).to.eq(updatedPost.userId);
            expect(response.body.title).to.eq(updatedPost.title);
            expect(response.body.body).to.eq(updatedPost.body);
        });
    });

    it("Should delete existing post", () => {
        cy.api("DELETE", ("https://jsonplaceholder.typicode.com/posts/" + postId)).should((response) => {
            expect(response.status).to.be.oneOf([200,204]);
            expect(response.duration).to.be.below(500);
        });
    });

    it("Should check if the post was deleted", () => {
        cy.api({
            method: 'GET',
            url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
            failOnStatusCode: false
        }).should((response) => {
            //expect(response.status).to.eq(404); //demo page only fakes deleting it on server so this wont work
            expect(response.duration).to.be.below(500);
        });
    });

});