import * as mocha from 'mocha';
import * as chai from 'chai';
import * as internal from './internal';
import { expect } from 'chai';


describe('API', () => {
    // User testing
    describe('User', () => {
        describe('create', () => {
            it('should create and save new user', async () => {
                let userA = await internal.createUser('userA', 'pass');
                expect(userA).to.have.property('username').not.undefined;
                expect(userA).to.have.property('playerID').not.undefined;
                expect(userA).to.have.property('password').not.undefined;
                expect(userA).to.have.property('salt').not.undefined;
            })
        })
        describe('get', () => {
            it('should get created user', async () => {
                let userA = await internal.getUser('userA');
                expect(userA).not.undefined;
            })
        })
        describe('update', () => {
            it('should update created user and save', async () => {
                let userA = await internal.getUser('userA');

                describe('update username', async () => {
                    let results = await internal.updateUser('userA', {username: 'userA2'});
                    expect(userA).to.have.property('username').equal('userA2');
    
                    expect(results[0]).to.equal(internal.constantStrings.USERNAME_MODIFIED);
                })

                describe('update username and password', async () => {
                    if (userA) {
                        let userAOldPass = userA?.password;

                        let results = await internal.updateUser('userA2', {username: 'userA', password: 'pass2'});
                        expect(userA).to.have.property('username').equal('userA');
                        expect(userA).to.have.property('password').not.equal(userAOldPass);
        
                        expect(results[0]).to.equal(internal.constantStrings.USERNAME_MODIFIED);
                        expect(results[1]).to.equal(internal.constantStrings.PASSWORD_MODIFIED);
                    }                        
                })
                
                describe('update username, password, and playername', async () => {
                    if (userA) {
                        let userAOldPass = userA.password;

                        let results = await internal.updateUser('userA2', {username: 'userA', password: 'pass3', playername: 'special'});
                        expect(userA).to.have.property('username').equal('userA');
                        expect(userA).to.have.property('password').not.equal(userAOldPass);
                        
                        let player = await internal.getPlayer(userA.playerID);
                        expect(player).to.have.property('username').equal('special');
                        
                        expect(results[0]).to.equal(internal.constantStrings.USERNAME_MODIFIED);
                        expect(results[1]).to.equal(internal.constantStrings.PASSWORD_MODIFIED);
                        expect(results[2]).to.equal(internal.constantStrings.PLAYERNAME_MODIFIED);
                    }                        
                })

                describe('update username and playername', async () => {
                    if (userA) {
                        let results = await internal.updateUser('userA2', {username: 'userA', playername: 'notSpecial'});
                        expect(userA).to.have.property('username').equal('userA');
                        
                        let player = await internal.getPlayer(userA.playerID);
                        expect(player).to.have.property('username').equal('notSpecial');
                        
                        expect(results[0]).to.equal(internal.constantStrings.USERNAME_MODIFIED);
                        expect(results[1]).to.equal(internal.constantStrings.PLAYERNAME_MODIFIED);
                    }
                })

                describe('update password', async () => {
                    if (userA) {
                        let userAOldPass = userA.password;

                        let results = await internal.updateUser('userA', {password: 'pass'});
                        expect(userA).to.have.property('username').not.equal(userAOldPass);
        
                        expect(results[0]).to.equal(internal.constantStrings.PASSWORD_MODIFIED);
                    }                    
                })

                describe('update playername', async () => {
                    if (userA) {
                        let results = await internal.updateUser('userA', {playername: 'userA'});
                    
                        let player = await internal.getPlayer(userA.playerID);
                        expect(player).to.have.property('username').equal('userA');
    
                        expect(results[0]).to.equal(internal.constantStrings.USERNAME_MODIFIED);
                    }                    
                })
            })
        })
        describe('checkPassword', () => {
            it('should verify created user password', async () => {
                let result = await internal.checkPassword('userA', 'pass');
                expect(result).to.equal(true);
            })
        })
        describe('delete', () => {
            it('should delete created user and save', async () => {
                let userA = await internal.getUser('userA');
                let result = await internal.deleteUser('userA');
                expect(result).to.equal(true);
            })
        })
    })
    // Player testing
    // GameData testing
    // Lobby testing
})