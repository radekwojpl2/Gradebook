export default function submitAnnouncementForm() {

    const type: string = (<HTMLSelectElement>document.querySelector('.teacherForm__select')).value
    const name: string = (<HTMLInputElement>document.querySelector('.teacherForm__inputName')).value
    const title: string = (<HTMLInputElement>document.querySelector('.teacherForm__inputTitle')).value
    const message: string = (<HTMLInputElement>document.querySelector('.teacherForm__message')).value
    const timestamp: number = Date.now().valueOf()
    if (type === 'exam') {
        const date: string = (<HTMLInputElement>document.querySelector('.teacherForm__inputDate')).value
        return {
            type,
            name,
            title,
            message,
            date,
            timestamp
        }
    } else {
        return {
            type,
            name,
            title,
            message,
            timestamp
        }
    }
   
}