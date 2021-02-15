import submitAnnouncementForm from '../assets/ts/announcementsTeacher/submitAnnouncementForm'
import createAnnouncementForm from '../assets/ts/announcementsTeacher/teacherForm'

describe('testing submitting announcement', () => {
    document.body.innerHTML=('<select class="teacherForm__select"><option value="important"></option></select>')
    document.body.innerHTML+=('<input class="teacherForm__inputName" value="dziekan">dziekan</input>')
    document.body.innerHTML+=('<input class="teacherForm__inputTitle" value="piwo">piwo</input>')
    document.body.innerHTML+=('<textarea class="teacherForm__message">jesteśmy pierwsi w polsce bla bla, o patrzcie kolejny ranking, w którym jesteśmy pierwsi</textarea>')
    const obj = submitAnnouncementForm()
    it('it should return important announcement from dziekan', () => {
        expect(obj).toStrictEqual({
            type: 'important',
            name: 'dziekan',
            title: 'piwo',
            message: 'jesteśmy pierwsi w polsce bla bla, o patrzcie kolejny ranking, w którym jesteśmy pierwsi',
            timestamp: obj.timestamp
        })
    })
    document.body.innerHTML=('<select class="teacherForm__select"><option value="normal"></option></select>')
    document.body.innerHTML+=('<input class="teacherForm__inputName" value="someone"></input>')
    document.body.innerHTML+=('<input class="teacherForm__inputTitle" value="something"></input>')
    document.body.innerHTML+=('<textarea class="teacherForm__message">naprawdę zaczynam powątpiewać w to, czy testowanie takiej funkcji za pomocą jesta, ma sens</textarea>')
    const obj1 = submitAnnouncementForm()
    it('it should return normal announcement from someone', () => {
        expect(obj1).toStrictEqual({
            type: 'normal',
            name: 'someone',
            title: 'something',
            message: 'naprawdę zaczynam powątpiewać w to, czy testowanie takiej funkcji za pomocą jesta, ma sens',
            timestamp: obj1.timestamp
        })
    })
    document.body.innerHTML=('<select class="teacherForm__select"><option value="exam"></option></select>')
    document.body.innerHTML+=('<input class="teacherForm__inputName" value="Ph.D"></input>')
    document.body.innerHTML+=('<input class="teacherForm__inputTitle" value="IAI test"></input>')
    document.body.innerHTML+=('<textarea class="teacherForm__message">This is a special address at the server that is normally used for Ph.D.and Master defenses and not for regular classes. It can be configured to give me some special rights, e.g., to see your screen at any moment in asmall window. During the test, you need to have your micro on, but please put the loudspeakers off so that not to be disturbed by the sound fromalmost 80 people (the only person who can stand it tomorrow is me). Pleasetry to remain silent at all times during the test, as it would normally be at the university.</textarea>')
    document.body.innerHTML +=('<input class="teacherForm__inputDate" value="22-12-2020"></input>')
    const obj2 = submitAnnouncementForm()
    it('it should return exam from Ph.D', () => {
        expect(obj2).toStrictEqual({
            type: 'exam',
            name: "Ph.D",
            title: 'IAI test',
            message: 'This is a special address at the server that is normally used for Ph.D.and Master defenses and not for regular classes. It can be configured to give me some special rights, e.g., to see your screen at any moment in asmall window. During the test, you need to have your micro on, but please put the loudspeakers off so that not to be disturbed by the sound fromalmost 80 people (the only person who can stand it tomorrow is me). Pleasetry to remain silent at all times during the test, as it would normally be at the university.',
            timestamp: obj2.timestamp,
            date: "22-12-2020"
        })
    })
})

describe('testing creating announcementForm', () => {
    it('it should create default announcement form', () => {
        let form1 = createAnnouncementForm() as HTMLFormElement
        expect(form1.tagName.toLowerCase()).toEqual(`form`)
    })
})