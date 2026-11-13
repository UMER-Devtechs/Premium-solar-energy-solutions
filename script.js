// Mobile Menu Toggle
const m = document.querySelector('.nv');
const b = document.querySelector('.mb');
const L = [...m.children];

b.onclick = () => {
    m.classList.toggle('on');
    b.classList.toggle('on');
    b.setAttribute('aria-expanded', m.classList.contains('on'));
};

L.forEach(a => {
    a.onclick = () => {
        L.forEach(x => x.classList.remove('act'));
        a.classList.add('act');
        m.classList.remove('on');
        b.classList.remove('on');
    };
});

document.documentElement.style.scrollBehavior = 'smooth';

// ===== MODAL LOGIC =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===== SEAMLESS AUTO SCROLL (Fix Empty Space) =====
document.addEventListener("DOMContentLoaded", function() {
    const track = document.getElementById('projectTrack');
    if(track) {
        const items = track.innerHTML;
        track.innerHTML = items + items + items; 
    }
});