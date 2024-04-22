const PostThread = require('../PostThread')

describe('a PostThread entitites', () => {
    it('should threw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            title: 'string title',
            body: 'string body',
            // Missin owner property
        };

        // Action and Assert
        expect(() => new PostThread(payload).toThrowError('POST_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'))
    })
    it('should throw error when payload properties are not of expected type', () => {
        // Arrange
        const payload = {
            title: 123, // Incorrect type
            body: 'string body',
            owner: 'string owner',
        };

        // Action and Assert
        expect(() => new PostThread(payload)).toThrowError('POST_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });
    
    it('should create PostThread object correctly', () => {
        // Arrange
        const payload = {
            title: 'string title',
            body: 'string body',
            owner: 'string owner',
        };

        // Action
        const {title, body, owner} = new PostThread(payload);

        // Assert
        expect(title).toEqual(payload.title);
        expect(body).toEqual(payload.body);
        expect(owner).toEqual(payload.owner);
    });
})