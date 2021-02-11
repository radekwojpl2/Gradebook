export default function submitAnnouncementForm(event: { preventDefault: () => void } ) {
    event.preventDefault()

    const type = (<HTMLInputElement>document.querySelector('.teacherForm__select__option')).value
   /* if (type?.nodeValue === "important" || type === "normal" || type === "exam") {

    }*/
    const name = (<HTMLInputElement>document.querySelector('.teacherForm__inputName')).value
    const title = (<HTMLInputElement>document.querySelector('.teacherForm__inputTitle')).value
    const message = (<HTMLInputElement>document.querySelector('.teacherForm__message')).value
    const date = (<HTMLInputElement>document.querySelector('.teacherForm__inputDate')).value

    console.log(type, name, title, message, date)
}