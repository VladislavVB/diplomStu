const modalCard = document.querySelector('.modal-card');  
const cardClose = document.querySelector('.card-close');

const openCard = (number) => {
  modalCard.classList.add('modal-card-active');
};

cardClose.addEventListener('click', () => {
  modalCard.classList.remove('modal-card-active');
});

