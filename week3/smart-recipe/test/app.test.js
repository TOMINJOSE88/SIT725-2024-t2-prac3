import { expect } from 'chai';
import { JSDOM } from 'jsdom';

describe('CookSmart UI Tests', function() {
    let dom;
    let document;

    beforeEach(async function() {
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <body>
                <div id="signInModal" style="display: none;"></div>
                <div id="signUpModal" style="display: none;"></div>
                <button class="sign-in-button"></button>
                <button class="sign-up-button"></button>
                <span class="close-button"></span>
                <div id="user-info-container" style="display: none;">
                    <span id="display-username"></span>
                    <button id="logout-button"></button>
                </div>
                <form id="signInForm"></form>
                <form id="signUpForm"></form>
            </body>
            </html>
        `);
        document = dom.window.document;
        global.window = dom.window;
        global.document = document;

        // Import your app.js script dynamically
        await import('../public/app.js');
    });

    it('should display the sign-in modal when the sign-in button is clicked', function() {
        const signInButton = document.querySelector('.sign-in-button');
        signInButton.click();
        const signInModal = document.getElementById('signInModal');
        console.log('Test - Sign In modal display:', signInModal.style.display); // Debugging log
        expect(signInModal.style.display).to.equal('block');
    });

    it('should close the modals when the close button is clicked', function() {
        const closeButtons = document.getElementsByClassName('close-button');
        closeButtons[0].click();
        const signInModal = document.getElementById('signInModal');
        const signUpModal = document.getElementById('signUpModal');
        console.log('Test - Sign In modal display after close:', signInModal.style.display); // Debugging log
        console.log('Test - Sign Up modal display after close:', signUpModal.style.display); // Debugging log
        expect(signInModal.style.display).to.equal('none');
        expect(signUpModal.style.display).to.equal('none');
    });
});
