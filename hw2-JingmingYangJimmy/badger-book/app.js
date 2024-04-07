let allData=[];

fetch("https://cs571.org/api/f23/hw2/students", {
   method: 'GET',
   headers: {
	   'X-CS571-ID': CS571.getBadgerId()
   }
})
.then(response => {
   if (!response.ok) {
	   throw new Error("Not successed");
   }
   return response.json();
})
.then(data => {
   allData=data;
   document.getElementById("num-results").innerText=data.length;
   const studentsHtml= buildStudentsHtml(data);
   document.getElementById("students").innerHTML=studentsHtml;
})
.catch(error => {
   console.error("There is an error:", error.message);
});


/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 * 
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs) {
	return studs.map(stud => buildStudentHtml(stud)).join("\n");
}

/**
 * Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 * 
 * @param {*} stud 
 * @returns 
 */
function buildStudentHtml(stud) {
	let html = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">`;
	html += `<div class="card">`;
	html += `<div class="body">`;
	html += `<h4 class="title">${stud.name.first} ${stud.name.last}</h4>`;
	html += `<p class="info"><strong>Major:</strong> ${stud.major}</p>`;
	html += `<p class="info"><strong>Credits:</strong> ${stud.numCredits}</p>`;
	html += `<p class="info"><strong>From WI:</strong> ${stud.fromWisconsin}</p>`;
	html += `<p class="info"><strong>Interests (${stud.interests.length}):</strong></p>`;
	html += `<ul class="list">`;
    stud.interests.forEach(interest => {
        html += `<li class="list">${interest}</li>`;
    });
    html += `</ul>`;
	html +=`</div>`;
	html +=`</div>`;
	html += `</div>`;
	return html;
}

function handleSearch(e) {
	e.preventDefault();
	let Name=document.getElementById('search-name').value.trim().toLowerCase();
	let Major=document.getElementById('search-major').value.trim().toLowerCase();
	let Interest= document.getElementById('search-interest').value.trim().toLowerCase();


	let filteredData=allData.filter(
		stud =>(stud.name.first.toLowerCase() + stud.name.last.toLowerCase()).includes(Name.toLowerCase()) &&
		(stud.major.toLowerCase()).includes(Major.toLowerCase()) &&
		(stud.interests.some(interest => interest.toLowerCase().includes(Interest.toLowerCase()))));

	document.getElementById("num-results").innerText = filteredData.length;
	document.getElementById("students").innerHTML = buildStudentsHtml(filteredData);
}

document.getElementById("students").className = "row";
document.getElementById("search-btn").addEventListener("click", handleSearch);