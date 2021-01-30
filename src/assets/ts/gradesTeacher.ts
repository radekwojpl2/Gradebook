import '../css/gradesTeacher.css'
import axios from '../../axios.ts';



axios.get('/users.json')
.then( response => {console.log(response.data)})
// .catch( error => ...)
