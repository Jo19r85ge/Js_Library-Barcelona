class LendsViewModel
{
    constructor()
    {
        this.SelectedUser = null;
        this.SelectedBook = null;

        this.UsersDDHandler = new DropDownHandler(
                                    App.UsersVM.Users, 
                                    DDUsers, 
                                    "Name", 
                                    LendsVM_BtSelectedUser,
                                    (user) =>
                                    {
                                        this.SelectedUser = user;
                                        
                                        if (this.SelectedBook != null)
                                            BtLendBook.style.display = "block";  

                                        this.ShowUsersLends(user);
                                    });
        this.BooksDDHandler = new DropDownHandler(
                                    App.BooksVM.Books, 
                                    DDBooks, 
                                    "Title", 
                                    LendsVM_BtSelectedBook,
                                    (book) =>
                                    {                                        
                                        this.SelectedBook = book;
                                        if (this.SelectedUser != null)
                                            BtLendBook.style.display = "block";                                        
                                    });

        let buttons = 
        [
            new TableButtonInfo("Return", (lend) => { this.OnDeletedLend(lend); })
        ];

        this.TableHandler = new TableHandler(
            LendsTableContent,  //parentNode (dónde quiero que se genere la tabla)
            Lend,               //modelType (el tipo para las columnas)
            buttons,
            ["Book"]);
    }

    ShowUsersLends(SelectedUser)
    {
        this.TableHandler.CleanAllTable();
        for (let i in SelectedUser.Lends)
        {
            this.AddLendToTable(SelectedUser.Lends[i]);
        }
    }

    AddLend()
    {
        if (this.SelectedUser != null && this.SelectedBook != null)
        {
            let userHasBook = false;
            for (let i in this.SelectedUser.Lends)
            {
                let lend = this.SelectedUser.Lends[i];
                if (lend.Book == this.SelectedBook)
                {
                    userHasBook = true;
                    break;
                }
            }  
            
            if (!userHasBook)
            {
                let lend = new Lend(this.SelectedBook, 30);
                this.SelectedUser.Lends.push(lend);

                this.AddLendToTable(lend);
            }
        }
    }

    AddLendToTable(lend)   //este puede venir de cualquier lado
    {
        this.TableHandler.AddRow(lend);
    }

    ShowUsers()
    {
        this.UsersDDHandler.ShowOptions();
    }

    ShowBooks()
    {
        this.BooksDDHandler.ShowOptions();
    }

    OnSelectedLend(lend)
    {

    }

    OnDeletedLend(lend)
    {
        var response = confirm("Do you want to return this book?");
        if (response == true) 
        {            
            let i = this.SelectedUser.Lends.findIndex((x)=>x === lend);
            this.SelectedUser.Lends.splice(i, 1);

            // do validations
            this.TableHandler.DeleteRow(lend);
        } 
        else 
        {
            console.log("devolución cancelada");
        }        
    }
}