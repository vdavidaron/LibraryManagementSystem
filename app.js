const loginForm = document.getElementById("loginForm");
const searchBtn = document.getElementById("searchBtn");
const searchQuery = document.getElementById("searchQuery");
const bookList = document.getElementById("bookList");
const reservationForm = document.getElementById("reservationForm");
const reservationResult = document.getElementById("reservationResult");

let token = null;

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await axios.post("http://localhost:5004/login", { username, password });
        token = response.data.token;
        document.getElementById("auth").style.display = "none";
        document.getElementById("search").style.display = "block";
        document.getElementById("reservation").style.display = "block";
    } catch (error) {
        alert("Invalid login credentials");
    }
});

searchBtn.addEventListener("click", async () => {
    const query = searchQuery.value;
    const response = await axios.get(`http://localhost:5002/books/search/${query}`);
    const books = response.data;

    bookList.innerHTML = "";
    books.forEach((book) => {
        const li = document.createElement("li");
        li.textContent = `${book.title} by ${book.author}`;
        bookList.appendChild(li);
    });
});

reservationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const bookId = document.getElementById("bookId").value;

    try {
        const response = await axios.post(
            "http://localhost:5003/reservations",
            { book_id: bookId, user_id: "test" },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        reservationResult.textContent = `Reservation created with ID: ${response.data.id}`;
    } catch (error) {
        reservationResult.textContent = "Error creating reservation";
    }
});
