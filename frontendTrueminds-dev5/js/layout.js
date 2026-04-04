const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const bottomNav = document.querySelector('.bottom-nav');

function updateNavVisibility(){

if(window.innerWidth <= 900){

if(sidebar.classList.contains('collapsed')){
bottomNav.style.display='none';
}
else{
bottomNav.style.display='flex';
}

}else{

sidebar.classList.remove('collapsed');
bottomNav.style.display='none';

}

}

sidebarToggle.addEventListener('click',()=>{

if(window.innerWidth <= 900){
sidebar.classList.toggle('collapsed');
updateNavVisibility();
}

});

window.addEventListener('resize',updateNavVisibility);
updateNavVisibility();


/* Avatar dropdown */

const navAvatar = document.querySelector('.nav-avatar');

navAvatar.addEventListener('click',()=>{
navAvatar.classList.toggle('open');
});

document.addEventListener('click',(e)=>{
if(!navAvatar.contains(e.target)){
navAvatar.classList.remove('open');
}
});


/* Bottom nav active */

const bottomNavLinks = document.querySelectorAll('.bottom-nav-link');

bottomNavLinks.forEach(link=>{

if(window.location.pathname.endsWith(link.getAttribute('href').split('/').pop())){
link.classList.add('active');
}

link.addEventListener('click',function(){
bottomNavLinks.forEach(l=>l.classList.remove('active'));
this.classList.add('active');
});

});