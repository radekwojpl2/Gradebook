import { Announcement } from '../assets/ts/announcementsStudent/Announcement'
import {AnnouncementsList} from '../assets/ts/announcementsStudent/AnnouncementsList';

describe('Test for AnnouncementsList class', () => {
    const ann1 = new Announcement('ann1', 'ann1 content', 1111111, 'normal', 'jan')
    const ann2 = new Announcement('ann2', 'ann2 content', 1111112, 'exam', 'jan')
    const ann3 = new Announcement('ann3', 'ann3 content', 1111113, 'important', 'jan')

    const list = new AnnouncementsList()

    test('should return array [ann1, ann2, ann3]', () => {
        expect(list.sortByOldest([ann1, ann2, ann3])).toEqual([ann1, ann2, ann3])
    })
    test('should return array [ann3, ann2, ann1]', () => {
        expect(list.sortByNewest([ann1, ann2, ann3])).toEqual([ann3, ann2, ann1])
    })
    test('should return array [ann1, ann2, ann3]', () => {
        expect(list.sortByLeastImportant([ann1, ann2, ann3])).toEqual([ann1, ann2, ann3])
    })
    test('should return array [ann3, ann2, ann1]', () => {
        expect(list.sortByMostImportant([ann1, ann2, ann3])).toEqual([ann3, ann2, ann1])
    })
})