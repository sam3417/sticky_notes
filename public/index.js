console.log("running js file...")
  const toggle = document.getElementById("togglelight");
  toggle.addEventListener("click",()=>{
    console.log("toggling=")
    this.classList.toggle("bi-star-fill")
    if(this.classList.toggle("bi-star")){console.log("unfav")}
  })