import {Announcement} from '../assets/ts/announcementsStudent/Announcement'

describe('Test for Announcement class', () => {
    const annN = new Announcement("Title", "Message", 1232324424, "normal", "name")
    const annE = new Announcement("Title", "Message", 1232324424, "exam", "name")
    const annI = new Announcement("Title", "Message", 1232324424, "important", "name")
    const annMistake = new Announcement("Title", "Message", 1232324424, "mistake", "name")

    test('annN should return importance 1', () => {
        expect(annN.getImportance()).toBe(1)
    })

    test('annE should return importance 2', () => {
        expect(annE.getImportance()).toBe(2)
    })

    test('annI should return importance 3', () => {
        expect(annI.getImportance()).toBe(3)
    })

    test('annMistake should throw Error', () => {
        expect(annMistake.getImportance()).toThrow(Error)
    })
})