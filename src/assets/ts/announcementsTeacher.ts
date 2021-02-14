import createAnnouncementForm from './announcementsTeacher/teacherForm'
import submitAnnouncementForm from './announcementsTeacher/submitAnnouncementForm'
import instance from '../../axios'
import '../css/announcementsTeacher.css'
const teacherFormDiv = document.querySelector('.teacherFormContainer')
const form = createAnnouncementForm()
teacherFormDiv?.appendChild(form)
form?.addEventListener('submit',function(event) {
    event.preventDefault()
    const data = submitAnnouncementForm()
    //console.log(data)
    
    instance.post('announcements.json', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    
})
