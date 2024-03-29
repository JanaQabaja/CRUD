

var courseName = document.getElementById('courseName')
var courseCategory = document.getElementById('courseCategory')
var coursePrice = document.getElementById('coursePrice')
var courseDescription = document.getElementById('courseDescription')
var courseCapacity = document.getElementById('courseCapacity')
var addbtn = document.getElementById('click')
var data = document.getElementById('data')
var search = document.getElementById('search')

var currentIndex = 0
var isNameValid = false
var isCatValid = false 
var isPriceValid = false
var isDesValid = false
 var isCapacityValid = false
var courses
 if(JSON.parse(localStorage.getItem('courses')) == null){

 courses = [] }
 else{

courses = JSON.parse(localStorage.getItem('courses'))
}
displayData()
checkInputs()

function checkInputs(){
if(isNameValid && isCatValid && isDesValid && isCapacityValid && isPriceValid){ 
  addbtn.removeAttribute('disabled')
}else{
addbtn.setAttribute('disabled', 'disabled') } }


var update = document.getElementById('update')
update.style.display='none'









addbtn.onclick = function(e){
    e.preventDefault()
    addCourse()
    resetInput()
    displayData()
    console.log(courses);
}


function addCourse(){
    var course={
        courseName:courseName.value,
        courseCategory:courseCategory.value,
        coursePrice:coursePrice.value,
        courseDescription:courseDescription.value, 
        courseCapacity:courseCapacity.value
}

courses.push(course)
localStorage.setItem('courses', JSON.stringify(courses))
Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'course add successfully',
    showConfirmButton: false,
    timer: 1500
  })
}


function resetInput(){
courseName.value = ''
courseCategory.value = ''
coursePrice.value = ''
courseDescription.value = ''
courseCapacity.value = ''
}


function displayData(){
    var result =``
    for(var i =0 ; i<courses.length ;i++){

result +=`
<tr>
<td>${i+1}</td>
<td>${courses[i].courseName}</td>
<td>${courses[i].courseCategory}</td>
<td>${courses[i].coursePrice}</td>
<td>${courses[i].courseDescription}</td>
<td>${courses[i].courseCapacity}</td>
<td><button class="btn btn-info" onclick="getCourse(${i})">update</button></td>
<td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>
</tr>
`
    }
data.innerHTML=result
}


document.getElementById('deleteBtn').onclick = function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
courses=[]
localStorage.setItem('courses', JSON.stringify(courses))
data.innerHTML = ''

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
}

function deleteCourse(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
courses.splice(index,1)
localStorage.setItem('courses', JSON.stringify(courses))
displayData()

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

}


search.onkeyup = function(){
    var result = ``
    console.log(search.value)
    for(var i =0 ; i<courses.length ;i++){
        if(courses[i].courseName.toLowerCase().includes(search.value.toLowerCase())){       
           result +=`
        <tr>
        <td>${i+1}</td>
        <td>${courses[i].courseName}</td>
        <td>${courses[i].courseCategory}</td>
        <td>${courses[i].coursePrice}</td>
        <td>${courses[i].courseDescription}</td>
        <td>${courses[i].courseCapacity}</td>
        <td><button class="btn btn-info" onclick="getCourse(${i})" >update</button></td>
        <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>
        </tr>
        `
            }}
        data.innerHTML = result
        if(search.value==''){
          displayData()
        }

}

//update
function getCourse(index) {
  console.log(index);
  currentIndex = index
  var course = courses[index]
   console.log(course);
  courseName.value = course.courseName
  courseCategory.value = course.courseCategory
  coursePrice.value = course.coursePrice
  courseDescription.value = course.courseDescription 
  courseCapacity.value = course.courseCapacity
  update.style.display ='inline' 
  addbtn.style.display = 'none' }

  update.onclick=function(e){
    e.preventDefault() 
    updateCourse()
    displayData()
    update.style.display ='none'
    addbtn.style.display ='inline'
    resetInput() 
  }

  function updateCourse(){
    var course = {
    courseName: courseName.value,
     courseCategory: courseCategory.value, 
     coursePrice: coursePrice.value, 
     courseDescription: courseDescription.value, 
     courseCapacity: courseCapacity.value
    }
    var pervName = courses[currentIndex].courseName
    courses[currentIndex].courseName = course.courseName
     courses[currentIndex].courseCategory = course.courseCategory 
     courses[currentIndex].coursePrice = course.coursePrice
    courses[currentIndex].courseDescription= course.courseDescription
     courses[currentIndex].courseCapacity = course.courseCapacity
    localStorage.setItem('courses', JSON.stringify(courses)) 
    Swal.fire({
    position: 'center',
    icon: 'success',
     title: `${pervName} updated successfully `,
      showConfirmButton: false,
    
    timer: 1500
    
    })
  }


