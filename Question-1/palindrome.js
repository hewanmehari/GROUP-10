function isPalindrome(str) {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleanStr.split('').reverse().join('');
    return cleanStr === reversed;
}
console.log(isPalindrome('MaDam')); 
console.log(isPalindrome("M@%aDaM#$")); 