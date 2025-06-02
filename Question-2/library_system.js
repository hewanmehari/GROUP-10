class LibrarySystem {
    constructor() {
        this.books = new Map(); 
        this.reservations = new Map(); 
    }
    
    addBook(bookId, title) {
        this.books.set(bookId, { title, available: true, reservedBy: null });
    }
    
    borrowBook(bookId, customerId, isDigital = false) {
        const book = this.books.get(bookId);
        if (!book) return "Book not found";
        if (!book.available) {
            if (isDigital) return "Digital copy unavailable";
            return "Book is already borrowed. Added to waitlist.";
        }
        book.available = false;
        book.reservedBy = customerId;
        return `Book ${book.title} borrowed by ${customerId} (${isDigital ? "Digital" : "Physical"})`;
    }
    
    returnBook(bookId) {
        const book = this.books.get(bookId);
        if (!book) return "Book not found";
        book.available = true;
        book.reservedBy = null;
        return `Book ${book.title} returned`;
    }
    
    reserveEvent(eventId, customerId) {
        if (!this.reservations.has(eventId)) {
            this.reservations.set(eventId, []);
        }
        const event = this.reservations.get(eventId);
        if (event.includes(customerId)) return "Already reserved";
        event.push(customerId);
        return `Customer ${customerId} reserved for event ${eventId}`;
    }
    
    checkAvailability(bookId) {
        const book = this.books.get(bookId);
        return book ? book.available : false;
    }
}

const library = new LibrarySystem();
console.log(library.addBook(1, "Becoming"));
console.log(library.borrowBook(1, "Hewan", false));
console.log(library.checkAvailability(1)); 
console.log(library.returnBook(1));
console.log(library.checkAvailability(1)); 
console.log(library.reserveEvent("Event 1", "Hewan"));