//validation

var nameAlert = document.getElementById("nameAlert")
 //nameAlert.style.display = "none" 
courseName.onkeyup = function() { 
var pattern = /^[A-Z][a-z]{2,10}$/
if(pattern.test(courseName.value)){
isNameValid = true

if(courseName.classList.contains('is-invalid')){ 
  courseName.classList.replace('is-invalid', 'is-valid')
}

courseName.classList.add('is-valid') 
//nameAlert.style.display = 'none'

nameAlert.innerHTML=''
}else{
  isNameValid = false
  nameAlert.innerHTML= '*please start with capital letter and name must be between 3 and 10 chars'
  //nameAlert.style.display = 'block'
  if(courseName.classList.contains('is-valid')){
  courseName.classList.replace('is-valid', 'is-invalid')
  }
  courseName.classList.add('is-invalid')

}
checkInputs()
}
//catalert

var catAlert = document.getElementById('catAlert')
//catAlert.style.display = 'none'
courseCategory.onkeyup = function(){
   var pattern = /^[A-Z][a-z]{2,20}$/
if(pattern.test(courseCategory.value)){ 
  //catAlert.style.display = 'none'
  catAlert.innerHTML=''
isCatValid = true

if (courseCategory.classList.contains('is-invalid')){ 
  courseCategory.classList.replace('is-invalid', 'is-valid')
}
courseCategory.classList.add('is-valid')
}else{
  catAlert.innerHTML= '*Please start with capital letter and name must be between 3-10 chars'
//catAlert.style.display = 'block'
isCatValid = false
if(courseCategory.classList.contains('is-valid')){
courseCategory.classList.replace('is-valid', 'is-invalid')
}
courseCategory.classList.add('is-invalid')
}
checkInputs()
}




//price alert

var priceAlert = document.getElementById('priceAlert')
priceAlert.innerHTML=''
//priceAlert.style.display = 'none'
coursePrice.onkeyup = function(){ 
   var pattern = /^[0-9]{3,4}$/

if(pattern.test(coursePrice.value) && coursePrice.value >= 100){ 
  //priceAlert.style.display ="none"
  priceAlert.innerHTML=''
isPriceValid = true

if(coursePrice.classList.contains('is-invalid')){
coursePrice.classList.replace('is-invalid', 'is-valid') }

coursePrice.classList.add('is-valid')
}else{
isPriceValid = false
priceAlert.innerHTML= '*price must be between 3-4 digits between 100-9999'
//priceAlert.style.display = 'block'
if(coursePrice.classList.contains('is-valid')){ 
  coursePrice.classList.replace('is-valid', 'is-invalid')
}
coursePrice.classList.add("is-invalid")
}
checkInputs()
}

//description

courseDescription.onkeyup = function(){
  var desAlert = document.getElementById('desAlert')
  var pattern = /^[A-Z][A-Za-z0-9\s]{2,120}$/
   if(pattern.test(courseDescription.value)){
    desAlert.innerHTML=''
  isDesValid = true
  if(courseDescription.classList.contains('is-invalid')){
    courseDescription.classList.replace('is-invalid', 'is-valid')
  }
  courseDescription.classList.add('is-valid')
  }else{
  isDesValid = false
  desAlert.innerHTML= '*Please start with capital letter the max nums of chars is 120'
  if(courseDescription.classList.contains('is-valid')){ 
    courseDescription.classList.replace('is-valid', 'is-invalid')
  }
  courseDescription.classList.add('is-invalid')
  
  } checkInputs()
}

//capacity alert
var capAlert = document.getElementById('capAlert')
courseCapacity.onkeyup =function(){
  var pattern = /^[0-9]{2,3}$/

if(pattern.test(courseCapacity.value)){
isCapacityValid = true
capAlert.innerHTML=''
if(courseCapacity.classList.contains('is-invalid')){
  courseCapacity.classList.replace('is-invalid', 'is-valid')
}
courseCapacity.classList.add('is-valid')
}else{
isCapacityValid = false
capAlert.innerHTML= '*must be between 2-3 digits'
if(courseCapacity.classList.contains('is-valid')){
courseCapacity.classList.replace('is-valid', 'is-invalid')
}
courseCapacity.classList.add('is-invalid')
}
checkInputs()
}












