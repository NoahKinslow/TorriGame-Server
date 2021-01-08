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

            })
        })
        describe('checkPassword', () => {
            it('should verify created user password', async () => {
                
            })
        })
        describe('delete', () => {
            it('should delete created user and save', async () => {
                
            })
        })
    })
    // Player testing
    // GameData testing
    // Lobby testing
})