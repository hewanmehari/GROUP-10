fun main() {
    println(isPalindrome("hannah")) 
    println(isPalindrome("process")) 
}


fun isPalindrome(s: String): Boolean {
    val cleanS = s.lowercase().filter { it.isLetterOrDigit() }
    return cleanS == cleanS.reversed()
}