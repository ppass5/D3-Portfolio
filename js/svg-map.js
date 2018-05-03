

function addColor(n){
  return n > 5001 && n < 6000 ? "#bfd3e6":
         n > 4001 && n < 5000 ? "#9ebcda":
         n > 3001 && n < 4000 ? "#8c96c6":
         n > 2001 && n < 3000 ? "#8856a7":
         n > 1001 && n < 2000 ? "#810f7c":
         n > 0 && n < 1000 ?    "#edf8fb":
                                "#000000"
};








var studentCount = studentTotals.length;

for (i = 0; i < studentTotals.length; i++){
  var students = studentTotals[i]["students"];  // students
  if (studentCount[students]){
    studentCount[students] += 1;
  }else {
    studentCount[students] = 1;
  }
}

console.log(studentCount);


for (var indexkey in studentTotals) {
  var floridaSvg = document.getElementById(studentTotals[indexkey]['district']);
  //console.log("Florida" + indexkey + studentTotals[indexkey]['district']);
  floridaSvg.style.fill = addColor(studentTotals[indexkey]['students']);
}
