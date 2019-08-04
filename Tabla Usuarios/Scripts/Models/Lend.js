class Lend
{
    constructor(book, lendDays)
    {
        this.Book = book;
        this.Title = book === undefined ? "" : book.Title;

        
        this.LendedOn = new Date();
        this.ExpiresOn = new Date();

        this.LendedOn.toLocaleString();
        this.ExpiresOn.toLocaleString();

        this.ExpiresOn.setMonth(this.ExpiresOn.getMonth() + 1);
    }
}