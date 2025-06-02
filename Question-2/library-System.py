class LibrarySystem:
    def __init__(self):
        self.books = {}
        self.reservations = {}

    def add_book(self, book_id, title):
        self.books[book_id] = {"title": title, "available": True, "reserved_by": None}

    def borrow_book(self, book_id, customer_id, is_digital=False):
        if book_id not in self.books:
            return "Book not found"
        book = self.books[book_id]
        if not book["available"]:
            if is_digital:
                return "Digital copy unavailable"
            return "Book is already borrowed. Added to the waitlist."
        book["available"] = False
        book["reserved_by"] = customer_id
        return f"{book['title']} borrowed by {customer_id} ({'Digital' if is_digital else 'Physical'})"

    def return_book(self, book_id):
        if book_id not in self.books:
            return "Book not found"
        book = self.books[book_id]
        book["available"] = True
        book["reserved_by"] = None
        return f"{book['title']} returned"

    def reserve_event(self, event_id, customer_id):
        if event_id not in self.reservations:
            self.reservations[event_id] = []
        if customer_id in self.reservations[event_id]:
            return "Already reserved"
        self.reservations[event_id].append(customer_id)
        return f"{customer_id} reserved for event {event_id}"

    def check_availability(self, book_id):
        return self.books.get(book_id, {}).get("available", False)
        
library = LibrarySystem()
library.add_book(1, "The handmaids tale")
print(library.borrow_book(1, "customer1", False))
print(library.check_availability(1))
print(library.return_book(1))
print(library.check_availability(1))
print(library.reserve_event("Event1", "customer1"))