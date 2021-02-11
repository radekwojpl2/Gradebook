import submitForm from './announcementsTeacher/submitForm'
import createAnnouncementForm from './announcementsTeacher/teacherForm'
import submitAnnouncementForm from './announcementsTeacher/submitForm'
import axios from 'axios'
import instance from '../../axios'

const teacherFormDiv = document.querySelector('.teacherFormContainer')
const form = createAnnouncementForm()

teacherFormDiv?.appendChild(form)

form?.addEventListener('submit',submitAnnouncementForm)
const user = {
    yo: 'yo yo'
}

function firebasePostAnnouncements() {
    instance.post('announcements.json', user)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

firebasePostAnnouncements()