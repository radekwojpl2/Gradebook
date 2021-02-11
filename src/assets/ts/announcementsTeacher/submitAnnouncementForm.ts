export default function submitAnnouncementForm() {

    const type = (<HTMLInputElement>document.querySelector('.teacherForm__select')).value
    const name = (<HTMLInputElement>document.querySelector('.teacherForm__inputName')).value
    const title = (<HTMLInputElement>document.querySelector('.teacherForm__inputTitle')).value
    const message = (<HTMLInputElement>document.querySelector('.teacherForm__message')).value
    if (type === 'exam') {
        const date = (<HTMLInputElement>document.querySelector('.teacherForm__inputDate')).value
        return {
            type,
            name,
            title,
            message,
            date
        }
    } else {
        return {
            type,
            name,
            title,
            message
        }
    }
   
}