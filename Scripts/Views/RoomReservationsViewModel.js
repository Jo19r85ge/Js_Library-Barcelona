class RoomReservationsViewModel
{
    constructor()
    {
        this.SelectedUser = null;
        this.SelectedRoom = null;

        this.RoomsDDHandler = new DropDownHandler(
                                    App.RoomsVM.Rooms, 
                                    DDRooms, 
                                    "Code", 
                                    RoomReservationsVM_BtSelectedRoom,
                                    (room) =>
                                    {                                        
                                        this.SelectedRoom = room;
                                        if (this.SelectedUser != null)
                                        BtAddReservation.style.display = "block";                                        
                                    });

        this.UsersDDHandler = new DropDownHandler(
                                    App.UsersVM.Users, 
                                    DDRoomsUsers, 
                                    "Name", 
                                    RoomReservationsVM_BtSelectedUser,
                                    (user) =>
                                    {
                                        this.SelectedUser = user;
                                        
                                        if (this.SelectedRoom != null)
                                            BtAddReservation.style.display = "block";  

                                        //this.ShowUsersRooms(user);
                                    });                            

        let buttons = 
        [
            new TableButtonInfo("Cancel reservation", (room) => { this.OnDeletedReservation(room); })
        ];

        this.InputHandler = new InputDataHandler();
        
        this.TableHandler = new TableHandler(
            RoomReservationsTableContent,  //parentNode (dónde quiero que se genere la tabla)
            RoomReservation,               //modelType (el tipo para las columnas)
            buttons,
            ["Room"]);
    }

    AddReservation()
    {
        if (this.SelectedUser != null && this.SelectedRoom != null)
        {

            let roomIsFree = true;
            for (let i in this.SelectedRoom.ReservedHours)
            {
                let reservationHour = this.SelectedRoom.ReservedHours[i];
                if (reservationHour.Hour == SelectedHour.value)
                {
                    roomIsFree = false;
                    alert("Sorry! The room selected is not available")
                    break;
                }
            }  

            let userHasRoom = false;
            for (let i in this.SelectedUser.Reservations)
            {
                var userReservations = this.SelectedUser.Reservations[i];
                if (userReservations.Hour === SelectedHour.value)
                {
                    userHasRoom = true;
                    alert("You already reserved a room at this hour!")
                    break;
                }
            }

            if (!userHasRoom && roomIsFree)
            {
                let reservation = new RoomReservation(this.SelectedRoom, this.SelectedUser);
                this.InputHandler.FillModel(reservation, RoomReservationsView)
                this.SelectedUser.Reservations.push(reservation);
                this.SelectedRoom.ReservedHours.push(reservation);
                this.AddReservationToTable(reservation);
            }
        }
    }

    AddReservationToTable(reservation)   //este puede venir de cualquier lado
    {
        this.TableHandler.AddRow(reservation);
        this.TableHandler.ColorRow(reservation);
    }

    ShowUsers()
    {
        this.UsersDDHandler.ShowOptions();
    }

    ShowRooms()
    {
        this.RoomsDDHandler.ShowOptions();
    }

    OnDeletedReservation(reservation)
    {
        var response = confirm("Do you want to cancel your reservation?");
        if (response == true) 
        {            
            let i = this.SelectedUser.Reservations.findIndex((x)=>x === reservation);
            this.SelectedUser.Reservations.splice(i, 1);

            let j = this.SelectedRoom.ReservedHours.findIndex((x)=>x === reservation);
            this.SelectedRoom.ReservedHours.splice(j, 1);

            // do validations
            this.TableHandler.DeleteRow(reservation);
        } 
        else 
        {
            console.log("Reserva cancelada");
        }        
    }

}