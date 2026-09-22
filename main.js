// Acccess Reference of Elements in JavaScript
const studentName = document.querySelector("#studentName")
const studentAge = document.querySelector("#studentAge")
const studentCourse = document.querySelector("#studentCourse")
const studentMarks = document.querySelector("#studentMarks")
const addStudentBtn  = document.querySelector("#addStudentBtn")
const searchStudent = document.querySelector("#searchStudent")
const studentsContainer = document.querySelector("#studentsContainer")




// Set Studen-Record to LocalStorage
const saveDataToLocalStorage = () =>{
    localStorage.setItem("Student-Record",JSON.stringify(stdArr))
}

let stdArr = JSON.parse(localStorage.getItem("Student-Record")) || [];
let editId = null;

const getUserInputValue = () =>{
    let stdName = studentName.value;
    let stdAgg = studentAge.value;
    let stdCourse = studentCourse.value
    let stdMarks = studentMarks.value

    if(editId){
        let std = stdArr.find((curElem)=>{
            return curElem.id === editId
        })
        std.StudentName = studentName.value;
        std.StudentAgg = studentAge.value
        std.StudentCourse = studentCourse.value
        std.StudentMarks = studentMarks.value;
        addStudentBtn.innerHTML = "Add Student"
    }else{
        let newStd = {
        id: Date.now(),
        StudentName: stdName,
        StudentAgg: stdAgg,
        StudentCourse: stdCourse,
        StudentMarks: stdMarks,
        ApplyTime: new Date().toLocaleString()
        }
        stdArr.push(newStd)
    }
        editId = null;
        studentName.value = ""
        studentAge.value = ""
        studentCourse.value = ""
        studentMarks.value = ""
        saveDataToLocalStorage()
        showStudents()
}


const showStudents  = (student = stdArr) =>{
    studentsContainer.innerHTML = ""

    // Dynamically Card-Generated
    student.forEach((curElem)=>{
    let stdCard = document.createElement("div")
    stdCard.classList.add("student-card")

   stdCard.innerHTML =
    `<div class="student-info">
        <h3>${curElem.StudentName}</h3>
        <p><strong>Age:</strong>${curElem.StudentAgg}</p>
        <p><strong>Course:</strong> ${curElem.StudentCourse}</p>
        <p><strong>Marks:</strong>${curElem.StudentMarks}</p>
        <p><strong>Apply Time: </strong>${curElem.ApplyTime}</p>
    </div>

    <div class="card-actions">
        <button class="edit-btn"onclick="editStudent(${curElem.id})">Edit</button>
         <button class="delete-btn"onclick="deleteStudent(${curElem.id})">Delete</button>
    </div>`

    studentsContainer.appendChild(stdCard)
})
}



// edite student record
const editStudent = (id) =>{
let student = stdArr.find((student)=>{
     return student.id === id;
    })
        editId = id;
        studentName.value = student.StudentName;
        studentAge.value = student.StudentAgg;
        studentCourse.value = student.StudentCourse;
        studentMarks.value = student.StudentMarks;
        addStudentBtn.innerHTML = "Update Student" 
}

// delete students from array
const deleteStudent = (id) =>{
 stdArr = stdArr.filter((curElem)=>{
        return curElem.id !== id;
    })
    saveDataToLocalStorage()
    showStudents()
}

// Search-Student-Records-Functionality.
searchStudent.addEventListener("input",()=>{
   let searchInputTxt = searchStudent.value.toLowerCase().trim();
   let searchFilter = stdArr.filter((curElem)=>{
    return(
        curElem.StudentName.toLowerCase().includes(searchInputTxt) ||
        curElem.StudentCourse.toLowerCase().includes(searchInputTxt)
     )
})
        showStudents(searchFilter)
})

showStudents()
addStudentBtn.addEventListener("click",getUserInputValue)
