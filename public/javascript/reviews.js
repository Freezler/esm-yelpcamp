const ratingInput = document.getElementById('rating');
const ratingDisplay = document.getElementById('ratingValue');
ratingInput.addEventListener('input', () => {
    ratingDisplay.textContent = ratingInput.value;
});
document.getElementById('reviewForm').addEventListener('submit', function (event) {
    if (!this.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    }
    this.classList.add('was-validated');
});