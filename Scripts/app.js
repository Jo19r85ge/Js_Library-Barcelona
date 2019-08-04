class CrazyBooksApp
{    
    constructor()
    {
        this.MenuVM = null;       
    }

    Start()
    {
        this.BooksVM = new BooksViewModel();
        this.UsersVM = new UsersViewModel();
        this.LendsVM = new LendsViewModel();
        this.RoomsVM = new RoomsViewModel();
        this.RoomReservationsVM = new RoomReservationsViewModel();

        this.MenuVM = new MenuViewModel();
        this.MenuVM.ShowView(MenusViews.Books);
    }

    ShowView(menuView)
    {
        if (this.MenuVM != null)
        {
            this.MenuVM.ShowView(menuView);
        }
    }
}

var App = new CrazyBooksApp();

window.onload = function(event)
{
    App.Start();
};

window.onclick = function(event) 
{
    if (!event.target.matches('.dropbtn')) 
    {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) 
      {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) 
        {
            openDropdown.classList.remove('show');
        }
      }
    }
  }