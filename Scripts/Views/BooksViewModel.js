class BooksViewModel
{
    constructor()
    {
        this.Books = new Array();
        
        this.InputHandler = new InputDataHandler();
        this.EditingBook = null;       

        let buttons = 
        [
            new TableButtonInfo("Edit", (book) => { this.OnSelectedBook(book); }),
            new TableButtonInfo("Remove", (book) => { this.OnDeletedBook(book); })
        ];

        this.TableHandler = new TableHandler(
            BooksTableContent,  //parentNode (dónde quiero que se genere la tabla)
            Book,               //modelType (el tipo para las columnas)
            buttons, //los botones que quiero para el BooksViewModel
            []);  
                   
        this.CreateDefaultData();
    }

    CreateDefaultData()
    {
        var book1 = new Book();
        book1.Title = "Lord of the Rings 1";
        book1.Author = "J.R.R Tolkien";
        book1.Year = 1930;
        book1.Amount = 4;

        var book2 = new Book();
        book2.Title = "Lord of the Rings 2";
        book2.Author = "J.R.R Tolkien";
        book2.Year = 1931;
        book2.Amount = 5;

        var book3 = new Book();
        book3.Title = "Foundation";
        book3.Author = "Isaac Asimov";
        book3.Year = 1955;
        book3.Amount = 2;

        var book4 = new Book();
        book4.Title = "Dune";
        book4.Author = "Frank Herbert";
        book4.Year = 1965;
        book4.Amount = 10;

        this.AddBook(book1);
        this.AddBook(book2);
        this.AddBook(book3);
        this.AddBook(book4);
    }

    AddNewBook() // este viene del onclick del html
    {
        let book = new Book();
        this.InputHandler.FillModel(book, BooksView);
        this.AddBook(book);
        this.CleanBookForm();
    }

    AddBook(book)   //este puede venir de cualquier lado
    {
        this.Books.push(book);
        this.TableHandler.AddRow(book);
    }

    UpdateBook()
    {        
        this.InputHandler.FillModel(this.EditingBook, BooksView);
        this.TableHandler.UpdateRow(this.EditingBook);

        this.CleanBookForm();
    }

    CleanBookForm()
    {
        this.InputHandler.CleanForm(BooksView);
        this.TableHandler.Clean();
        
        BtAddBook.classList.remove("BtInvisible");
        BtUpdateBook.classList.add("BtInvisible");
    }

    OnSelectedBook(book)
    {
        this.EditingBook = book;

        this.InputHandler.FillForm(book, BooksView);

        BtAddBook.classList.add("BtInvisible");
        BtUpdateBook.classList.remove("BtInvisible");
    }    

    OnDeletedBook(book)
    {
        var response = confirm("¿te atreves a borrar el libro!!??");
        if (response == true) 
        {
            console.log("You pressed OK! jajajaa");
            let i = this.Books.findIndex((x)=>x === book);
            this.Books.splice(i, 1);

            // do validations
            this.TableHandler.DeleteRow(book);
        } 
        else 
        {
            console.log("You pressed Cancel! cobarde pecador");
        }        
    }
}