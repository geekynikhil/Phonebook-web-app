function rotate(x){
    x.classList.toggle("rotate");
    v=document.getElementById("form").classList.toggle("appear");
}
function validator(){
    x=document.getElementById("contact");
    x.classList+="was-validated";
}
function add_more_contact(){
    text="<input type='text' class='form-control' pattern='[0-9]{10}' name='numbers' placeholder='xxxxxxxxxx' required/>";
    $("#add_contact_here").append(text);
}
function add_more_email(){
    text="<input type='email' class='form-control' name='emails' placeholder='abc@xyz' required/>";
    $("#add_email_here").append(text);
}
function remove_field(s,x){
    s.remove();
    var v=document.getElementById(x);
    v.remove();
}
function previous(x){
    var n=document.getElementById("pageno").innerHTML;
    n=Number(n);
    window.location.href="/?page="+(n-1);
}
function next(x){
    var n=document.getElementById("pageno").innerHTML;
    n=Number(n);
    window.location.href="/?page="+(n+1);
}