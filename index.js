function toggleNav() {
    $("#toggleBtn").toggle('hidden')
}
function popUp() {
    $('.overlay').addClass('showover')
    $('#form').removeClass('hidden')
}
function contactPopUp() {
    $('.overlay').addClass('showover')
    $('#contactUs').removeClass('hidden')
}
function popUpCancel() {
    $('.overlay').removeClass('showover')
    $('#form').addClass('hidden')
}
function contactPopUpCancel() {
    $('.overlay').removeClass('showover')
    $('#contactUs').addClass('hidden')
}

// ######################### ErrorBorder #################################

function contactUs() {
    var name = document.getElementById("name");
    var mail = document.getElementById("mail");
    var company = document.getElementById("company");
    var ContactNo = document.getElementById("ContactNo");
    var message = document.getElementById("message");
    let isError = false;

    var contactInfo = [name, mail, company, ContactNo, message];
    for (let i = 0; i < contactInfo.length; i++) {
        if (contactInfo[i].value == "") {
            contactInfo[i].style.border = "1px solid red"
            isError = true;
            // return false;
        }
    }
}

// ######################### removeErrorBorder #################################
function removeErrorBorder(id) {
    document.getElementById(id).style.border = 'none'
}
 function removeBorderCalender(){
    $('#formCalenderDiv').removeClass('redBorder')
 }
 function removeBorderTime(){
    $('#formTimeDiv').removeClass('redBorder')
 }
function schedule() {
    var name = document.getElementById("formName");
    var mail = document.getElementById("formMail");
    var company = document.getElementById("formCompany");
    var calender = document.getElementById("datepicker").value;
    var time = document.getElementById("formTime").value;
    let isError = false;

    var scheduleInfo = [name, mail, company];
    for (let i = 0; i < scheduleInfo.length; i++) {
        if (scheduleInfo[i].value == "") {
            scheduleInfo[i].style.border = "1px solid red"
            isError = true;
            // return false;
        }
    }
    if (calender == ""){
        $('#formCalenderDiv').addClass('redBorder')
    }
    if (time == ""){
        $('#formTimeDiv').addClass('redBorder')
    }
}