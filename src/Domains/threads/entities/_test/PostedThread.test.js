const PostedThread = require('../PostedThread');

describe('a PostedThread entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            title: 'string title',
            body: 'string body',
            owner: 'string owner',
            // Missing date property
        };

        // Action and Assert
        expect(() => new PostedThread(payload)).toThrowError('POSTED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload properties are not of expected type', () => {
        // Arrange
        const payload = {
            id: '123',
            title: 'string title',
            body: 'string body',
            owner: 'string owner',
            date: new Date(), // Should be in ISO string format
        };

        // Action and Assert
        expect(() => new PostedThread(payload)).toThrowError('POSTED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });
    
    it('should create PostedThread object correctly', () => {
        // Arrange
        const payload = {
            id: '123',
            title: 'string title',
            body: 'string body',
            owner: 'string owner',
            date: new Date().toISOString(), // ISO string format
        };

        // Action
        const { id, title, body, owner, date } = new PostedThread(payload);

        // Assert
        expect(id).toEqual(payload.id);
        expect(title).toEqual(payload.title);
        expect(body).toEqual(payload.body);
        expect(owner).toEqual(payload.owner);
        expect(date).toEqual(payload.date);
    });
});
