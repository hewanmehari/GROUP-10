fun main(){
    val library = LibrarySystem()
    library.addBook(1, "The Girl With Louding Voice")
    println(library.borrowBook(1, "Emebet", true))
    println(library.checkAvailability(1))
    println(library.returnBook(1))
    println(library.checkAvailability(1))
    println(library.reserveEvent("E1", "customer1"))

}
class LibrarySystem {
    val books = mutableMapOf<Int, Book>()
    val reservations = mutableMapOf<String, MutableList<String>>()
    data class Book(var title: String, var available: Boolean, var reservedBy: String?)
    fun addBook(bookId: Int, title: String) {
        books[bookId] = Book(title, true, null)
    }
    fun borrowBook(bookId: Int, customerID: String, isDigital: Boolean = false): String {
        val book = books[bookId] ?: return "Book not found"
        if (!book.available) {
            return if (isDigital) "Digital copy unavailable" else "Book is already borrowed. Added to the waitlist."
        }
        book.available = false
        book.reservedBy = customerID
        return "Book ${book.title} borrowed by $customerID (${if (isDigital) "Digital" else "Physical"})"
    }
    fun returnBook(bookId: Int): String {
        val book = books[bookId] ?: return "Book not found"
        book.available = true
        book.reservedBy = null
        return "Book ${book.title} returned"
    }
    fun reserveEvent(eventId: String, customerID: String): String {
        if (!reservations.containsKey(eventId)) {
            reservations[eventId] = mutableListOf()
        }
        val event = reservations[eventId]!!
        if (customerID in event) return "Already reserved"
        event.add(customerID)
        return "$customerID reserved for event $eventId"
    }
    fun checkAvailability(bookId: Int): Boolean {
        return books[bookId]?.available ?: false
    }
}