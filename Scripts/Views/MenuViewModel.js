class MenuViewModel
{
    constructor()
    {

    }

    ShowView(menuView) //1, 2 o 3
    {
        switch(menuView)
        {
            case MenusViews.Books:  //1
                BooksView.style.display = "block";
                UsersView.style.display = "none";
                LendsView.style.display = "none";    
                RoomsView.style.display = "none";   
                RoomReservationsView.style.display = "none";   
                                
                break;

            case MenusViews.Users:  //2
                BooksView.style.display = "none";
                UsersView.style.display = "block";
                LendsView.style.display = "none";
                RoomsView.style.display = "none";
                RoomReservationsView.style.display = "none";      

                break;

            case MenusViews.Lends:  //3
                BooksView.style.display = "none";
                UsersView.style.display = "none";
                LendsView.style.display = "block";
                RoomsView.style.display = "none";
                RoomReservationsView.style.display = "none";      

                break;
            
            case MenusViews.Rooms:  //4
                BooksView.style.display = "none";
                UsersView.style.display = "none";
                LendsView.style.display = "none";
                RoomsView.style.display = "block"; 
                RoomReservationsView.style.display = "none";     

                break;

            case MenusViews.RoomsReservations:  //4
                BooksView.style.display = "none";
                UsersView.style.display = "none";
                LendsView.style.display = "none";
                RoomsView.style.display = "none";  
                RoomReservationsView.style.display = "block";    

                break;

        }
    }
}

MenusViews = 
{
    Books : 1,
    Users : 2,
    Lends : 3,
    Rooms : 4,
    RoomReservations : 5

}